// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "BucketWS",
  tagline: "API for images, zip & private files",
  url: "https://www.bucketws.com",
  baseUrl: "/docs/bucket/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  staticDirectories:["static"],
  favicon:
    "https://www.bucketws.com/documents/file/6240660aeb0cd5f51883a14219a5305a.ico",
  organizationName: "repoflow", // Usually your GitHub org/user name.
  projectName: "bucketws-docs", // Usually your repo name.
  scripts: [
    "/libs/basicLightbox/basicLightbox.min.js",
    "/package/images-lib/latest/index.js",
    "/docs/bucket/js/images.js",
  ],
  stylesheets: [
    "/libs/basicLightbox/basicLightbox.min.css",
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://www.bucketws.com",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "BucketWS",
        logo: {
          alt: "API for images, zip & private files",
          src: "https://www.bucketws.com/docs/bucket/img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial",
          },
          {
            type: "doc",
            docId: "api/intro",
            position: "left",
            label: "API",
          },
          {
            href: "https://www.bucketws.com",
            label: "Website",
            position: "left",
          },
          {
            href: "https://github.com/vicjicaman/bucketws-demo",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/vicjicama",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/vicjicaman/bucketws-demo",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BucketWS. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
