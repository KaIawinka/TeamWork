import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
                {
                    path: "cart",
                    element: <Cart />
                },
						{
							path: "*",
							element: <NotFound />
						},
        ]
    }
])
 export default myRouter
