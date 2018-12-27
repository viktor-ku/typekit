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
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/internal/$1"
  },
  testEnvironment: "node",
  testMatch: [
    "**/src/**/*.spec.ts",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
