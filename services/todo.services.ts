import { URL_API } from "@/contants/contants";
import { title } from "process";

export const createTodo = async (values: any) => {
  return await fetch(`${URL_API}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const getTodos = async (params: any) => {
  const res = await fetch(`${URL_API}/todo?${new URLSearchParams(params)}`, {
    method: "GET",
    cache: "no-store",
  });
  return res.json();
};

export const deleteTodo = async (id: string) => {
  return await fetch(`/api/todo/${id}`, {
    method: "DELETE",
  });
};

export const updateTodo = async (id: string, values: any) => {
  return await fetch(`/api/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

// export const updateTitle = async (id: string, title: string) => {
//   return await fetch(`/api/todo/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ title }),
//   });
// };

export const getTodo = async (id: string) => {
  return await fetch(`/api/todo/${id}`);
};
