// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "BucketWS",
  tagline: "API for Public & Private files over a CDN",
  url: "https://bucket.listws.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "repoflow", // Usually your GitHub org/user name.
  projectName: "bucketws-docs", // Usually your repo name.
  scripts: [
    "https://bucket.listws.com/_PWSR_/lib/pkg/v2/pagews/index.js",
    "https://bucket.listws.com/_PWSR_/lib/basicLightbox/basicLightbox.min.js",
    "/js/images.js"
  ],
  stylesheets: [
    "https://bucket.listws.com/_PWSR_/lib/basicLightbox/basicLightbox.min.css"
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://bucket.listws.com"
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "BucketWS",
        logo: {
          alt: "API for Public & Private files over a CDN",
          src: "img/logo.png"
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial"
          },
          {
            type: "doc",
            docId: "api/intro",
            position: "left",
            label: "API"
          },
          {
            href: "https://bucket.listws.com",
            label: "Website",
            position: "left"
          },
          {
            href: "https://github.com/vicjicaman/bucketws-demo",
            label: "GitHub",
            position: "right"
          }
        ]
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro"
              }
            ]
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/vicjicama"
              }
            ]
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/vicjicaman/bucketws-demo"
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BucketWS. Built with Docusaurus.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
