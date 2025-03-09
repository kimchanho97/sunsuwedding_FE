import { instance } from "./index";

export const savePayment = async (paymentData) => {
  return instance.post("/api/payment/save", paymentData);
};

export const paymentApprovalAndUserUpgrade = async (paymentData) => {
  return instance.post("/api/payment/approve", paymentData);
};
