import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, ProductValues, Response } from "../types";
import api from "./api";
import { toast } from "react-toastify";

const productService = {
  getAll: () => api.get<Response<Product[]>>("/shoes"),
  getOne: (id: string) => api.get<Response<Product>>(`/shoes/${id}`),
  create: (data: ProductValues) => api.post("/shoes", data),
  update: (id: string, data: ProductValues) => api.put(`/shoes/${id}`, data),
  delete: (id: string) => api.delete(`/shoes/${id}`),
};

export const useGetAllProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
    select: (res) => res.data.data,
  });

export const useGetOneProduct = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getOne(id),
    select: (res) => res.data.data,
    enabled: !!id,
  });

export const useCreateProduct = () => {
  // queryClient kurulum
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductValues) => productService.create(data),
    onSuccess: () => {
      // bildirim gönder
      toast.success("Ürün oluşturuldu");

      // arayüzün güncellenmesi için getAllProducts sorgusunu tekrar çalıştır
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("işlem başarısız"),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductValues }) =>
      productService.update(id, data),
    onSuccess: () => {
      toast.success("Ürün güncellendi");

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("işlem başarısız"),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      toast.success("Ürün kaldırıldı");

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("işlem başarısız"),
  });
};
