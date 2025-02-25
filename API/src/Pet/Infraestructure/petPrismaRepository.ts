import Pet from "../Model/Pet";
import petRepository from "../Repository/petRepository"


import { injectable } from "tsyringe";

@injectable()
export default class petPrismaRepository implements petRepository {

    getPet(id: String): Promise<Pet> {
        throw new Error("Method not implemented.");
    }

    getPetOwnersID(id: String): Promise<Pet> {
        throw new Error("Method not implemented.");
    }

    savePet(pet: Pet): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updatePet(pet: Pet): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deletePet(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}