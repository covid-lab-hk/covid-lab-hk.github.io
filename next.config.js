const isProd = process.env.NODE_ENV === "production";

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? "/covid-lab-hk.github.io/" : "",
  reactStrictMode: true,
  distDir: "build",
};
