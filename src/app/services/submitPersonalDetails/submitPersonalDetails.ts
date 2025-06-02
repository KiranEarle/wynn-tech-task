import axios from "axios";

import { BASE_URL, REGISTER_PERSONAL_DETAILS } from "@constance/serviceConfig";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

const submitPersonalDetails = async (
  personalDetails: WynnRegistrationsApp.PersonalDetails
) => {
  const endpoint = `${BASE_URL}${REGISTER_PERSONAL_DETAILS}`;
  return axios.post(endpoint, personalDetails);
};

export default submitPersonalDetails;
