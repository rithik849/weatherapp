let tmp = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    //rootDir: "./src",
    moduleNameMapper: { 
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',
    '\\.(css|less)$': "identity-obj-proxy" 
  },
    moduleDirectories : ["node_modules","<rootDir>"]
    //resolver: undefined
  };

export default tmp