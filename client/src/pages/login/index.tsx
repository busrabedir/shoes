import { Formik, Form } from "formik";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { LOGIN_INITIAL_VALUES } from "../../constants";
import type { LoginFormValues } from "../../types";
import FormField from "../../components/form/form-field";
import { LOGIN_SCHEMA } from "../../constants/schemas";
import { useLogin } from "../../service/auth";

const Login: FC = () => {
  const { isPending, mutate } = useLogin();

  // form gönderilince
  const handleSubmit = (values: LoginFormValues) => {
    mutate(values);
  };
  return (
    <div className="min-h-screen w-full flex flex-col justify-center spacing">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <img src="/logo.svg" alt="logo" className="mx-auto h-10 w-auto" />

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Oturumunuzu Açın
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Formik
          initialValues={LOGIN_INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={LOGIN_SCHEMA}
        >
          <Form className="space-y-8">
            <FormField label="Email" name="email" />
            <FormField label="Şifre" name="password" type="password" />

            <button disabled={isPending} type="submit" className="submit-btn">
              Giriş Yap
            </button>
          </Form>
        </Formik>
      </div>

      <div className="mt-10 text-center text-sm/6 text-gray-500">
        Hesabınız yok mu ?{" "}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Kayıt Olun
        </Link>
      </div>
    </div>
  );
};

export default Login;
