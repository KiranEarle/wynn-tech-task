import axios from "axios";

import { BASE_URL, REQUEST_OTP } from "@constance/serviceConfig";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

const submitOTPRequestType = async (
  type: WynnRegistrationsApp.OTSRequestTypes
) => {
  const endpoint = `${BASE_URL}${REQUEST_OTP}`;

  return axios.post(endpoint, { type });
};

export default submitOTPRequestType;
