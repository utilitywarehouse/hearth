// jscodeshift's typings omit `importKind` on specifiers, but the parser sets it
export function isTypeOnly(node: object): boolean {
  return (node as { importKind?: string }).importKind === 'type';
}
