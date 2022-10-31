//import { UserGetterUseCase } from 'application/usecase/UserGetter'
import { UserCreatorUseCase } from "../../../application/usecase/UserCreator";
import { User } from "domain/entity/User";
import { InMemoryUserRepository } from "../../../infrastructure/implementation/inmemory/InMemoryUserRepository";

(async () => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  console.log(inMemoryUserRepository.userData);
  
  // creating a user
  const userCreatorUseCase = new UserCreatorUseCase(
    new InMemoryUserRepository()
  );
  const userToCreate: User = {
    id: "1q2w3e4r5t6y7u8i9o0p",
    name: "Julian",
    age: 23,
    username: "saenzjulian",
  };

  await userCreatorUseCase.run(userToCreate);

  console.log(inMemoryUserRepository.userData);

  //const userGetterUseCase = new UserGetterUseCase(new InMemoryUserRepository())
  //const users = await UserGetterUseCase.run()
  //console.log(users)
})();
