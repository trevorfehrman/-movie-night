/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'image.tmdb.org',
      'm.media-amazon.com',
    ],
  },
};

module.exports = nextConfig;
