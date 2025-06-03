import axios from "axios";
import submitOTPCode from "../submitOTPCode";
import { BASE_URL, SUBMIT_OTP_CODE } from "@constance/serviceConfig";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("submitOTPCode", () => {
  const code = "1234";
  const endpoint = `${BASE_URL}${SUBMIT_OTP_CODE}`;

  it("sends a POST request with the correct code", async () => {
    const mockResponse = { data: { success: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await submitOTPCode(code);

    expect(mockedAxios.post).toHaveBeenCalledWith(endpoint, { code });
    expect(result).toEqual(mockResponse);
  });

  it("throws an error when the request fails", async () => {
    const error = new Error("Request failed");
    mockedAxios.post.mockRejectedValue(error);

    await expect(submitOTPCode(code)).rejects.toThrow("Request failed");
  });
});
