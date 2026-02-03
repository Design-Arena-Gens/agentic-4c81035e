import next from "eslint-config-next";

const config = [
  {
    ignores: ["node_modules", ".next", "data/submissions.json"],
  },
  ...next,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default config;
