import { BASE_API, ORDER_STATUS } from "../utils/constants";

export async function getVatApi() {
  try {
    const url = `${BASE_API}/api/vat/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
