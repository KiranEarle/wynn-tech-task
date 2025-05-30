import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/app/components/$1",
    "^@public/(.*)$": "<rootDir>/public/$1",
  },

  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
