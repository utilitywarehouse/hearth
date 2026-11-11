const MAX_SUGGESTION_DISTANCE = 3;
const MAX_SUGGESTIONS = 3;

const editDistance = (a: string, b: string): number => {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, substitution);
    }
    previous = current;
  }
  return previous[b.length];
};

/** The few candidates closest to `name`, for a "did you mean" message. */
export const suggestSimilar = (name: string, candidates: Iterable<string>): Array<string> =>
  [...new Set(candidates)]
    .map(candidate => ({ candidate, distance: editDistance(name, candidate) }))
    .filter(({ distance }) => distance <= MAX_SUGGESTION_DISTANCE)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, MAX_SUGGESTIONS)
    .map(({ candidate }) => candidate);
