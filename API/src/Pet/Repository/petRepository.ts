import Pet from "../Model/Pet";

export default interface petRepository {

    getPet(id: String): Promise<Pet>;

    getPetOwnersID(id: String): Promise<Pet>;

    savePet(pet: Pet): Promise<void>;

    updatePet(pet: Pet): Promise<void>;

    deletePet(id: string): Promise<void>;

}