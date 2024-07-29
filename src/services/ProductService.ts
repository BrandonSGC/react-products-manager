import axios from "axios";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export const addProduct = async (data: ProductData) => {
  try {
    const result = DraftProductSchema.safeParse({
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      const { data } = await axios.post(url, {
        name: result.data.name,
        price: result.data.price,
      });
    } else {
      throw new Error("Not valid data");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    const result = ProductsSchema.safeParse(data.products);

    if (result.success) {
      return result.data;
    } else {
      throw new Error("There has benn an error...");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);

    const result = ProductSchema.safeParse(data.product);

    if (result.success) {
      return result.data;
    } else {
      throw new Error("There has been an error");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (data: ProductData, id: Product["id"]) => {
  try {
    const result = ProductSchema.safeParse({
      id,
      name: data.name,
      price: +data.price,
      availability: toBoolean(data.availability.toString()),
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

      const { data } = await axios.put(url, {
        ...result.data,
      });
    } else {
      throw new Error("An error has ocurred...");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProductAvailability = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.patch(url);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.delete(url);
  } catch (error) {
    console.error(error);
  }
};
