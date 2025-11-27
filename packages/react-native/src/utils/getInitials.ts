export function getInitials(name?: string) {
  if (!name) return undefined;
  const regex = new RegExp(/(\p{L}{1})\p{L}+/gu);
  const names = [...name.matchAll(regex)];
  const initials = (names.shift()?.[1] || '') + (names.pop()?.[1] || '');
  return initials.toUpperCase();
}
