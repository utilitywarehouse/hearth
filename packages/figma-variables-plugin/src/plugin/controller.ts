/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { figmaColorToHex } from '../app/utils';

////////////////////////////////////////////////////////////////////////////////
// 1. UI SETUP
////////////////////////////////////////////////////////////////////////////////

figma.showUI(__html__, { width: 400, height: 600 });

const debugMode = true;
const consoleLog = debugMode
  ? console
  : { log: () => {}, warn: () => {}, error: () => {}, clear: () => {} };
consoleLog.clear();

// Example: restore window size from client storage
figma.clientStorage
  .getAsync('size')
  .then((size?: { w: number; h: number }) => {
    if (size) figma.ui.resize(size.w, size.h);
  })
  .catch(err => {
    consoleLog.error(err);
  });

////////////////////////////////////////////////////////////////////////////////
// 2. ALIAS RESOLUTION + NESTED TOKENS
////////////////////////////////////////////////////////////////////////////////

/**
 * A type guard to check if a `VariableValue` is a `VariableAlias`.
 */
function isVariableAlias(value: VariableValue): value is VariableAlias {
  return typeof value === 'object' && value !== null && (value as any).type === 'VARIABLE_ALIAS';
}

/**
 * Converts a slash-delimited variable name, e.g. `"Button Large / Primary / Font Weight"`,
 * into dot notation, e.g. `"Button-Large.Primary.Font-Weight"`.
 * - Slashes -> dots
 * - Spaces -> hyphens
 */
function variableNameToDotNotation(name: string): string {
  // Trim, then:
  // 1) replace all slashes (and optional surrounding spaces) with a single dot
  // 2) replace remaining spaces with hyphens
  return name
    .trim()
    .replace(/\s*\/\s*/g, '.')
    .replace(/\s+/g, '-');
}

/**
 * Recursively resolves a variable value (which might be an alias chain)
 * to always return:
 *     { alias?: string; value: any }
 *
 * - If it's an alias, we produce `alias: "{button-large.primary.font-weight}"` plus
 *   a fully resolved final primitive in `value`.
 * - If it's already a primitive, we return `{ value: primitive }`.
 */
async function fullyResolveValue(
  rawValue: VariableValue | undefined,
  currentModeId: string,
  visitedIds: Set<string> = new Set()
): Promise<{ alias?: string; value: any }> {
  if (rawValue === undefined) {
    return { value: undefined };
  }

  // If it's an alias
  if (isVariableAlias(rawValue)) {
    // Create a unique visited key from "variableId::modeId"
    const visitedKey = `${rawValue.id}::${currentModeId}`;

    // Check for circular references
    if (visitedIds.has(visitedKey)) {
      consoleLog.warn(`Circular reference detected for variable: ${visitedKey}`);
      return { value: undefined };
    }
    visitedIds.add(visitedKey);

    // Fetch the aliased variable
    const aliasVar = await figma.variables.getVariableByIdAsync(rawValue.id);
    if (!aliasVar) {
      consoleLog.error(`Alias variable not found for ID: ${rawValue.id}`);
      return { value: undefined };
    }

    // Build something like "{Button-Large.Primary.Font-Weight}"
    const aliasString = `{${variableNameToDotNotation(aliasVar.name)}}`;

    // Determine correct mode
    let aliasModeId = currentModeId;
    const aliasCollection = await figma.variables.getVariableCollectionByIdAsync(
      aliasVar.variableCollectionId
    );
    if (!aliasCollection || !(aliasModeId in aliasVar.valuesByMode)) {
      aliasModeId = aliasCollection ? aliasCollection.defaultModeId : undefined;
    }
    if (!aliasModeId || !(aliasModeId in aliasVar.valuesByMode)) {
      consoleLog.warn(`No matching mode found for alias variable ${rawValue.id}.`);
      return { alias: aliasString, value: undefined };
    }

    // Recursively resolve the actual value
    const nestedVal = aliasVar.valuesByMode[aliasModeId];
    const { value: nestedValue } = await fullyResolveValue(nestedVal, aliasModeId, visitedIds);

    return {
      alias: aliasString,
      value: nestedValue,
    };
  }

  // If not an alias => it's already a primitive
  return { value: rawValue };
}

/**
 * Resolves a single variable across all of its modes.
 * Returns a structure with each mode ID as a key:
 *
 *  {
 *    name: string;
 *    path: string[];
 *    values: { [modeId: string]: { alias?: string; value: any } };
 *  }
 */
async function resolveVariable(
  variable: Variable,
  visitedVariables = new Set<string>()
): Promise<{
  name: string;
  path: Array<string>;
  values: Record<string, { alias?: string; value: any }>;
}> {
  const resolved: Record<string, { alias?: string; value: any }> = {};

  for (const [modeId, rawVal] of Object.entries(variable.valuesByMode)) {
    if (rawVal === undefined) {
      consoleLog.warn(`Variable "${variable.name}" has no value in mode "${modeId}"`);
      continue;
    }
    const result = await fullyResolveValue(rawVal, modeId, visitedVariables);
    resolved[modeId] = result;
  }

  // Split the variable name on '/' to create a path array
  const path = variable.name.split('/').map(segment => segment.trim());
  return {
    name: variable.name,
    path,
    values: resolved,
  };
}

/**
 * Takes an array of Variables, resolves them (including alias chains),
 * then builds a nested tokens object:
 *
 *  - If a variable only has 1 mode, it goes in the root.
 *  - If it has multiple modes, each mode ID (or name) is a top-level key.
 */
async function processVariables(variables: Array<Variable>): Promise<Record<string, any>> {
  const resolvedList = await Promise.all(variables.map(v => resolveVariable(v)));

  const tokens: Record<string, any> = {};

  for (const variable of resolvedList) {
    const modeIds = Object.keys(variable.values);

    if (modeIds.length === 1) {
      // Single-mode => place directly at root
      const onlyModeId = modeIds[0];
      const finalObj = createFinalValueObject(variable.values[onlyModeId]);
      nestTokens(tokens, variable.path, finalObj);
    } else {
      // Multi-mode => each mode is a top-level key
      for (const [modeId, resolvedVal] of Object.entries(variable.values)) {
        if (!tokens[modeId]) tokens[modeId] = {};
        const finalObj = createFinalValueObject(resolvedVal);
        nestTokens(tokens[modeId], variable.path, finalObj);
      }
    }
  }

  return tokens;
}

/**
 * Nests data at the given path inside an object,
 * e.g. path ["colors", "red", "100"] => tokens.colors.red.100
 */
function nestTokens(tokens: Record<string, any>, path: Array<string>, data: any) {
  let current = tokens;
  for (let i = 0; i < path.length; i++) {
    // Convert spaces to hyphens in the path segments
    const segment = path[i].replaceAll(' ', '-');
    if (i === path.length - 1) {
      current[segment] = data;
    } else {
      if (!current[segment]) {
        current[segment] = {};
      }
      current = current[segment];
    }
  }
}

/**
 * Create the final object that will be placed in the JSON tree:
 *   - Always have "value" (the final primitive)
 *   - If there's an alias, also include "alias"
 *   - Always include "type" for style dictionary or other uses
 */
function createFinalValueObject(resolved: { alias?: string; value: any }) {
  // 1) transform the final value if it's a color object -> hex
  const [typedValue, valueType] = determineValueAndType(resolved.value);

  // 2) Build the object
  if (resolved.alias !== undefined) {
    return {
      alias: resolved.alias,
      value: typedValue,
      type: valueType,
    };
  }
  // No alias => just the value + type
  return {
    value: typedValue,
    type: valueType,
  };
}

/**
 * Determine if `val` is a color, a number, or a string, etc.
 * Return `[convertedValue, typeString]`.
 */
function determineValueAndType(val: any): [any, string] {
  if (val && typeof val === 'object' && 'r' in val && 'g' in val && 'b' in val) {
    // It's a Figma color -> convert to hex
    const hex = figmaColorToHex(val);
    return [hex, 'color'];
  } else if (typeof val === 'number') {
    return [val, 'number'];
  } else if (typeof val === 'string') {
    return [val, 'string'];
  } else if (val === undefined || val === null) {
    return [val, 'unknown'];
  }

  // fallback
  consoleLog.warn(`Unrecognised primitive type: ${JSON.stringify(val)}`);
  return [val, 'unknown'];
}

////////////////////////////////////////////////////////////////////////////////
// 3. OPTIONAL MODE RENAMING LOGIC
////////////////////////////////////////////////////////////////////////////////

/**
 * Rename the top-level keys (e.g. "9356:0") to the actual mode names or something custom.
 */
function renameModesWithMap(tokens: Record<string, any>, modeMap: Record<string, string>) {
  const renamed: Record<string, any> = {};
  for (const modeId of Object.keys(tokens)) {
    const newName = modeMap[modeId] ?? modeId;
    renamed[newName] = tokens[modeId];
  }
  return renamed;
}

////////////////////////////////////////////////////////////////////////////////
// 4. EXPORT VARIABLES: Main Logic for Your Plugin
////////////////////////////////////////////////////////////////////////////////

async function exportVariables(selectedCollectionKeys: Array<string>) {
  consoleLog.log('Selected Collection Keys:', selectedCollectionKeys);
  try {
    // Show loading in UI
    figma.ui.postMessage({ type: 'show-loading' });

    // Fetch library collections
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();

    consoleLog.log('Available Library Collections:', libraryCollections);

    // Filter to the collections the user selected
    const selectedLibraryCollections = libraryCollections.filter(col =>
      selectedCollectionKeys.includes(col.key)
    );
    consoleLog.log('Selected Library Collections:', selectedLibraryCollections);

    const tokensPerCollection = [];

    // For each selected collection
    for (const collection of selectedLibraryCollections) {
      // 1) Get the variables in that library collection
      const libraryVars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
        collection.key
      );

      // 2) Import them into the local file
      const importedVariables: Array<Variable> = [];
      for (const variable of libraryVars) {
        const importedVar = await figma.variables.importVariableByKeyAsync(variable.key);
        importedVariables.push(importedVar);
      }

      // 3) Process them (alias resolution, nesting, etc.)
      let tokens = await processVariables(importedVariables);

      // 3b) Optional: rename "9356:0" => "mobile" or the actual mode name from the collection
      const varCollection = await figma.variables.getVariableCollectionByIdAsync(
        importedVariables[0]?.variableCollectionId
      );
      if (varCollection) {
        const modeMap: Record<string, string> = {};
        for (const m of varCollection.modes) {
          // e.g.: m = { modeId: "9356:0", name: "mobile" }
          modeMap[m.modeId] = m.name;
        }
        tokens = renameModesWithMap(tokens, modeMap);
      }

      // 4) Store the resulting JSON
      tokensPerCollection.push({
        collectionName: `${collection.libraryName}--${collection.name}`,
        tokensJson: JSON.stringify(tokens, null, 2),
      });
    }

    // Send tokens back to the UI
    figma.ui.postMessage({ type: 'variables-exported', data: tokensPerCollection });
  } catch (err: any) {
    consoleLog.error('Error during exportVariables:', err);
    figma.ui.postMessage({ type: 'export-error', message: err.message });
  } finally {
    // Hide loading spinner
    figma.ui.postMessage({ type: 'hide-loading' });
  }
}

////////////////////////////////////////////////////////////////////////////////
// 5. PLUGIN MESSAGE HANDLERS
////////////////////////////////////////////////////////////////////////////////

figma.ui.onmessage = async msg => {
  if (msg.type === 'get-filename') {
    const fileName = figma.root.name;
    const fileNameKebab = fileName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    figma.ui.postMessage({ type: 'filename', data: fileNameKebab });
  } else if (msg.type === 'get-collections') {
    // Return the available library collections to the UI
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
    const collectionsData = libraryCollections.map(c => ({
      key: c.key,
      name: c.name,
      libraryName: c.libraryName,
    }));
    figma.ui.postMessage({ type: 'collections-loaded', data: collectionsData });
  } else if (msg.type === 'export-variables') {
    const selectedCollectionKeys = msg.selectedCollections; // e.g. ["Key123", "Key456"]
    await exportVariables(selectedCollectionKeys);
  } else if (msg.type === 'save-token') {
    // Save a GitHub token (example)
    await figma.clientStorage.setAsync('githubToken', msg.token);
    figma.ui.postMessage({ type: 'token-saved' });
  } else if (msg.type === 'load-token') {
    // Load a GitHub token (example)
    const token = await figma.clientStorage.getAsync('githubToken');
    figma.ui.postMessage({ type: 'token-loaded', token });
  } else if (msg.type === 'resize') {
    // UI resize message
    figma.ui.resize(msg.size.w, msg.size.h);
    figma.clientStorage.setAsync('size', msg.size).catch(err => {
      consoleLog.error(err);
    });
  }
};
