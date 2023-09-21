import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    save(user: User): Promise<User>;
    findUser(id: number): Promise<User[]>;
}
