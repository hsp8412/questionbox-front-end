export interface user {
  username: string;
  email: string;
  _id: string;
  image: string;
}

export interface newUser {
  username: string;
  email: string;
  image?: File;
  password: string;
}
