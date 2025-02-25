import { Request, Response } from "express";
import { HttpController } from "../../Shared/Infraestructure/types";
import httpService from "../../Shared/Infraestructure/Services/httpService";
import { inject, injectable } from "tsyringe";
import userRepository from "../Repository/UserRepository";
import { USER_REPOSITORY } from "../../Shared/Infraestructure/dependecy-names";
import { Uuid } from "../../Shared/Models/Uuid";
import { User } from "../Model/User";

@injectable()
export class getUserController implements HttpController {
    constructor(
        private httpService: httpService,
        @inject(USER_REPOSITORY) private userRepository: userRepository
    ) {}

    async execute(request: Request, response: Response): Promise<void> {
        try { 

            const { id } = request.params

            if (!id) {
                this.httpService.badRequest(response, { message: "No se proporcionó un ID válido" });
                return;
            }
            
            const user = await this.userRepository.getUser(new Uuid(request.params.id));

            if(!user) {
                this.httpService.notFound(response, "User not found");
                return
            }

            this.httpService.ok(response, { message: "Usuario encontrado", user: user.getPrimitives()});

        } catch{
            this.httpService.badRequest(response, {response: "No se proporcionó un id válido"});
        }
    }
    
}