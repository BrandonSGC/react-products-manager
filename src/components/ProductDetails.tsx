import { FormEvent } from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services";

type ProductDetailsProps = {
  product: Product;
};

export const action = async ({ params }: ActionFunctionArgs) => {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { id, name, price, availability } = product;
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!confirm("Delete Product?")) {
      e.preventDefault();
    }
  };

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-center text-gray-800">{name}</td>
      <td className="p-3 text-lg text-center text-gray-800">
        {formatCurrency(price)}
      </td>
      <td className="p-3 text-lg text-center text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={id}
            className={`${
              availability ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {availability ? "Available" : "Unavailable"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-center text-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/products/${id}/edit`)}
            className="w-full p-2 text-sm font-bold text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Edit
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`products/${id}/delete`}
            onSubmit={handleSubmit}
          >
            <input
              type="submit"
              className="w-full p-2 text-sm font-bold text-center text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700"
              value="Delete"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};
