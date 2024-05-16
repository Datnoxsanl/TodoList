import axios from "axios";
import { store } from "@/redux/store";
axios.defaults.baseURL = "https://backoffice.nodemy.vn/api";
axios.defaults.headers["Content-Type"] = "application/json";

axios.interceptors.request.use((config) => {
  var token = store.getState().auth.token;
  var currentToken =
    config.headers.Authorization && config.headers.Authorization.split(" ")[1];
  if (!currentToken) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
