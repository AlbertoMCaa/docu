import { container as di } from 'tsyringe';
import { config as dotenvConfig } from 'dotenv'
import { ENV_SERVICE, HTTP_SERVER, PET_REPOSITORY, USER_REPOSITORY } from './dependecy-names';
import userPrismaRepository from '../../User/Infraestructure/userPrismaRepository';
import petPrismaRepository from '../../Pet/Infraestructure/petPrismaRepository';
import { EnvService } from './Services/EnvService';
import { httpServer } from './httpServer';


dotenvConfig();

// Define every dependency to inject.

const userRepository = di.resolve(userPrismaRepository);
di.register(USER_REPOSITORY, { useValue: userRepository });

const petRepository = di.resolve(petPrismaRepository);
di.register(PET_REPOSITORY, {useValue: petRepository});

const envService = di.resolve(EnvService);
di.register(ENV_SERVICE, {useValue: envService});

const HttpServer = di.resolve(httpServer);
di.register(HTTP_SERVER, {useValue: HttpServer});

export { di };