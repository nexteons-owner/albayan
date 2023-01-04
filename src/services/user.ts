import http from "../global/network";
import responseHandler from "../global/network/responseHandler";
// import formDataSerialize from "../global/network/formDataSerialize";

const baseURL = `${import.meta.env.VITE_PUBLIC_REST_API_ENDPOINT}user/`;

export async function login(email: string, password: string) {
  const url = `${baseURL}login`;
  try {
    const response = responseHandler(await http.post(url, { email, password }));
    return response;
  } catch (error) {
    return responseHandler(error);
  }
}

export async function getUserByToken() {
  const url = `${baseURL}getUserDataFromToken`;
  try {
    const response = responseHandler(await http.post(url));
    return response;
  } catch (error) {
    return responseHandler(error);
  }
}
