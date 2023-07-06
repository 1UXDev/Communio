/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "static.thenounproject.com",
      "images.unsplash.com",
      "http://source.unsplash.com/",
      "media.istockphoto.com",
    ],
  },
};

module.exports = nextConfig;
