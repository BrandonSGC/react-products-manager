import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./layouts";
import { Products, loader as productsLoader,} from "./views/Products";
import { NewProduct, action as newProductAction } from "./views/NewProduct";
import { EditProduct, loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    // Elements inside of children property are children 
    // from the element. In this case <Layout />
    children: [
      {
        element: <Products />,
        index: true, // this is for let react know that we want
        loader: productsLoader,
      },             // to render this element in the index ('/')
      {
        path: '/products/new',
        element: <NewProduct/>,
        action: newProductAction,
      }, 
      {
        path: '/products/:id/edit',
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: '/products/:id/delete',
        action: deleteProductAction,
      },
    ]
  },
]);