---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bucket

## get

Get the details from a bucket, the bucket will be null if it does not exists

- **name**: Bucket name

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
query BucketGet($name: String!) {
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
  preview
} = await instance.BucketFile.get({
  name: "test-public"
});
```

  </TabItem>
</Tabs>

## authorize

Get the authorization token for the bucket, this token will be used on the client side to request the authorization cookie


- **name**: Bucket name

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
query BucketAuthorize($name: String!) {
  viewer {
    account {
      buckets {
        get(name: $name) {
          authorize
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



<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
query BucketList {
  viewer {
    account {
      buckets {
        list {
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


- **name**: Bucket name
- **input**: An object BucketCreateInput with the input details for the bucket

```graphql
input BucketCreateInput {
  private: Boolean!
  exts: [String]!
  minSize: Int!
  maxSize: Int!
  preview: Boolean!
}
```

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation BucketCreate(
  $name: String!
  $input: BucketCreateInput!
) {
  viewer {
    account {
      buckets {
        create(name: $name, input: $input) {
          id
          name
          private
          exts
          minSize
          maxSize
          preview
          status
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
  status
} = await instance.Bucket.create({
  name: `images-bucket`,
  private: false,
  exts: ["csv"],
  minSize: 100,
  maxSize: 1000000,
  preview: false
});
```

  </TabItem>
</Tabs>

## update

Update a bucket


- **name**: Bucket name
- **input**: An object BucketInput with the input details for the bucket

```graphql
input BucketInput {
  exts: [String]!
  minSize: Int!
  maxSize: Int!
  preview: Boolean!
}
```

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation BucketUpdate(
  $name: String!
  $input: BucketInput!
) {
  viewer {
    account {
      buckets {
        get(name: $name) {
          update(input: $input) {
            id
            name
            private
            exts
            minSize
            maxSize
            preview
            status
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
  status
} = await instance.Bucket.update({
  name: `account-vicjicama`,
  exts: ["csv", "json"],
  minSize: 300,
  maxSize: 5000000,
  preview: false
});
```

  </TabItem>
</Tabs>

## destroy

Destroy a bucket


- **name**: Bucket name

:::danger Warning!
All the files associated with the bucket will be deleted without any way to rollback or recover them
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation BucketDestroy($name: String!) {
  viewer {
    account {
      buckets {
        get(name: $name) {
          destroy
        }
      }
    }
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const result = await instance.Bucket.destroy(`images-bucket`);
```

  </TabItem>
</Tabs>
