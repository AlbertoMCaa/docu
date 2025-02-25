import { Name } from "../../Shared/Models/Name";
import { SecureDate } from "../../Shared/Models/SecureDate";
import { Uuid } from "../../Shared/Models/Uuid";
import { User } from "../Model/User";

export default interface userRepository {

    saveUser(user: User): Promise<void> | null;

    saveUserPassword(id: Uuid, password: Name): Promise<void>;

    getUser(id: Uuid): Promise<User | null>;

    getUserbyAcccessToken(accessToken: Uuid): Promise<User>;

    createAccessToken(id: Uuid): Promise<Uuid>;

    updateUserEmail(id: Uuid, newEmail: Name): Promise<void>;

    updateUserName(id: Uuid, newName: Name): Promise<void>;

    updateUserBirthDate(id: Uuid, newDate: SecureDate): Promise<void>;

    deleteUser(id: Uuid): Promise<Boolean>
}
