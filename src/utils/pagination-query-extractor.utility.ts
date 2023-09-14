export const sanitizePaginationData = (
  query,
): { pageNumber: number; pageSize: number } => {
  const pageNumber = query.pageNumber ? +query.pageNumber : 1;
  const pageSize = query.pageSize ? +query.pageSize : 10;
  return { pageNumber, pageSize };
};
