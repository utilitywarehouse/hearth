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

function isVariableAlias(value: VariableValue): value is VariableAlias {
  return typeof value === 'object' && value !== null && (value as any).type === 'VARIABLE_ALIAS';
}

/**
 * Converts e.g. "Button Large / Primary / Font Weight" -> "Button-Large.Primary.Font-Weight".
 * Slashes => dots, spaces => hyphens.
 */
function variableNameToDotNotation(name: string): string {
  return name
    .trim()
    .replace(/\s*\/\s*/g, '.') // slash to dot
    .replace(/\s+/g, '-'); // spaces to hyphens
}

/**
 * Recursively resolves a variable value (which might be an alias chain)
 * returning { alias?: string; value: any }.
 */
async function fullyResolveValue(
  rawValue: VariableValue | undefined,
  currentModeId: string,
  visitedIds: Set<string> = new Set(),
  currentModeName?: string
): Promise<{ alias?: string; value: any }> {
  if (rawValue === undefined) {
    return { value: undefined };
  }

  if (isVariableAlias(rawValue)) {
    const visitedKey = `${rawValue.id}::${currentModeId}`;
    if (visitedIds.has(visitedKey)) {
      consoleLog.warn(`Circular reference detected for variable: ${visitedKey}`);
      return { value: undefined };
    }
    visitedIds.add(visitedKey);

    const aliasVar = await figma.variables.getVariableByIdAsync(rawValue.id);
    if (!aliasVar) {
      consoleLog.error(`Alias variable not found for ID: ${rawValue.id}`);
      return { value: undefined };
    }

    // E.g. {Button-Large.Primary.Font-Weight}
    const aliasString = `{${variableNameToDotNotation(aliasVar.name)}}`;

    // Determine correct mode - try to match by mode name first
    let aliasModeId = currentModeId;
    const aliasColl = await figma.variables.getVariableCollectionByIdAsync(
      aliasVar.variableCollectionId
    );

    if (aliasColl && currentModeName) {
      // Try to find a mode with the same name as the current mode
      const matchingMode = aliasColl.modes.find(mode => mode.name === currentModeName);
      if (matchingMode && matchingMode.modeId in aliasVar.valuesByMode) {
        aliasModeId = matchingMode.modeId;
      } else if (!(aliasModeId in aliasVar.valuesByMode)) {
        // Fallback to default mode if current mode doesn't exist
        aliasModeId = aliasColl.defaultModeId;
      }
    } else if (!aliasColl || !(aliasModeId in aliasVar.valuesByMode)) {
      aliasModeId = aliasColl ? aliasColl.defaultModeId : undefined;
    }

    if (!aliasModeId || !(aliasModeId in aliasVar.valuesByMode)) {
      consoleLog.warn(`No matching mode found for alias variable ${rawValue.id}.`);
      return { alias: aliasString, value: undefined };
    }

    // Get the mode name for the resolved alias mode
    const resolvedModeName = aliasColl?.modes.find(m => m.modeId === aliasModeId)?.name;

    // Recursively resolve
    const nestedVal = aliasVar.valuesByMode[aliasModeId];
    const { value: nestedValue } = await fullyResolveValue(
      nestedVal,
      aliasModeId,
      visitedIds,
      resolvedModeName
    );
    if (nestedValue === undefined) {
      consoleLog.warn(`Resolved value for alias ${aliasString} is undefined.`);
      return { alias: aliasString, value: undefined };
    }
    return { alias: aliasString, value: nestedValue };
  }

  // Not an alias => primitive
  return { value: rawValue };
}

async function resolveVariable(variable: Variable): Promise<{
  name: string;
  path: Array<string>;
  values: Record<string, { alias?: string; value: any }>;
}> {
  const resolved: Record<string, { alias?: string; value: any }> = {};

  // Get the variable's collection to access mode names
  const varColl = await figma.variables.getVariableCollectionByIdAsync(
    variable.variableCollectionId
  );

  for (const [modeId, rawVal] of Object.entries(variable.valuesByMode)) {
    if (rawVal === undefined) {
      consoleLog.warn(`Variable "${variable.name}" has no value in mode "${modeId}"`);
      continue;
    }
    // Create a fresh visited set for each mode to allow proper alias resolution
    const modeVisitedIds = new Set<string>();
    // Get the mode name for better alias resolution
    const modeName = varColl?.modes.find(m => m.modeId === modeId)?.name;
    const result = await fullyResolveValue(rawVal, modeId, modeVisitedIds, modeName);
    resolved[modeId] = result;
  }

  const path = variable.name.split('/').map(segment => segment.trim());
  return { name: variable.name, path, values: resolved };
}

/**
 * Takes an array of Variables, resolves them, then builds a nested tokens object.
 */
async function processVariables(variables: Array<Variable>): Promise<Record<string, any>> {
  const resolvedList = await Promise.all(variables.map(v => resolveVariable(v)));
  const tokens: Record<string, any> = {};

  for (const variable of resolvedList) {
    const modeIds = Object.keys(variable.values);

    if (modeIds.length === 1) {
      const onlyModeId = modeIds[0];
      const finalObj = createFinalValueObject(variable.values[onlyModeId]);
      nestTokens(tokens, variable.path, finalObj);
    } else {
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
 * Nest the final object in the tokens tree at `path`.
 */
function nestTokens(tokens: Record<string, any>, path: Array<string>, data: any) {
  let current = tokens;
  for (let i = 0; i < path.length; i++) {
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
 * Format final object => { alias?, value, type }.
 */
function createFinalValueObject(resolved: { alias?: string; value: any }) {
  const [typedValue, valueType] = determineValueAndType(resolved.value);

  if (resolved.alias !== undefined) {
    return {
      alias: resolved.alias,
      value: typedValue,
      type: valueType,
    };
  }
  return {
    value: typedValue,
    type: valueType,
  };
}

/**
 * Distinguish color, number, string, etc.
 */
function determineValueAndType(val: any): [any, string] {
  if (val && typeof val === 'object' && 'r' in val && 'g' in val && 'b' in val) {
    const hex = figmaColorToHex(val);
    return [hex, 'color'];
  } else if (typeof val === 'number') {
    return [val, 'number'];
  } else if (typeof val === 'string') {
    return [val, 'string'];
  } else if (val === undefined || val === null) {
    return [val, 'unknown'];
  }
  consoleLog.warn(`Unrecognized primitive type: ${JSON.stringify(val)}`);
  return [val, 'unknown'];
}

function renameModesWithMap(tokens: Record<string, any>, modeMap: Record<string, string>) {
  const renamed: Record<string, any> = {};
  for (const modeId of Object.keys(tokens)) {
    const newName = modeMap[modeId] ?? modeId;
    if (renamed[newName]) {
      consoleLog.warn(`Mode "${newName}" already exists, skipping rename for "${modeId}"`);
      continue;
    }
    if (newName === modeId) {
      consoleLog.warn(`Mode "${newName}" doesn't map to anything, skipping rename for "${modeId}"`);
      continue;
    }
    renamed[newName] = tokens[modeId];
  }
  return renamed;
}

function sortTokensRecursive(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortTokensRecursive);
  } else if (obj !== null && typeof obj === 'object') {
    const sortedKeys = Object.keys(obj).sort();
    const newObj: any = {};
    for (const key of sortedKeys) {
      newObj[key] = sortTokensRecursive(obj[key]);
    }
    return newObj;
  }
  return obj;
}

////////////////////////////////////////////////////////////////////////////////
// 4. EXPORT VARIABLES (LOCAL + LIBRARY) - Using Async
////////////////////////////////////////////////////////////////////////////////

async function exportVariables(selectedCollectionIds: Array<string>) {
  consoleLog.log('Selected Collection IDs:', selectedCollectionIds);
  try {
    figma.ui.postMessage({ type: 'show-loading' });

    // 1) Team-library collections (by .key)
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
    // 2) Local collections (by .id)
    //    Must call getLocalVariableCollectionsAsync() for async usage
    const localCollections = await figma.variables.getLocalVariableCollectionsAsync();

    // unify them
    const unifiedCollections = [
      ...libraryCollections.map(c => ({
        isLocal: false as const,
        id: c.key, // library uses .key
        name: c.name,
        libraryName: c.libraryName,
      })),
      ...localCollections.map(c => ({
        isLocal: true as const,
        id: c.id, // local uses .id
        name: c.name,
        libraryName: `${figma.root.name} (Local)`,
      })),
    ];

    consoleLog.log('Unified collections (local + library):', unifiedCollections);

    const tokensPerCollection = [];

    for (const selectedId of selectedCollectionIds) {
      const matched = unifiedCollections.find(u => u.id === selectedId);
      if (!matched) {
        consoleLog.warn(`No matching collection for ID: ${selectedId}`);
        continue;
      }

      let importedVariables: Array<Variable> = [];

      if (!matched.isLocal) {
        // library
        const libraryVars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(
          matched.id
        );
        const importPromises = libraryVars.map(lv =>
          figma.variables.importVariableByKeyAsync(lv.key)
        );
        const allImported = await Promise.all(importPromises);
        importedVariables.push(...allImported);
      } else {
        // local
        const localColl = await figma.variables.getVariableCollectionByIdAsync(matched.id);
        if (!localColl) {
          consoleLog.warn(`No local collection found for ID: ${selectedId}`);
          continue;
        }
        // gather variables by ID
        const varPromises = localColl.variableIds.map(vId =>
          figma.variables.getVariableByIdAsync(vId)
        );
        const results = await Promise.all(varPromises);
        importedVariables = results.filter(Boolean);
      }

      consoleLog.log(`Imported Variables for "${matched.name}":`, importedVariables);

      // 2) Process
      let tokens = await processVariables(importedVariables);

      // 3) rename modes
      if (importedVariables.length > 0) {
        // get the first var's collection
        const firstVar = importedVariables[0];
        const varColl = await figma.variables.getVariableCollectionByIdAsync(
          firstVar.variableCollectionId
        );
        if (varColl) {
          const modeMap: Record<string, string> = {};
          for (const m of varColl.modes) {
            modeMap[m.modeId] = m.name;
          }
          // if there are multiple modes, rename them otherwise keep as is
          tokens = varColl.modes.length > 1 ? renameModesWithMap(tokens, modeMap) : tokens;
        }
      }

      // Sort tokens
      tokens = sortTokensRecursive(tokens);

      // 4) Save final
      tokensPerCollection.push({
        collectionName: `${matched.libraryName?.replace(' (Local)', '')}--${matched.name}`,
        tokensJson: JSON.stringify(tokens, null, 2),
      });
    }

    figma.ui.postMessage({ type: 'variables-exported', data: tokensPerCollection });
  } catch (err: any) {
    consoleLog.error('Error during exportVariables:', err);
    figma.ui.postMessage({ type: 'export-error', message: err.message });
  } finally {
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
    // library
    const libraryCollections =
      await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
    // local
    const localCollections = await figma.variables.getLocalVariableCollectionsAsync();

    const allCollections = [
      ...libraryCollections.map(c => ({
        isLocal: false,
        id: c.key,
        name: c.name,
        libraryName: c.libraryName,
      })),
      ...localCollections.map(c => ({
        isLocal: true,
        id: c.id,
        name: c.name,
        libraryName: `${figma.root.name} (Local)`,
      })),
    ];
    figma.ui.postMessage({ type: 'collections-loaded', data: allCollections });
  } else if (msg.type === 'export-variables') {
    const selectedCollectionIds = msg.selectedCollections;
    await exportVariables(selectedCollectionIds);
  } else if (msg.type === 'save-token') {
    await figma.clientStorage.setAsync('githubToken', msg.token);
    figma.ui.postMessage({ type: 'token-saved' });
  } else if (msg.type === 'load-token') {
    const token = await figma.clientStorage.getAsync('githubToken');
    figma.ui.postMessage({ type: 'token-loaded', token });
  } else if (msg.type === 'resize') {
    figma.ui.resize(msg.size.w, msg.size.h);
    figma.clientStorage.setAsync('size', msg.size).catch(err => {
      consoleLog.error(err);
    });
  }
};
