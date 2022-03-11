const isProd = process.env.NODE_ENV === "production";
//assetPrefix: isProd ? "https://cdn.statically.io/gh/covid-lab-hk/covid-lab-hk.github.io/gh-pages/" : "",
//distDir: "build",
module.exports = {
  // Use the CDN in production and localhost for development.
  reactStrictMode: true,
};
