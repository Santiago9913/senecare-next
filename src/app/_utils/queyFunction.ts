import axios from "axios";

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
    const response = await client({
      url: path,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    throw new Error("Data could not be fetched.");
  }
}

export default queryFunction;
