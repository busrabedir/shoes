import * as yup from "yup";

export const LOGIN_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("e-posta alanı zorunludur"),
  password: yup.string().required("şifre alanı zorunludur"),
});

const nameRegex = /^[A-Za-zÇĞİÖŞÜçğıöşü]+(?: [A-Za-zÇĞİÖŞÜçğıöşü]+)*$/;

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

export const REGISTER_SCHEMA = yup.object().shape({
  firstName: yup
    .string()
    .required("isim alanı zorunludur")
    .matches(nameRegex, "geçersiz karakterler mevcut"),

  lastName: yup
    .string()
    .required("soyad alanı zorunludur")
    .matches(nameRegex, "geçersiz karakterler mevcut"),

  email: yup
    .string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("e-posta alanı zorunludur"),

  password: yup
    .string()
    .required("şifre alanı zorunludur")
    .min(6, "şifre 6 karakterden kısa olamaz")
    .matches(passwordRegex, "şifreniz yeterince güçlü değil"),

  passwordConfirm: yup
    .string()
    .required("şifrenin tekrarını giriniz")
    .oneOf([yup.ref("password")], "şifre tekrarını yanlış girdiniz"),

  terms: yup
    .boolean()
    .oneOf([true], "sözleşmeyi onaylamadan devam edemezsiniz"),
});
