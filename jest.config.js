module.exports = {
  verbose: true,
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/src/app/mocks/",
    // "<rootDir>/cypress/",
    // in case you wanna use cypress instead of protractor
  ],

  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/src/app/mocks/",
    // "<rootDir>/cypress/",
    // in case you wanna use cypress instead of protractor
  ],
  // transformIgnorePatterns: ["node_modules/(?!@ngrx|ngx-socket-io)"],
  // common used packages that throw errors
  // transform: { "^.+\\.(ts|js|html)$": "ts-jest" },
  collectCoverage: true,
  
  coverageReporters: ["json", "html"],

  // jest.config.js
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$|@datorama/akita)']

  // "test:ci": "jest --runInBand",
};
