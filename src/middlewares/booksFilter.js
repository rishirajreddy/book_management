import { errorResponse } from "../services/errorHandler.js";

export const queryFiltersBooks = (req, res, next) => {
  const authors = req.query.authors;
  const publication_year = req.query.publication_year;

  const allowedQueries = ["authors", "publication_year", "pagination"];

  if (
    !Object.keys(req.query).every((element) => allowedQueries.includes(element))
  ) {
    return res
      .status(400)
      .send(
        errorResponse({
          status: 400,
          message: `Invalid query passed. Only ${allowedQueries} are allowed`,
        })
      );
  }
  let queries = [];

  for (const q of Object.keys(req.query)) {
    switch (q) {
      case "authors":
        queries.push({
          author: { $regex: new RegExp(authors.split(",").join("|"), "i") },
        });
        break;
      case "publication_year":
        const publication_year_list = publication_year.split("-");
        if (publication_year_list.length === 1) {
          queries.push({
            publication_year: publication_year_list[0],
          });
        } else {
          queries.push({
            publication_year: {
              $gte: publication_year_list[0],
              $lte: publication_year_list[1],
            },
          });
        }
        break;

      default:
        break;
    }
  }

  req.filters = queries;
  return next();
};
