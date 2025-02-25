import { inject, injectable } from "tsyringe";
import httpService from "../../Shared/Infraestructure/Services/httpService";
import { HttpController } from "../../Shared/Infraestructure/types";
import { USER_REPOSITORY } from "../../Shared/Infraestructure/dependecy-names";
import { Request, Response } from "express";
import userRepository from "../Repository/UserRepository";

@injectable()
export class CreateAccessTokenController implements HttpController {

    constructor(
        private httpService: httpService,
        @inject(USER_REPOSITORY) private userRepository: userRepository
    ) {}

    async execute(request: Request, response: Response): Promise<void> {
        this.httpService.internalServerError(response, "");
        return
    }
}