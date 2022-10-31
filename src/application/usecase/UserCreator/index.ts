import { User } from 'domain/entity/User';
import { UserAlreadyExistsException } from '../../../domain/exception/UserAlreadyExistsException';
import { UserRepository } from 'domain/repository/UserRepository';
import { ExistUserByUserName } from '../../../domain/service/ExistUserByUserName';

export class UserCreatorUseCase{
    private readonly _userRepository: UserRepository;
    private readonly _existUserByUserName: ExistUserByUserName;

    constructor (userRespository: UserRepository){
        this._userRepository = userRespository;
        this._existUserByUserName = new ExistUserByUserName(userRespository);
    }

    async run (body: User): Promise<User>{
        const existUser: boolean = await this._existUserByUserName.run(body.username);
        
        if (existUser) throw new UserAlreadyExistsException(); 

        const UserCreated: User = await this._userRepository.save(body);
        
        return UserCreated;
    }

}