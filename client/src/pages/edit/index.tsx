import { ArrowLeft } from "lucide-react";
import type { FC } from "react";
import { Link, useParams } from "react-router-dom";
import ProductForm from "../../components/form";
import { useGetOneProduct, useUpdateProduct } from "../../service/product";
import Loader from "../../components/loader";
import Error from "../../components/error";

const Edit: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mutate, isPending } = useUpdateProduct();
  const { isLoading, error, data, refetch } = useGetOneProduct(id!);

  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <div className="max-w-250 mx-auto">
      <Link
        to="/admin/dashboard"
        className="text-my-blue flex items-center gap-2 mb-2"
      >
        <ArrowLeft />
        <span>Geri</span>
      </Link>

      <h1 className="text-2xl lg:text-3xl font-semibold mb-5">
        Ürünü Güncelle
      </h1>

      <ProductForm mutate={mutate} isPending={isPending} data={data} />
    </div>
  );
};

export default Edit;
