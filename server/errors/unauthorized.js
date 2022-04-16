import CustomAPIError from "./custom-api";
import { StatusCodes } from "http-status-codes";

class UnAuthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = UnAuthorizedError;