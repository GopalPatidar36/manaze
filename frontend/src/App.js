import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import ToastifyAlert from "./components/ToastifyAlert";

const App = () => {
  const router = createBrowserRouter(routes());
  return (
    <>
      <RouterProvider router={router} />
      <ToastifyAlert />
    </>
  );
};

export default App;
