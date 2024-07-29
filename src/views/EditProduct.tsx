import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { ErrorMessage, ProductForm } from "../components";
import { getProductById, updateProduct } from "../services";
import { Product } from "../types";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "All fields are necesary";
  }
  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      throw new Response("", { status: 404, statusText: "Not found" });
    }
    return product;
  }
  return {};
};

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export const EditProduct = () => {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Edit Product</h2>
        <Link
          to="/"
          className="p-3 text-sm font-bold text-white bg-indigo-600 rounded-md"
        >
          Back to Products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        
        <ProductForm product={product}/>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="block w-full p-3 mt-2 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
          value="Save Changes"
        />
      </Form>
    </>
  );
};
