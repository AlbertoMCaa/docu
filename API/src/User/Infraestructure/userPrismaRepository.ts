import { injectable } from "tsyringe";
import userRepository from "../Repository/UserRepository";
import { LogServices } from "../../Shared/Infraestructure/Services/LogService";
import { Name } from "../../Shared/Models/Name";
import { Uuid } from "../../Shared/Models/Uuid";
import { User } from "../Model/User";
import { SecureDate } from "../../Shared/Models/SecureDate";
import { prisma } from "../../Shared/Prisma/prisma";
import { v4 as uuidv4 } from 'uuid';

@injectable()
export default class userPrismaRepository implements userRepository {

    constructor(
        private logService: LogServices,
    ) {}

    async saveUser(user: User): Promise<void> {
        const existingUser = await this.getUser(user.id);

        try{
            if (existingUser) {
            
                await prisma.user.update({ // Update an existing record
                  where: { id: user.id.value },
                  data: {
                    name: user.name.value,
                    email: user.email.value,
                    birthDate: user.birthDate.value,
                  },
                });
                this.logService.log(`User updated with id ${user.id.value}`);
                
            } else {

                await prisma.user.create({ // Create new record
                  data: {
                    id: user.id.value,
                    name: user.name.value,
                    email: user.email.value,
                    birthDate: user.birthDate.value,
                  },
                });
                this.logService.log(`User created with id ${user.id.value}`);
            }
        } catch(error: any) {

            if(error.code === 'P2002'){
                throw new Error("The email already exists!");
            }
        }
    }

    async saveUserPassword(id: Uuid, password: Name): Promise<void> {
        const userExists = await this.getUser(id);

        if(userExists){
            await prisma.user.update({
                where : {id: id.value},
                data: {
                    password: password.value
                },
            });
            this.logService.log(`Updated user password with id: ${id.value}`)
        } else {

            this.logService.log(`Error. User with id: ${id.value} was not found`)
        }
    }
    async getUser(id: Uuid): Promise<User | null>  {
        const userRecord = await prisma.user.findUnique({
            where: {
                id: id.value
            },
        });
        
        if (!userRecord) {
            return null;
        }

        const user = new User(
            new Uuid(userRecord.id),
            new Name(userRecord.name),
            new Name(userRecord.email),
            new SecureDate(userRecord.birthDate)
        );

        return user;
    }
    async getUserbyAcccessToken(accessToken: Uuid): Promise<User> {
        const userRecord = await prisma.user.findFirst({
            where: { accessToken: accessToken.value },
        })

        if (!userRecord) throw new Error(`Error. User not found.`);
        
        return new User(
            new Uuid(userRecord.id),
            new Name(userRecord.name),
            new Name(userRecord.email),
            new SecureDate(userRecord.birthDate),
        );
    }
    async createAccessToken(id: Uuid): Promise<Uuid> {
        const newToken = new Uuid(uuidv4());
        
        await prisma.user.update({
            where: { id: id.value },
            data: { accessToken: newToken.value },
        });

        this.logService.log(`Access token created for user ${id.value}`);
        return new Uuid(newToken.value);
    }
    async updateUserEmail(id: Uuid, newEmail: Name): Promise<void> {
        await prisma.user.update({
            where: { id: id.value },
            data: { email: newEmail.value },
          });

          this.logService.log(`Email updated for user ${id.value}`);
    }
    async updateUserName(id: Uuid, newName: Name): Promise<void> {
        await prisma.user.update({
            where: { id: id.value },
            data: { name: newName.value },
        });

        this.logService.log(`Name updated for usere ${id.value}`)
    }
    async updateUserBirthDate(id: Uuid, newDate: SecureDate): Promise<void> {
        await prisma.user.update({
            where: {id: id.value},
            data: { birthDate: newDate.value},
        });
        this.logService.log(`Birth date updated for user ${id.value}`);
    }
    async deleteUser(id: Uuid): Promise<Boolean> {
        try {

            await prisma.user.delete({
              where: { id: id.value },
            });
            
            this.logService.log(`User deleted with id ${id.value}`);
            return true;

          } catch (error: any) {

            this.logService.log(`Error deleting user with id ${id.value}: ${error.message}`);
            return false;
        }
    }
}