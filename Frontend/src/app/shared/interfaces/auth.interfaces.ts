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

export interface Address {  // Definir la interfaz Address
  provincia: string;
  ciudad: string;
  canton: string;
  parroquia: string;
  callePrincipal: string;
  numeracion: string;
  calleSecundaria: string;
  tipo: string;
  referencia: string;
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
  products?: { title: string, images: string, _id: string }[];
  name?: string;
  location?: string;
  address?: Address;  // Usar la interfaz Address para la dirección
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
    address?: Address;  // Usar la interfaz Address para la dirección
  };
}
