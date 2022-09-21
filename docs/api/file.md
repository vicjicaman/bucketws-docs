---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# File

## list

Get a list of files for a bucket

- **name**: Bucket name

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
query BucketFileList($name: String!) {
  viewer {
    account {
      buckets {
        get(name: $name) {
          files {
            list {
              id
              fileid
              ext
              size
              status
              uploader
              tags
              metadata
              createdAt
              updatedAt
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
const list = await instance.BucketFile.list("images-public");
```

  </TabItem>
</Tabs>

## upload

Upload a file to a bucket

- **name**: Bucket name
- **fileid**: Unique fileid within the bucket, this is usually the file content hash, this fileid MUST ends with the file extension
- **input**: An object BucketFileInput with the input details for the file

```graphql
input BucketFileInput {
  tags: [String]!
  metadata: JSON
}
```

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation BucketFileUpload(
  $name: String!
  $fileid: String!
  $input: BucketFileInput!
) {
  viewer {
    account {
          buckets {
            get(name: $name) {
              files {
                upload(fileid: $fileid, input: $input) {
                  form
                  file {
                    id
                    fileid
                    tags
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
  form,
  file: { id, fileid, tags, metadata }
} = await instance.BucketFile.upload(`customer-bucket`, {
  fileid: "dbb16880501d4fedb42f581dae77f9a8.png",
  input: { tags: ["backup"], metadata: { dhr: 1.0 } }
});
```

  </TabItem>
</Tabs>

## remove

Remove a file from a bucket

- **name**: Bucket name
- **fileid**: File ID

:::danger Warning!
The file and all the minimaps will be deleted without any way to rollback or recover them
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation BucketFileRemove(
  $name: String!
  $fileid: String!
) {
  viewer {
    account {
      buckets {
        get(name: $name) {
          files {
            remove(fileid: $fileid) {
              id
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
const result = await instance.BucketFile.remove(`images-bucket`, "dbb16880501d4fedb42f581dae77f9a8.png");
```

  </TabItem>
</Tabs>
