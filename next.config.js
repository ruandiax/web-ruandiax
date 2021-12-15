const path = require("path");

const withSass = require("@zeit/next-sass");

module.exports = withSass({
  cssModules: true,
});

module.exports = {
  images: {
    domains: ["ruandiax.dev", "localhost"],
  },
  async rewrites() {
    return [{ source: "/api/thumbnail.png", destination: "/api/thumbnail" }];
  },
  target: "serverless",
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  i18n: {
    localeDetection: true,
    locales: ["en-US", "pt-BR"],
    defaultLocale: "en-US",
  },
};
