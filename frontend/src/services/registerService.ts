import axios from "axios";
import type { RegisterResponse } from "../models/registerResponse";

//Gör en POST-request till servern
export const registerUser = async (registerResponse: RegisterResponse) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/register",
      {
        username: registerResponse.username,
        email: registerResponse.email,
        password: registerResponse.password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    if (response.status >= 200 && response.status < 300) return response.data;
  } catch (error) {
    alert("Registreringen misslyckades. Försök igen!");
  }
}