import axios, { AxiosError } from "axios";

interface QueryProps {
  path: string;
  data?: {};
  method: "GET" | "POST" | "PUT" | "DELETE";
}

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

async function queryFunction<T>({
  path,
  method,
  data,
}: QueryProps): Promise<T> {
  try {
    const response = await client<T>({
      url: path,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error("Data could not be fetched.");
  }
}

export default queryFunction;
