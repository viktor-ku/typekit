module.exports = {
  globals: {
    "ts-jest": {
      "tsConfig": "tsconfig.json",
      "diagnostics": false,
    }
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/src/**/*.spec.ts",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
