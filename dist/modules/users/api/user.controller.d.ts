import { UserRepository } from '../db/user.repository';
import { User } from '../entities/user.entity';
export declare class UserController {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createFaq(name: string): Promise<User>;
    findUser(id: number): Promise<User[]>;
}
