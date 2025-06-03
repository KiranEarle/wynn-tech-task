import axios from "axios";
import submitEmailSubscription from "../submitEmailSubscription";
import { BASE_URL, SUBSCRIBE_NEWSLETTER } from "@constance/serviceConfig";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("submitEmailSubscription", () => {
  const email = "test@example.com";
  const endpoint = `${BASE_URL}${SUBSCRIBE_NEWSLETTER}`;

  it("sends a POST request with the correct email", async () => {
    const responseData = { data: { success: true } };
    mockedAxios.post.mockResolvedValue(responseData);

    const result = await submitEmailSubscription(email);

    expect(mockedAxios.post).toHaveBeenCalledWith(endpoint, { email });
    expect(result).toEqual(responseData);
  });

  it("throws an error when the request fails", async () => {
    const error = new Error("Network error");
    mockedAxios.post.mockRejectedValue(error);

    await expect(submitEmailSubscription(email)).rejects.toThrow(
      "Network error"
    );
  });
});
