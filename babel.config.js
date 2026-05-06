module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Se for usar Reanimated no futuro, o plugin dele deve ser o ÚLTIMO
      "react-native-reanimated/plugin", 
    ],
  };
};