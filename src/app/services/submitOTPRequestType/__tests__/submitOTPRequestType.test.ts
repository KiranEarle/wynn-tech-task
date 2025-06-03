import axios from "axios";
import submitOTPRequestType from "../submitOTPRequestType";
import { BASE_URL, REQUEST_OTP } from "@constance/serviceConfig";
import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("submitOTPRequestType", () => {
  const type: WynnRegistrationsApp.OTSRequestTypes = "phone";
  const endpoint = `${BASE_URL}${REQUEST_OTP}`;

  it("sends a POST request with the correct type", async () => {
    const mockResponse = { data: { success: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await submitOTPRequestType(type);

    expect(mockedAxios.post).toHaveBeenCalledWith(endpoint, { type });
    expect(result).toEqual(mockResponse);
  });

  it("throws an error when the request fails", async () => {
    const error = new Error("Failed to send OTP request");
    mockedAxios.post.mockRejectedValue(error);

    await expect(submitOTPRequestType(type)).rejects.toThrow(
      "Failed to send OTP request"
    );
  });
});
