export const ELLIPSIS = '...';

const MAX_VISIBLE_ITEMS = 7;

export const generatePageNumbers = (
  currentPage: number,
  totalPages: number
): Array<number | typeof ELLIPSIS> => {
  if (totalPages <= MAX_VISIBLE_ITEMS) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | typeof ELLIPSIS> = [];
  const isNearStart = currentPage <= 4;
  const isNearEnd = currentPage > totalPages - 4;

  if (isNearStart) {
    pages.push(1, 2, 3, 4, 5, ELLIPSIS, totalPages);
    return pages;
  }

  if (isNearEnd) {
    pages.push(
      1,
      ELLIPSIS,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
    return pages;
  }

  pages.push(1, ELLIPSIS, currentPage - 1, currentPage, currentPage + 1, ELLIPSIS, totalPages);
  return pages;
};
