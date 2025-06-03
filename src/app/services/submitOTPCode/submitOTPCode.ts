import axios from "axios";

import { BASE_URL, SUBMIT_OTP_CODE } from "@constance/serviceConfig";

const submitOTPCode = async (code: string) => {
  const endpoint = `${BASE_URL}${SUBMIT_OTP_CODE}`;

  return axios.post(endpoint, { code });
};

export default submitOTPCode;
