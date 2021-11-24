---
sidebar_label: "Getting started + NodeJS"
sidebar_position: 3
---

# Getting started with NodeJS

## Introduction

This is an example
You can find the repository here: https://github.com/vicjicaman/bucketws-demo

## Prerequisites

You need an account to get your API Keys and create your test buckets for this demo, here are the overall steps for the prerequisites:

- Create an account at https://bucket.listws.com/v2/auth/en-US/register
- Create a private bucket named test-private
- Create a public bucket named test-public
- Create an API secret on the API Keys section
- Get the localhost access key on the section Domain -> CORS

For a more detailed guide of the previous steps please go to the page **[prerequisites](/docs/prerequisites)**

## Installation

Clone the demo repository

```
git clone https://github.com/vicjicaman/bucketws-demo.git
```

Go to the cloned repository and install the packages

```
yarn install
```

## Setup

Create a file .env on the repository folder with the next content, replace the values with your bucket names and account domain and secrets.

```
    DOMAIN=xxxxxx.pws-trial-uc1.xyz
    BUCKET_PUBLIC=test-public
    BUCKET_PRIVATE=test-private
    API_KEY=kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk
    API_SECRET=ssssssss-ssss-ssss-ssss-sssssssssss
    LOCALHOST_ACCESS_KEY=aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa
```

## Start

Start the service, by default you will find the service running on http://localhost:3000

```
yarn start
```

You should see the demo dashboard like the one on the next picture.

<div className="image-container">
<img alt="Demo home page on localhost" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/dbb16880501d4fedb42f581dae77f9a8.png/xs.webp" />
</div>

## The API instance

You can call directly the GraphQL endpoints to interact with the service or you can use the package **@bucketws/api**, this package will let you create an API instance to make function calls to the API endpoints.

Add the package to your project with the next command:

```
yarn install @bucketws/api
```

The next snip show how to get the instance object, you will need the API URL, you API key and secret, we are going to use this instance object to make all the calls to the API on all the server routes.

```js
const { init } = require("@bucketws/api");

const release = process.env.RELEASE || "v2";
const instance = init({
  url: `https://api.pagews.com/${release}/bucket/api`,
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
```

## Server signed to public

We are going to check in detail the code components of the different demo sections, we are going to begin with the simplest case: Upload a file to a public bucket.
We need two components:

- A server side route to deliver us the signed form data to perform a direct upload to the backend
- The client side upload widget

### Upload route

To generate signed form data to upload a file you will need 3 things:

- **name**: The bucket name
- **fileid**: A file ID, this must be unique for all the files in your bucket, we recommend to use some kind of hash of the file content, the BucketWS upload widget use the md5 hash of the content by default.
- **tags**: An array of strings to help you manage your bucket files.

We will call the API instance method **BucketFile.upload**, this method will return the signed form data to perform the file upload to the backend, you should return this form data to your client.

```js
app.post("/app/signed-from-server/:mode", async function(req, res) {
  const { mode } = req.params;
  const { fileid, tags } = req.body;

  const { form } = await instance.BucketFile.upload({
    name: mode === "public" ? bucketPublic : bucketPrivate,
    fileid,
    tags
  });

  res.json({ form });
});
```

We have the **mode** parameter because we are going to use the same route to upload files to the other private test bucket, as you can see, we only need to change the target bucket name.

:::danger Real app hint!
In a real world application the signed form only will be delivered to a logged in user
:::

### Upload widget

The other component of the upload process is the client side, in this example we are going to use the our client widget upload utility.
Some of the features are:

- Automatically get the bucket configuration like allowed extension and sizes from your backend
- Multiple uploader UI configurations: **simple**, **drag-n-drop**, **multiple**
- Automatic handler for the signed form request, you only need to set the url.
- Immediate or manual trigger modes
- Useful callbacks for the upload cycle

Here is a description of all the methods and properties that are used on this example:

- **id**: An id for the HTML element
- **domain**: The domain associated with the target bucket (only used on the client side)
- **bucket**: The target bucket name (only used on the client side)
- **tags**: Tags to be assigned to the uploaded file (optional)
- **method**: The method to get the signed form to perform the file upload, in this example we use a post method and the url will be the route that we defined on the previous section _/app/signed-from-server/:mode_
- **component**: This is the type of UI widget that will be displayed, you can select the type of component and configure its style with HTML classes, in this example we will use the simplest of the components _simple-selector_
- **immediate**: A flag to indicate if the upload will be trigger immediately after the file selection or if the upload will be trigger by a button or another method.

And the callbacks for the upload cycle

- **onSelected**: This callback will be triggered everytime that you select a file, you can access from the params the **fileid** and the selected **file** object, the file id is the md5 hash content of the file.
- **onUploading**: This callback will be called when the file is being uploaded to the backend.
- **onUploaded**: Use this callback to execute code once the file upload is finished.
- **onReady**: There is a small delay between the finish of the file upload and the file availability on the CDN route, this callback will be executed on the file is available to be access over the CDN
- **onMinimapReady**: If the uploaded file generates a minimap (down-scaled images) then this callback will be called on the minimaps are ready to be accessed from the CDN
- **onError**: This callback will be executed if there is an issue with the upload operation, you can access details about the cause of the issue in the params of the callback

Here is the code snip as in the repository, the content of the callback methods on this example is just to let the user have a visual hint of the current state of the uploaded file

```js
var uploadObj = PageWSLib.Upload.create({
  id: "uploader-target",
  domain,
  bucket,
  tags: ["test", "tutorial"],
  method: {
    type: "post",
    config: { url: "/app/signed-from-server/<%=bucketMode%>" }
  },
  component: {
    type: "simple-selector",
    config: {
      preview: true,
      controlLoadingAreaClass: "text-center",
      controlLoadingAreaContent: `<img src="${loaderUrl}" />`,
      previewImageClass: "w-50 my-4",
      previewAreaClass: "text-center",
      controlAreaClass: "mb-4",
      controlContainerClass: "custom-file",
      controlClass: "custom-file-input",
      controlLabelClass: "custom-file-label",
      warningClass: "alert alert-warning",
      messageClass: "alert alert-info",
      errorClass: "alert alert-danger",
      labels: {
        select: "Choose file",
        browse: "Browse"
      }
    }
  },
  immediate,
  onSelected: ({ file, fileid }) => {
    const result = document.getElementById("uploader-result");
    result.innerHTML = ``;
  },
  onUploading: ({ fileid }) => {
    trigger.style.display = "none";
  },
  onUploaded: ({ fileid }) => {
    const result = document.getElementById("uploader-result");

    result.innerHTML = `
    <div class="row">
      <div class="col">
        <img src="${loaderUrl}" />
      </div>
    </div>`;
  },
  onReady: params => {
    if (!allowFetch) {
      const result = document.getElementById("uploader-result");
      result.innerHTML = ``;
      return;
    }

    const { isMinimap, isImage } = params;
    if (immediate === false) {
      trigger.style.display = "block";
    }

    if (!isMinimap) {
      if (isImage) {
        printImageResult(params);
      } else {
        printFileResult(params);
      }
    }
  },
  onMinimapReady: params => {
    if (!allowFetch) {
      return;
    }

    printMinimapResult(params);
  },
  onError: ({ fileid }) => {
    if (immediate === false) {
      trigger.style.display = "block";
    }
  }
});
```

:::danger Real app hint!
In a real world application you need to include the credentials or set the headers for the method/post request to authrize the signed form route, for more details see the **Uploader Widget** section.
:::

This demo use the **onMinimapReady** to display the images in different column sizes, so that you can see how the right image size is displayed depending on the image width

<div className="image-container">
<img alt="Upload file to public bucket" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/933d92928ed2793530461aaaf8eef90c.png/xs.webp" />
</div>

## Server signed to private

We use the same route and widget for a private bucket, the only thing that changes is the bucket name, we will use the private bucket **test-private**.
A mayor difference is that if you are not authorized to view the file you will not see the file preview after the upload is completed.
We are going to see the how to authorize a bucket

## Authorize private

To authorize a viewer to have access to the bucket file you need to perform two steps, one form the server side to get the authorization token, another to get the authorization cookie on the client side

### Server route

The server side of the authorization is very straight forward, all you need to do if to call the API method **Bucket.authorize** with the bucket name as a parameter.

```js
app.post("/app/authorize-private-from-server", async function(req, res) {
  const token = await instance.Bucket.authorize({
    name: bucketPrivate
  });
  res.json({ token });
});
```

:::danger Real app hint!
In a real world application you need to check that the logged in user have access to the bucket to be authorized.
:::

### Cookie authorization

On the client side, you need to call the previous route to get the token, once you have the token you need to call the function **PageWSLib.Image.login** for the bucket's domain, this function will create a cookie for the viewer user to authorize the view or download of the files.

```js
const response = await fetch(
  new Request(`/app/authorize-private-from-server`, {
    method: "POST",
    cors: true
  }),
  { mode: "cors" }
);

if (response.status === 200) {
  const responseJson = await response.json();
  const { token } = responseJson;
  await PageWSLib.Image.login(domain, token);
}
```

There are other two methods that are being used on the demo:

- **PageWSLib.Image.auth**: Use this method to get information about the current authorization.
- **PageWSLib.Image.logout**: Use this method to remove the authorization to the bucket.


<div className="image-container">
<img alt="Upload file to public bucket" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/82bd6d277cb9b51211de78dfaa839a89.png/xs.webp" />
</div>


## Video summary

Check this 2min video that shows the process of create the buckets on the UI and go through the demo functionalities. **[View video](https://www.youtube.com/watch?v=VuhX_2E9sUw)**

# Congratulations!

You now have a working app with the mayor features of **BucketWS**, thank you!
Anything **unclear** or **buggy** in this tutorial? [Please report it!](mailto:vic@repoflow.com)
