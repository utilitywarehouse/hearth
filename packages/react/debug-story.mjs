import fs from 'fs';
import path from 'path';
import typescript from 'typescript';

const filePath = '/Users/robphoenix/code/uw/hearth/packages/react/src/components/Badge/Badge.stories.tsx';
const storyName = 'Variants';
const source = fs.readFileSync(filePath, 'utf-8');

const sf = typescript.createSourceFile(
  path.basename(filePath), source,
  typescript.ScriptTarget.Latest, true, typescript.ScriptKind.TSX
);

function isExported(node) {
  const mods = typescript.canHaveModifiers(node) && typescript.getModifiers(node);
  return Array.isArray(mods) && mods.some(m => m.kind === typescript.SyntaxKind.ExportKeyword);
}

let found = false;
for (const stmt of sf.statements) {
  if (typescript.isVariableStatement(stmt)) {
    for (const decl of stmt.declarationList.declarations) {
      if (typescript.isIdentifier(decl.name) && decl.name.text === storyName) {
        found = true;
        console.log('Found', storyName, '| exported:', isExported(stmt));
        const init = decl.initializer;
        if (init) {
          console.log('  initializer kind:', typescript.SyntaxKind[init.kind]);
          if (typescript.isObjectLiteralExpression(init)) {
            for (const prop of init.properties) {
              if (typescript.isPropertyAssignment(prop) && typescript.isIdentifier(prop.name)) {
                console.log('  prop:', prop.name.text, '| value kind:', typescript.SyntaxKind[prop.initializer.kind]);
                if (prop.name.text === 'render') {
                  const fn = prop.initializer;
                  if (typescript.isArrowFunction(fn)) {
                    const body = fn.body;
                    console.log('  body kind:', typescript.SyntaxKind[body.kind]);
                    if (typescript.isParenthesizedExpression(body)) {
                      console.log('  inner kind:', typescript.SyntaxKind[body.expression.kind]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
if (!found) console.log(storyName, 'not found as VariableStatement');
