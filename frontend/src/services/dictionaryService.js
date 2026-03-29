import { apiClient } from "../lib/api-client";

export async function getKeywordOptions() {
  const response = await apiClient.get("/lookups/keywords");
  return response.data;
}

export async function getTownOptions() {
  const response = await apiClient.get("/lookups/towns");
  return response.data;
}
