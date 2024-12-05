import { useState } from "react";
import { getVatApi } from "../api/vat";

export const useVat = () => {
  const [error, setError] = useState(false);
  const [vat, setVat] = useState(null);

  const getVat = async () => {
    try {
      const response = await getVatApi();
      setVat(response[0]);
    } catch (error) {
      setError(error);
    }
  };

  return {
    error,
    vat,
    getVat,
  };
};
