import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/app/components/$1",
    "^@resources/(.*)$": "<rootDir>/src/app/resources/$1",
    "^@pages/(.*)$": "<rootDir>/src/app/page/$1",
    "^@public/(.*)$": "<rootDir>/public/$1",
    "^@app-type/(.*)$": "<rootDir>/src/app/types/$1",
  },

  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
