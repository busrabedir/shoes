import { Formik, Form } from "formik";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { REGISTER_INITIAL_VALUES } from "../../constants";
import type { RegisterFormValues } from "../../types";
import FormField from "../../components/form/form-field";
import { REGISTER_SCHEMA } from "../../constants/schemas";
import { useRegister } from "../../service/auth";

const Register: FC = () => {
  const { isPending, mutate } = useRegister();

  // form gönderilince
  const handleSubmit = (values: RegisterFormValues) => {
    mutate(values);
  };
  return (
    <div className="min-h-screen w-full flex flex-col justify-center spacing">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <img src="/logo.svg" alt="logo" className="mx-auto h-10 w-auto" />

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Hesabınızı Oluşturun
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Formik
          initialValues={REGISTER_INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={REGISTER_SCHEMA}
        >
          <Form className="space-y-8">
            <FormField label="Adınız" name="firstName" />
            <FormField label="Soyadınız" name="lastName" />
            <FormField label="E-posta" name="email" />
            <FormField label="Şifre" name="password" />
            <FormField label="Şifre Tekrar" name="passwordConfirm" />
            <FormField
              label="Kullanıcı sözleşmesini okudum onaylıyorum "
              name="terms"
              type="checkbox"
            />

            <button disabled={isPending} type="submit" className="submit-btn">
              Kayıt Ol
            </button>
          </Form>
        </Formik>
      </div>

      <div className="mt-10 text-center text-sm/6 text-gray-500">
        Hesabınız var mı ?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Giriş Yap
        </Link>
      </div>
    </div>
  );
};

export default Register;
