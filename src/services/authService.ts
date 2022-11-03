import http from "./httpService";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_URL_BASE;
const authApiEndpoint = apiUrl + "/auth";

export async function localLogin(email: string, password: string) {
  const res = await http.post(
    `${authApiEndpoint}/login`,
    { email, password },
    { withCredentials: true }
  );
  if (res.status === 200) {
    return res.data.user;
  } else {
    toast.error("Login failed.");
    return null;
  }
}

export async function getUserInfo() {
  console.log("getUser");
  const res = await http.get(`${authApiEndpoint}/login/success`, {
    withCredentials: true,
  });
  if (res.status === 200) {
    console.log(res);
    return res.data.user;
  } else {
    console.log(res);
    return null;
  }
}

export async function userLogout() {
  await http.post(`${authApiEndpoint}/logout`);
}
