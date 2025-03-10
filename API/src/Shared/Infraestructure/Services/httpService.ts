import { injectable } from "tsyringe";
import type { Response } from 'express';


export const HTTP_OK = 200;
export const HTTP_Created = 201;
export const HTTP_BAD_REQUEST = 400
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_NOT_FOUND = 404;
export const HTTP_CONFLICT = 409;
export const HTTP_INTERNAL_SERVER_ERROR = 500;

/*
    Define
*/
@injectable()
export default class httpService {

    send(httpCode: number, response: Response, body?: any) {
        response.status(httpCode);
        response.send(body);
    }

    // 200 ok
    ok(response: Response, body?: any) {
        this.send(HTTP_OK, response, body);
    }

    // 201 Created
    created(response: Response, body?: any) {
        this.send(HTTP_Created, response, body);
    }

    // 400 bad request
    badRequest(response: Response, body?: any) {
        this.send(HTTP_BAD_REQUEST, response, body);
    }

    // 401 unauthorized
    unauthirized(response: Response, body?: any) {
        this.send(HTTP_UNAUTHORIZED, response, body);
    }

    // 404 Not found
    notFound(response: Response, body?: any) {
        this.send(HTTP_NOT_FOUND, response, body);
    }

    // 409 conflict
    conflict(response: Response, body?: any) {
        this.send(HTTP_CONFLICT, response, body);
    }

    // 500 internal server error
    internalServerError(response: Response, body?: any) {
        this.send(HTTP_INTERNAL_SERVER_ERROR, response, body);
    }
}