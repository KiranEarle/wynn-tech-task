import setViewToTop from "../setViewToTop";

describe("setViewToTop", () => {
  it("calls window.scrollTo with 0, 0", () => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    setViewToTop();

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });
});
