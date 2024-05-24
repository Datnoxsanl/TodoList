import axios from "axios";
import { upload } from "@/services/upload";

export const getCompleteTasks = async (page, pageSize, signal) => {
  const response = await axios.get(
    `/tasks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc&filters[complete]=complete`,
    { signal }
  );
  return response.data;
};

export const getUnCompleteTasks = async (page, pageSize, signal) => {
  const response = await axios.get(
    `/tasks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc&filters[complete]=false`,
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

export const updateTask = async (id, newTask) => {
  const response = await axios.put(`/tasks/${id}`, {
    data: {
      title: newTask.title,
      date: newTask.date,
      complete: newTask.complete,
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

export const searchTask = async (txt) => {
  const response = await axios.get(
    `/tasks?populate=*&pagination[page]=1&pagination[pageSize]=5&filters[title][$contains]=${txt}`
  );
  return response.data;
};
