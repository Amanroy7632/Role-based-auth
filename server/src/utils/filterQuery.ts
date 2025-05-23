export default class FilterQuery {
  getPaginatedValue(page: any, limit: any) {
    const currentPage = parseInt(page, 10) || 1;
    const pageLimit = parseInt(limit, 10) || 10;
    const offset = (currentPage - 1) * pageLimit;
    return { currentPage, pageLimit, offset };
  }
  removeSpecialChars(search: string = "") {
    if (search !== "undefined" && search !== "" && search !== "\\") {
      // Remove all backslashes and decode %20
      const refinedSearchText = search.replace(/\\/g, "").replace(/%20/g, " ");

      // Escape special regex characters to prevent errors
      const safeRegexText = refinedSearchText.replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        "\\$&"
      );

      // Remove any remaining backslashes
      return safeRegexText.replace(/\\/g, "");
    }
    return "";
  }
}
export const filterQuery = new FilterQuery();
