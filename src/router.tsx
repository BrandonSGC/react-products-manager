import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./layouts";
import { NewProduct, Products, action as newProductAction } from "./views";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    // Elements inside of children property are children 
    // from the element. In this case <Layout />
    children: [
      {
        element: <Products />,
        index: true, //this is for let react know that we want 
      },             // to render this element in the index ('/')
      {
        path: '/products/new',
        element: <NewProduct/>,
        action: newProductAction,
      }
    ]
  },
]);