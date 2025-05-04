module.exports = {
  displayName: "domain",
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
  },
  moduleFileExtensions: ["ts", "js", "html"],
  testPathIgnorePatterns: [
    "<rootDir>/dist/", // Excluye la carpeta dist
  ],
};
