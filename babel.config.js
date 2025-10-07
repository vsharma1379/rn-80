module.exports = function(api){
  
  api.cache(false); 
  return {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel',],
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
    ["module:react-native-dotenv",
      {
        envName: 'APP_ENV',
        moduleName: '@env',

      
       
      
    }],
    'inline-dotenv',
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin',
    // needs to be the last plugin
  ],
 }
};