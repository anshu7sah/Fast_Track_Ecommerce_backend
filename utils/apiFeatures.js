class ApiFeature {
  constructor(query, querySearch) {
    this.query = query;
    this.querySearch = querySearch;
  }
  search() {
    const keyword = this.querySearch.keyword
      ? {
          name: {
            $regex: this.querySearch.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.querySearch };
    //Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((field) => {
      delete queryCopy[field];
    });
    //Filter for price and Rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.querySearch.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeature;
