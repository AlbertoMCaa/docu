import { inject, injectable } from "tsyringe";
import httpService from "../../Shared/Infraestructure/Services/httpService";
import { USER_REPOSITORY } from "../../Shared/Infraestructure/dependecy-names";
import userRepository from "../Repository/UserRepository";
import { HttpController } from "../../Shared/Infraestructure/types";
import { Request, Response } from "express";
import { Uuid } from "../../Shared/Models/Uuid";
import { Name } from "../../Shared/Models/Name";

@injectable()
export class UpdateUserPasswordController implements HttpController {
    constructor(
        private httpService: httpService,
        @inject(USER_REPOSITORY) private userRepository: userRepository,
    ) {}


    async execute(request: Request, response: Response): Promise<void> {
        try{
            if (!request.body) {
                this.httpService.badRequest(response, {message: "No se proporcionó cuerpo"})
                return;
            }

            const { id, password } = request.params;

            if (!id ||!password) {
                this.httpService.badRequest(response, {message: "ID y contraseña son necesarios"})
                return;
            }

            this.userRepository.saveUserPassword(new Uuid(id),new Name(password));
            
            this.httpService.ok(response, { message: "Password Updated Succesfully"});

        } catch (error: any) {
            this.httpService.internalServerError(response, `No Further details where provided \n ${error}`)
        }
    }


}