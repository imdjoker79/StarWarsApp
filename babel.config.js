module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@common': './src/common',
          '@contexts': './src/contexts',
          '@helpers': './src/helpers',
          '@interfaces': './src/interfaces',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
