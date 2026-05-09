import { useNavigate } from "react-router-dom";
import type {
  LoginFormValues,
  RegisterFormValues,
  Response,
  User,
} from "../types";
import api from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

// service nesnesi içerisinde:
// endpointler - gönderilen veri tipleri - gelen veri tipleri tanımlanıcak
export const authService = {
  register: (data: RegisterFormValues) =>
    api.post<Response<User>>("/auth/register", data),
  login: (data: LoginFormValues) => api.post("/auth/login", data),
  refresh: () => api.post<Response<string>>("/auth/refresh"),
  logout: () => api.post<Response<undefined>>("/auth/logout"),
  me: () => api.get<Response<User>>("/auth/me"),
};

// kayıt olma anında kullanıcağımız mutasyon
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterFormValues) => authService.register(data),
    onSuccess: () => {
      navigate("/");
      toast.success("Hesabınız oluşturuldu");
    },
    onError: (error: AxiosError<Response<string>>) => {
      toast.error(error.response?.data?.message || "Bir hata oluştu");
    },
  });
};

// giriş yapama anında kullanıcağımız mutasyon
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginFormValues) => authService.login(data),
    onSuccess: () => {
      navigate("/");
      toast.success("Oturum açıldı");
    },
    onError: (error: AxiosError<Response<string>>) => {
      toast.error(error.response?.data?.message || "Bir hata oluştu");
    },
  });
};

// profil bilgilerini almak için query
export const useProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.me(),
    select: (res) => res.data.data,
    retry: false,
  });

  return { user: data, isLoading, error };
};

// çıkış yapma olayı için mutasyon
export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.warning("Oturum kapatıldı");
      navigate("/login");
    },
    onError: () => {
      toast.error("Bir şeyler ters gitti");
    },
  });
};
