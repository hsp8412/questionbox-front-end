import http from "./httpService";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_URL_BASE;
const authApiEndpoint = apiUrl + "/auth";

export async function localLogin(email: string, password: string) {
  let res;
  try {
    res = await http.post(
      `${authApiEndpoint}/login`,
      { email, password },
      { withCredentials: true }
    );
  } catch (e) {
    return null;
  }
  console.log(res.data);
  return res.data;
}

export async function getUserInfo() {
  const res = await http.get(`${authApiEndpoint}/login/success`, {
    withCredentials: true,
  });
  if (res.status === 200) {
    return res.data.user;
  } else {
    return null;
  }
}

export async function userLogout() {
  try {
    await http.delete(`${authApiEndpoint}/logout`, { withCredentials: true });
  } catch (e) {
    throw e;
  }
  window.location.href = "/";
}
