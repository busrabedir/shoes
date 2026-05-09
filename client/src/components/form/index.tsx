import { Form, Formik } from "formik";
import type { FC } from "react";
import { INPUT_ARRAY } from "../../constants";
import FormField from "./form-field";
import type { Product, ProductValues } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  mutate: (data: any) => void;
  isPending: boolean;
  data?: Product;
}

const ProductForm: FC<Props> = ({ mutate, isPending, data }) => {
  const navigate = useNavigate();

  const initialValues: ProductValues = {
    name: data?.name || "",
    price: data?.price || 0,
    discount: data?.discount || 0,
    color: data?.color || "",
    size: data?.size || "",
    description: data?.description || "",
    isNew: data?.isNew || false,
    gender: data?.gender || "men",
  };

  const handleSubmit = (values: ProductValues) => {
    mutate(data ? { id: data.id, data: values } : values);
    navigate("/admin/dashboard");
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-5">
        {INPUT_ARRAY.map((input) => (
          <FormField {...input} />
        ))}

        <button
          disabled={isPending}
          type="submit"
          className="bg-my-blue py-1 px-4 rounded-md text-white hover:bg-my-blue/80"
        >
          Gönder
        </button>
      </Form>
    </Formik>
  );
};

export default ProductForm;
