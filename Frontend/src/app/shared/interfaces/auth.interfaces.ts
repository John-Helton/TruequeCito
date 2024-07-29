export interface interfaceLogin {
  email: string;
  password: string;
}

export interface interfaceRegister {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export class User {
  id!: string;
  username!: string;
  email!: string;
  password?: string;
  avatar?: string;
  token!: string;
  role!: string;
  exchanges?: number;
  reputation?: number;
  following?: string[];
  followers?: string[];
  likes?: number;
  products?: { title: string, images: string, _id: string }[]; // Agregar imagen y _id a los productos
  name?: string;
  location?: string;
}





export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username?: string;
    avatar?: string;
    password?: string;
    role: string;
    exchanges?: number;
    reputation?: number;
  };
}
