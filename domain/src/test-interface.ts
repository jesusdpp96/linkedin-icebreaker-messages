export interface DomainTestInterface {
  // Test function to be implemented in the domain
  testFunction: () => string;
  // Test function with a parameter
  testFunctionWithParam: (param: string) => string;
  // Test function with a number parameter
  testFunctionWithNumberParam: (param: number) => string;
  // Test function with a boolean parameter
  testFunctionWithBooleanParam: (param: boolean) => string;
  // Test function with a callback
  testFunctionWithCallback: (callback: () => string) => string;
  // Test function with a promise
  testFunctionWithPromise: () => Promise<string>;
}
