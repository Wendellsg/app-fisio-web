/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["**"],
    port: "",
    pathname: "/**",
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
