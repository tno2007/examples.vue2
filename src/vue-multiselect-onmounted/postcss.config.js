const IN_PRODUCTION = process.env.NODE_ENV === "production";

/* eslint-env node */
module.exports = {
  plugins: [
    require("autoprefixer"),
    IN_PRODUCTION &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./**/*.html", "./src/**/*.vue"],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(
            /<style[^]+?<\/style>/gi,
            ""
          );
          return (
            contentWithoutStyleBlocks.match(
              /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
            ) || []
          );
        },
        whitelist: [],
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
        ],
      }),
  ],
};
