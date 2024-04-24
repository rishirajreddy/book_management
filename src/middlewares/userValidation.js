import { errorResponse } from "../services/errorHandler.js";

export function checkUserPermission(req, res, next) {
  //check id matches the id in the params
  if (req.data.id !== req.params.id) {
    return res.status(403).send(
      errorResponse({
        status: 403,
        message: "User ID belongs to different User",
      })
    );
  }
  return next();
}
