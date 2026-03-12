interface GetNextIndexFromValueChangeOptions {
  prevValue: string;
  nextValue: string;
  length: number;
}

export const findDiffIndex = (prevValue: string, nextValue: string): number => {
  const minLength = Math.min(prevValue.length, nextValue.length);

  for (let i = 0; i < minLength; i += 1) {
    if (prevValue[i] !== nextValue[i]) {
      return i;
    }
  }

  return minLength;
};

export const getNextIndexFromValueChange = ({
  prevValue,
  nextValue,
  length,
}: GetNextIndexFromValueChangeOptions): number => {
  const diff = nextValue.length - prevValue.length;
  const editedIndex = findDiffIndex(prevValue, nextValue);

  if (diff >= 0) {
    return Math.min(editedIndex + 1, length);
  }

  return Math.max(editedIndex, 0);
};
