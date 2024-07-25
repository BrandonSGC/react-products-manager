import axios from "axios";
import { DraftProductSchema } from "../types";

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
      //console.log(data);
    } else {
      throw new Error("Not valid data");
    }
    //console.log(result);
  } catch (error) {
    console.error(error);
  }
};
