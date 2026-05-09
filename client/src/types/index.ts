export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  terms: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

// API Yanıt Tipi
export interface Response<T> {
  message: string;
  data: T;
}

// ürün Tip
export interface Product {
  name: string;
  picture: string[];
  description: string;
  isNew: boolean;
  discount: number;
  size: string;
  color: string;
  gender: "women" | "men";
  price: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Formdan alınan ürün tipi
export interface ProductValues {
  name: string;
  price: number;
  discount: number;
  color: string;
  size: string;
  description: string;
  isNew: boolean;
  gender: "men" | "women" | "unisex";
}
