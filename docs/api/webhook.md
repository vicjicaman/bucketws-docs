---
sidebar_position: 4
---

# Webhook

You can configure a URL to handle webhook calls from the BucketWS service to handle events that are generated from the service

## Configuration

Configure the URL target to get the webhook calls, you will get JSON post request with the bucket and file events.

<div className="image-container">
<img alt="Webhook configuration" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/e697cef0404343078210ab0f687fa243.png/xs.webp" />
</div>

## Events

- **bucket.file.uploaded**: The file has been uploaded and you can access it on the CDN
- **bucket.file.minimap**: The minimaps have been generated and are ready to be requested on the CDN

## Handler example in NodeJS

Here is an example of a handler route for the webhook calls

```js
app.post(`/:release/main/webhook`, async (req, res) => {
  const { event, payload } = req.body;

  if (event === "bucket.file.uploaded") {
    const { name: bucket, fileid, metadata } = payload;
    console.log("process file!");
  }

  res.sendStatus(200);
});
```
