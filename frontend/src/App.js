import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import ToastifyAlert from "./components/ToastifyAlert";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const router = createBrowserRouter(routes());
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <ToastifyAlert />
    </ErrorBoundary>
  );
};

export default App;
