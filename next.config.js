const isProd = process.env.NODE_ENV === "production";
//assetPrefix: isProd ? "https://cdn.statically.io/gh/covid-lab-hk/covid-lab-hk.github.io/gh-pages/" : "",
//distDir: "build",
//reactStrictMode: true,
// basePath: process.env.NEXT_PUBLIC_BASE_PATH,
//   assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
module.exports = {
  images: {
    loader: "akamai",
    path: "",
  },
  // Use the CDN in production and localhost for development.
  basePath: "/",
  assetPrefix: "/",
};
