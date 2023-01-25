import http from "../global/network";
import responseHandler from "../global/network/responseHandler";
import { AxiosProgressEvent, AxiosRequestConfig } from "axios";
// import formDataSerialize from "../global/network/formDataSerialize";

const baseURL = `${import.meta.env.VITE_PUBLIC_REST_API_ENDPOINT}user/`;

interface loginScehema {
  email: string;
  password: string;
}

const config = {
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
    const { loaded, bytes, rate, total } = progressEvent;
    if (total) {
      const percent = Math.floor((loaded * 100) / total);
      console.log(percent);
    }
  },
};

export async function login({ email, password }: loginScehema) {
  const url = `${baseURL}login`;
  try {
    const response = responseHandler(
      await http.post(url, { email: "naifmed", password: "nmc@2018" })
    );
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

export async function getClaims() {
  const url = `${baseURL}login`;
  const params = {
    sortType: 0,
    sortOrder: 0,
    statusArray: [],
    screenType: [],
    searchingText: "",
    responseFormat: [],
    limit: 0,
    skip: 0,
    id: 0,
  };
  try {
    const response = responseHandler(
      await http.post(
        "https://api2.ai-projects.in/api/DashBoard/GetDashBoardDataDetails",
        params,
        config
      )
    );
    return response;
  } catch (error) {
    return responseHandler(error);
  }
}
