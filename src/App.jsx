import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import { store } from "@/redux/store.jsx";

import { Provider } from "react-redux";
function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </>
  );
}

export default App;
