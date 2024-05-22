import axios from "axios";

export const upload = async (files, ref, refId, field) => {
  var formData = new FormData();
  formData.append("file", files);
  formData.append("ref", ref);
  formData.append("refId", refId);
  formData.append("field", field);
  const response = await axios({
    url: "/upload",
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
