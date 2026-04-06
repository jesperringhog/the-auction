import bcrypt from "bcryptjs";

//Skapa användaren - (REGISTERREQUEST IMPORTERAS FRÅN MODELS/REQUESTS/REGISTERREQUEST)
export const createUser = async (request: RegisterRequest) => {
  //Generera ett salt för kryptering av lösenord
  const salt = await bcrypt.genSalt();

  //Hasha lösenord
  const hashedPassword = await bcrypt.hash(request.password, salt);

  //Skapa användarobjekt att skicka till databasen
  const user = {
    username: request.username,
    email: request.email,
    password: hashedPassword,
  };

  //Spara användarobjektet i databasen - (USER IMPORTERAS FRÅN USERSCHEMA)
  const theNewUser = await User.create(user);

  //Skicka tillbaka den nya användaren till routern - (CONVERTTODTO IMPORTERAS FRÅN USERSCHEMA)
  return convertToDto(theNewUser);
};
