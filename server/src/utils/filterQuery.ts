export default class FilterQuery {
  getPaginatedValue(page: any, limit: any) {
    const currentPage = parseInt(page, 10) | 1;
    const pageLimit = parseInt(limit, 10) | 10;
    const offset = (currentPage - 1) * pageLimit;
    return { currentPage, pageLimit, offset };
  }
}
export const filterQuery =new FilterQuery();