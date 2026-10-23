export const baseUrl = import.meta.env.VITE_BASE_URL
import axios from "axios";
import type { RegisterFormData, LoginFormData } from "../Lib/Schemas/Auth";




export async function registerApi(data: RegisterFormData) {
   const response = await axios.post(
      `${baseUrl}/users/signup`,
      data,
      {
         headers: {
            "Content-Type": "application/json",
         },
      }
   );

   return response.data;
}


export async function loginApi(data: LoginFormData) {
   const response = await axios.post(
      `${baseUrl}/users/signin`,
      data,
      {
         headers: {
            "Content-Type": "application/json",
         },
      }
   );

   return response.data;
}
