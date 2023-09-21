"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizePaginationData = void 0;
const sanitizePaginationData = (query) => {
    const pageNumber = query.pageNumber ? +query.pageNumber : 1;
    const pageSize = query.pageSize ? +query.pageSize : 10;
    return { pageNumber, pageSize };
};
exports.sanitizePaginationData = sanitizePaginationData;
//# sourceMappingURL=pagination-query-extractor.utility.js.map