import { injectable } from "tsyringe";
import express, { Application, Request, RequestHandler, Response } from "express";
import { Server } from "http";
import httpService from "./Services/httpService";
import { LogServices } from "./Services/LogService";
import cors from 'cors';
import { resolve } from "path";
import { EndpointsMap, HttpControllerBuilder } from "./types";
import { di } from "./dependency-injection";

@injectable()
export class httpServer {
    private app: Application;
    private server: Server | undefined;

    constructor(
        private httpService: httpService,
        private logService: LogServices
    ){
        this.app = express();

        this.app.use(cors());
        this.app.use(express.json());
        this.app.set('trust proxy', false);

        this.setupNotFoundHandler();
    }

    bindEndpoints(endpointsMap: EndpointsMap): void {
        for (const [endpoint, endpointHandler] of Object.entries(endpointsMap)) {
            const colon = endpoint.indexOf(':');
            const method = endpoint.substring(0, colon).trim().toLowerCase() as 'get' | 'post' | 'put' | 'delete';
            const path = endpoint.substring(colon + 1).trim();
            
            if (!['get', 'post', 'put', 'delete'].includes(method)) {
                throw new Error(`El método http "${method}" no está soportado.`);
            }

            let handlers: RequestHandler[];

            if (Array.isArray(endpointHandler)) {
                handlers = endpointHandler.map((handler, index) => {
                    if (index + 1 === endpointHandler.length) {
                        return this.controllerRunner(handler as HttpControllerBuilder);
                    }
                    return handler;
                }) as RequestHandler[];
            } else {
                handlers = [this.controllerRunner(endpointHandler)];
            }

            this.app[method](path, ...handlers);
        }
    }
    private controllerRunner(controllerBuilder: HttpControllerBuilder): RequestHandler {
        return async (request: Request, response: Response) => {
            try {
                this.logService.log(`Ejecutando controlador en la ruta '${request.originalUrl}'.`);
                const controller = di.resolve(controllerBuilder);

                await controller.execute(request, response);
            
            } catch (error) {

                const err = error as Error;
                this.logService.log(err);

                response.status(500).json( {error: "Server internal error", details: err.message});
            } finally {
                if (!response.writableEnded) {
                    response.end();
                }
            }
        };
    }

    private setupNotFoundHandler(): void {
        this.app.use((request: Request, response: Response) => {
            response.status(404).json({ error: "Route not found error" });
        });
    }

    start(port: number): Promise<void>{
        return new Promise(resolve => {
            this.server = this.app.listen(port, () =>{
                this.logService.log(`Servidor iniciado en el puerto ${port}.`);
                resolve();
            });
        });
    }

    stop(): Promise<void> {
        return new Promise(resolve =>{
            if(!this.server){
                resolve();
                return;
            }
            this.server.close(() => {
                resolve();
            });
        });
    }
}