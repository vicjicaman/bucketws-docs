---
sidebar_position: 4
---

# Webhook

You can configure a URL to handle webhook calls from the BucketWS service to handle events that are generated from the service

## Configuration

Configure the URL target to get the webhook calls, you will get JSON post request with the bucket and file events.


## Events

- **bucket.file.uploaded**: The file has been uploaded and you can access it on the CDN
- **bucket.file.error**: There was an issue with the file processing

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
