import { message } from "antd";

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
export const beforeUpload = (file) => {
  var errMess = null;
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    errMess = "You can only upload JPG/PNG file!";
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    errMess = "Image must smaller than 2MB!";
  }
  if (errMess) {
    message.error(errMess);
  }
  return errMess;
};
