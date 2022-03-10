module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': './src/assets',
          '@common': './src/common',
          '@helpers': './src/helpers',
          '@interfaces': './src/interfaces',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@redux': './src/redux',
        },
      },
    ],
  ],
};
