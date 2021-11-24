---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# File

## list

Get a list of files for a bucket

- **siteid**: This is your API Key
- **name**: Bucket name

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
query SiteBucketFileList($siteid: String!, $name: String!) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            bucket(name: $name) {
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
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const list = await instance.BucketFile.list({ name: "test-public" });
```

  </TabItem>
</Tabs>

## upload

Upload a file to a bucket

- **siteid**: This is your API Key
- **name**: Bucket name
- **fileid**: Unique fileid within the bucket, this is usually the file content hash, this fileid MUST ends with the file extension
- **input**: An object SiteBucketFileInput with the input details for the file

```graphql
input SiteBucketFileInput {
  tags: [String]!
  metadata: JSON
}
```

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation SiteBucketFileUpload(
  $siteid: String!
  $name: String!
  $fileid: String!
  $input: SiteBucketFileInput!
) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            bucket(name: $name) {
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
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const {
  form,
  file: { id, fileid, tags, metadata }
} = await instance.Bucket.upload({
  name: `account-vicjicama`,
  fileid: "dbb16880501d4fedb42f581dae77f9a8.png",
  input: { tags: ["backup"], metadata: { dhr: 1.0 } }
});
```

  </TabItem>
</Tabs>

## remove

Remove a file from a bucket

- **siteid**: This is your API Key
- **name**: Bucket name
- **fileid**: File ID

:::danger Warning!
The file and all the minimaps will be deleted without any way to rollback or recover them
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL" default>

```graphql
mutation SiteBucketFileRemove(
  $siteid: String!
  $name: String!
  $fileid: String!
) {
  viewer {
    account {
      sites {
        site(siteid: $siteid) {
          buckets {
            bucket(name: $name) {
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
  }
}
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

```js
const result = await instance.Bucket.remove({
  name: `account-vicjicama`,
  fileid: "dbb16880501d4fedb42f581dae77f9a8.png"
});
```

  </TabItem>
</Tabs>
