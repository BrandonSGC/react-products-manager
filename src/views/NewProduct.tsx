import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { ErrorMessage, ProductForm } from "../components";
import { addProduct } from "../services";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "All fields are necesary";
  }
  if (error.length) {
    return error;
  }

  await addProduct(data);

  return redirect("/");
};

export const NewProduct = () => {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Register Product</h2>
        <Link
          to="/"
          className="p-3 text-sm font-bold text-white bg-indigo-600 rounded-md"
        >
          Back to Products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm />

        <input
          type="submit"
          className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
          value="Register Product"
        />
      </Form>
    </>
  );
};
