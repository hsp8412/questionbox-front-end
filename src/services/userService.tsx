import { newUser } from "../interfaces/userInterface";
import http from "./httpService";
import { toast } from "react-toastify";

export async function createNewUser({
  image,
  username,
  password,
  email,
}: newUser) {
  const userApiEndpoint = `${process.env.REACT_APP_URL_BASE}/user`;
  let avatarUrl: string = "";
  if (image) {
    let imageUploadUrl = `${process.env.REACT_APP_IMAGE_UPLOAD_URL}`;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "question_box");
    let res;
    try {
      res = await http.post(imageUploadUrl, formData);
      avatarUrl = res.data.secure_url;
    } catch (e) {
      toast.error("Failed to upload the avatar.");
    }
  }
  if (avatarUrl !== "") {
    const res = await http
      .post(userApiEndpoint, {
        username,
        password,
        email,
        image: avatarUrl,
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          throw error;
        }
      });
  } else {
    const res = await http
      .post(userApiEndpoint, {
        username,
        password,
        email,
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          throw error;
        }
      });
  }
  return true;
}
