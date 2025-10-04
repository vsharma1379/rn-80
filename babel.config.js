/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.json'],
        root: ['./src'],
      },
    ],
    ['module:react-native-dotenv'],
    'inline-dotenv',
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin', 
    'nativewind/babel'// need to be the last plugin
  ],
  presets: ['module:@react-native/babel-preset'],
};
