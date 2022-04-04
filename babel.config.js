module.exports = function (api) {
  const presets = ["@babel/preset-env", "@babel/typescript"];
  api.cache.never();

  return { presets };
};