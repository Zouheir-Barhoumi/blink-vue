export default {
  transform: {
    "^.+\\.mjs$": "babel-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["mjs", "js", "json"],
  testMatch: ["**/__tests__/**/*.mjs"],

  // extensionsToTreatAsEsm: [".mjs"],
};
