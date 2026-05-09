import { ArrowLeft } from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import ProductForm from "../../components/form";
import { useCreateProduct } from "../../service/product";

const Create: FC = () => {
  const { mutate, isPending } = useCreateProduct();

  return (
    <div className="max-w-250 mx-auto">
      <Link
        to="/admin/dashboard"
        className="text-my-blue flex items-center gap-2 mb-2"
      >
        <ArrowLeft />
        <span>Geri</span>
      </Link>

      <h1 className="text-2xl lg:text-3xl font-semibold mb-5">Ürün Ekle</h1>

      <ProductForm mutate={mutate} isPending={isPending} />
    </div>
  );
};

export default Create;
