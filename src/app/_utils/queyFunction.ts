import axios from "axios";

interface QueryProps {
  path: string;
  data?: {};
  method: "GET" | "POST" | "PUT" | "DELETE";
}

const client = axios.create({
  baseURL: "http://localhost:3001",
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
