---
sidebar_position: 1
---

# Introduction

This is the API to handle bucket, files and authorizations, this is a GraphQL API.
You can call the GraphQL endpoints in any language or tool that can send a post request.
In this documentation you will find the GraphQL queries to perform a post request or the NodeJS call to the API helper

## API endpoint

The GraphQL endpoint is: https://DOMAIN/api/bucket

## NodeJS - @bucketws/api

If you are using NodeJS you can use the **@bucketws/api** to setup an API helper and call the endpoints easily.
Here is how to setup the api helper:

Install the api package

```
yarn install @bucketws/api
```

Initialize a helper instance

```js
const { init } = require("@bucketws/api");
const instance = init({
  url: `https://${process.env.DOMAIN}/api/bucket`,
  secret: process.env.API_KEY
});
```

Make a call to the endpoints, you can find the call examples on the **NodeJS** tab

```js
const { form } = await instance.BucketFile.upload(name: "public-test", {
  fileid,
  description:"",
  tags: ["draft"]
});
```

## NodeJS - Request using axios

This is an example of a post call to get a Bucket details

```js
const axios = require("axios");

export default async ({ secret }) => {
  const authorization = `${secret}`;// Your API key
  const url = `https://DOMAIN/api/bucket`;

  const query = `query BucketGet($name: String!) {
    viewer {
      account {
          buckets {
            get(name: $name) {
              id
              name
              private
              exts
              minSize
              maxSize
              preview
          }
        }
      }
    }
  }`;

  const variables = { name: "test-public" };

  try {
    const response = await axios(url, {
      method: "post",
      headers: {
        Authorization: authorization,
        "Content-type": "application/json",
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      },
      data: JSON.stringify({
        query,
        variables
      })
    });

    if (response.status === 200) {
      const res = response.data;

      if (res.errors) {
        console.error("bucket.api.errors", {
          errors: res.errors
        });
        throw new Error("bucket.response.errors:" + JSON.stringify(res.errors));
      }

      return res.data;
    } else {
      console.error("bucket.api.token.error", {
        status: response.status,
        error: response.statusText
      });

      throw new Error(
        "bucket.response.issue:" + response.status + ":" + response.statusText
      );
    }
  } catch (e) {
    const error = e.toString();
    console.error(
      "bucket.api.request.error:" +
        JSON.stringify({
          error,
          url,
          authorization
        })
    );
    throw e;
  }
};
```
