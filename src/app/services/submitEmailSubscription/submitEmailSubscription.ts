import axios from "axios";

import { BASE_URL, SUBSCRIBE_NEWSLETTER } from "@constance/serviceConfig";

const submitEmailSubscription = async (email: string) => {
  const endpoint = `${BASE_URL}${SUBSCRIBE_NEWSLETTER}`;

  return axios.post(endpoint, { email });
};

export default submitEmailSubscription;
