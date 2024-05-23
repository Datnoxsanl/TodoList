import axios from "axios";
import { upload } from "@/services/upload";

export const getTasks = async (page, pageSize, signal) => {
  const response = await axios.get(
    `/tasks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    { signal }
  );
  return response.data;
};

export const createTask = async (title) => {
  const response = await axios.post(`/tasks`, {
    data: {
      title: title,
    },
  });
  return response.data;
};

export const updateTask = async (id, title) => {
  const response = await axios.put(`/tasks/${id}`, {
    data: {
      title: title.title,
    },
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data;
};

export const addImgTask = async (file, idTask) => {
  const response = await upload(file, "api::task.task", idTask, "image");
  return response.data;
};
