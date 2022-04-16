import CustomAPIError from "./custom-api";
import BadRequestError from "./bad-request";
import NotFoundError from "./not-found";
import UnAuthenticatedError from "./unauthenticated";
import UnAuthorizedError from "./unauthorized";

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
    UnAuthorizedError
}