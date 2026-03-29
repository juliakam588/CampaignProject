import { apiClient } from "../lib/api-client";

export async function getAccountBalance() {
  const response = await apiClient.get("/account");
  return response.data.balance;
}
