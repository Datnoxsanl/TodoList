import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import { store } from "@/redux/store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store.jsx";
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
