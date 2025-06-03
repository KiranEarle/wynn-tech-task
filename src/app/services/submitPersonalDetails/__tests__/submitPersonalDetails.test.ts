import axios from "axios";
import submitPersonalDetails from "../submitPersonalDetails";
import { BASE_URL, REGISTER_PERSONAL_DETAILS } from "@constance/serviceConfig";
import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("submitPersonalDetails", () => {
  const endpoint = `${BASE_URL}${REGISTER_PERSONAL_DETAILS}`;

  const personalDetails: WynnRegistrationsApp.PersonalDetails = {
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    residency: "USA",
  };

  it("posts personal details to the correct endpoint", async () => {
    const mockResponse = { data: { success: true } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await submitPersonalDetails(personalDetails);

    expect(mockedAxios.post).toHaveBeenCalledWith(endpoint, personalDetails);
    expect(result).toEqual(mockResponse);
  });

  it("throws an error if the request fails", async () => {
    const error = new Error("Network error");
    mockedAxios.post.mockRejectedValue(error);

    await expect(submitPersonalDetails(personalDetails)).rejects.toThrow(
      "Network error"
    );
  });
});
