/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["**"],
    port: "",
    pathname: "/**",
  },
};

module.exports = nextConfig;
