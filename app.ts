import "reflect-metadata";

import { ENV_SERVICE, HTTP_SERVER } from "./API/src/Shared/Infraestructure/dependecy-names";
import { di } from "./API/src/Shared/Infraestructure/dependency-injection";
import { httpServer } from "./API/src/Shared/Infraestructure/httpServer";
import { EnvService } from "./API/src/Shared/Infraestructure/Services/EnvService";
import { getUserController } from "./API/src/User/Controller/getUserController";
import { SaveUserController } from "./API/src/User/Controller/saveUserController";
import { DeleteUserController } from "./API/src/User/Controller/DeleteUserController";
import { UpdateUserPasswordController } from "./API/src/User/Controller/UpdateUserPasswordController";

/*
    Must use the Dependency Inversion pattern (Dependency Injection)

The projects structure must follow the following steps
-- Each Object, let's say a car has it's own package.
-- Each package hava  Model, Interface, Controller,
    Service, Infraestructure and Repository packages.
--  Repository defines the CRUD operations for the db implementation.  (use Prisma and Promises for async opeartions)
--  Infraestructure extends the forementioned repository and each operation is used in a service per each operation
--  Model defines the object.
--  Separete each method in different controllers. 
    The controllers might have an interface.

*/

const envService = di.resolve(EnvService)
const HttpServer = di.resolve(httpServer)


const httPort = envService.getInt('PORT');


HttpServer.bindEndpoints({
    'GET:/user/:id' : getUserController,
    'PUT:/user' : SaveUserController,
    'DELETE:/user/:id' : DeleteUserController,
    'PUT:/user/:id/password/:password' : UpdateUserPasswordController
});


async function startServer(): Promise<void> {
    await Promise.all([
        HttpServer.start(httPort)
    ]).then(() => {
        console.log(`El servidor está listo.`);
    });
}

async function stopServer(): Promise<void> {
    console.log('Deteniendo el servidor.');
    await Promise.all([
        HttpServer.stop(),
    ]);
    process.exit();
}

startServer();

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);



