---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bucket

## get

Get the details from a bucket, the bucket will be null if it does not exists

- **siteid**: This is your API Key
- **name**: Bucket name

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
query SiteBucketGet($siteid: String!, $name: String!) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            bucket(name: $name) {
              id
              name
              private
              exts
              minSize
              maxSize
              preview
              size

              policies {
                policyid
                config
              }

              metrics {
                name
                value
                typeid
                policy {
                  policyid
                  config
                }
              }
            }
          }
        }
      }
    }
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const {
  id,
  name,
  private,
  exts,
  minSize,
  maxSize,
  preview,
  size,
  policies,
  metrics
} = await instance.BucketFile.get({
  name: "test-public"
});
```

  </TabItem>
</Tabs>

## authorize

Get the authorization token for the bucket, this token will be used on the client side to request the authorization cookie

- **siteid**: This is your API Key
- **name**: Bucket name

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
query SiteBucketAuthorize($siteid: String!, $name: String!) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            bucket(name: $name) {
              authorize
            }
          }
        }
      }
    }
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const token = await instance.BucketFile.authorize({
  name: "test-public"
});
```

  </TabItem>
</Tabs>

## list

Get a list of buckets for the domain

- **siteid**: This is your API Key

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
query SiteBucketList($siteid: String!) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            list {
              id
              name
              private
              exts
              minSize
              maxSize
              preview
              size
            }
          }
        }
      }
    }
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const list = await instance.Bucket.list();
```

  </TabItem>
</Tabs>

## create

Create a bucket

- **siteid**: This is your API Key
- **name**: Bucket name
- **input**: An object SiteBucketCreateInput with the input details for the bucket

```graphql
input SiteBucketCreateInput {
  private: Boolean!
  exts: [String]!
  minSize: Int!
  maxSize: Int!
  preview: Boolean!
  size: Int!
}
```

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation SiteBucketCreate(
  $siteid: String!
  $name: String!
  $input: SiteBucketCreateInput!
) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            create(name: $name, input: $input) {
              id
              name
              private
              exts
              minSize
              maxSize
              preview
              size
              status

              policies {
                policyid
                config
              }

              metrics {
                name
                value
                typeid
                policy {
                  policyid
                  config
                }
              }
            }
          }
        }
      }
    }
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const {
  id,
  name,
  private: isPrivate,
  exts,
  minSize,
  maxSize,
  preview,
  size,
  status,
  policies,
  metrics
} = await instance.Bucket.create({
  name: `account-vicjicama`,
  private: false,
  exts: ["csv"],
  minSize: 100,
  maxSize: 1000000,
  preview: false,
  size: 25000000
});
```

  </TabItem>
</Tabs>

## update

Update a bucket

- **siteid**: This is your API Key
- **name**: Bucket name
- **input**: An object SiteBucketInput with the input details for the bucket

```graphql
input SiteBucketInput {
  exts: [String]!
  minSize: Int!
  maxSize: Int!
  preview: Boolean!
  size: Int!
}
```

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation SiteBucketUpdate(
  $siteid: String!
  $name: String!
  $input: SiteBucketInput!
) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            bucket(name: $name) {
              update(input: $input) {
                id
                name
                private
                exts
                minSize
                maxSize
                preview
                size
                status

                policies {
                  policyid
                  config
                }

                metrics {
                  name
                  value
                  typeid
                  policy {
                    policyid
                    config
                  }
                }

              }
            }
          }
        }
      }
    }
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const {
  id,
  name,
  private: isPrivate,
  exts,
  minSize,
  maxSize,
  preview,
  size,
  status, metrics, policies
} = await instance.Bucket.update({
  name: `account-vicjicama`,
  exts: ["csv", "json"],
  minSize: 300,
  maxSize: 5000000,
  preview: false,
  size: 25000000
});
```

  </TabItem>
</Tabs>

## destroy

Destroy a bucket

- **siteid**: This is your API Key
- **name**: Bucket name

:::danger Warning!
All the files associated with the bucket will be deleted without any way to rollback or recover them
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation SiteBucketDestroy($siteid: String!, $name: String!) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            bucket(name: $name) {
              destroy
            }
          }
        }
      }
    }
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const result = await instance.Bucket.destroy({
  name: `account-vicjicama`
});
```

  </TabItem>
</Tabs>
