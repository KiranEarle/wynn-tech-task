import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

export const personalDetails: WynnRegistrationsApp.PageStates = {
  state: "personalDetails",
  stepNumber: "1",
};

export const otpSendCode: WynnRegistrationsApp.PageStates = {
  state: "otpSendCode",
  stepNumber: "2",
};

export const otpVerify: WynnRegistrationsApp.PageStates = {
  state: "otpVerify",
  stepNumber: "2",
};
