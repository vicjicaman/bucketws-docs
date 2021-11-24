import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Easy to use",
    Svg: require("../../static/img/undraw_options_re_9vxh.svg").default,
    description: (
      <>
        Start using the service and API in less than 5 minutes, check out our
        Heroku integration
      </>
    )
  },
  {
    title: "Manage all your files and images",
    Svg: require("../../static/img/undraw_server_status_-5-pbv.svg").default,
    description: (
      <>
        All you need to do is to call our API or use the Dashboard to configure
        your buckets and rules.
      </>
    )
  },
  {
    title: "Private files",
    Svg: require("../../static/img/undraw_security_o890.svg").default,
    description: (
      <>
        Upload and deliver private files over a CDN, upload documents, documents
        for subscriptions and more!
      </>
    )
  }
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
