import { instance } from "./index";

export const savePayment = async () => {
  const response = await instance.post("/api/payment/save");
  return response.data;
};

export const paymentApprovalAndUserUpgrade = async (paymentData) => {
  return instance.post("/api/payment/approve", paymentData);
};
