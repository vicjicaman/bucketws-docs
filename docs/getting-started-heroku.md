---
sidebar_label: "Getting started + Heroku"
sidebar_position: 4
---

# Getting started with Heroku

This is a guide and example for the Heroku BucketWS Addon, you can have the working example in less than 5 minutes.
You can find the repository here: https://github.com/vicjicaman/bucketws-heroku-upload
We don't need any prerequisites for the Heroku deployment, Heroku and the addon will take care of all the account and env setup for us.

## Deploy

To deploy the demo app click on the next button:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/vicjicaman/bucketws-heroku-upload)

Select a name for you app and click the button **Deploy app**

<div className="image-container">
<img alt="Demo home page on localhost" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/6dbcb862e7c3310fc03e8b6febd2f998.png/xs.webp" />
</div>

Once the app is deployed click on the button **Manage App**

## Creating the addon

The name of the addon is **bucketws-v2**, run the next command on on your console to install the addon.
You need to be logged in on the console.
Make sure that you replace the app name **bucketws-demo** on the next command

```
heroku addons:create bucketws-v2 --app bucketws-demo
```

## Heroku app dashboard

Wait a comple seconds and refresh your *App dashboard*, you should see the BucketWS addon listed as in the next image:

<div className="image-container">
<img alt="Heroku app dashboard" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/d75a7def8333ace3f7320e31ad6488a0.png/xs.webp" />
</div>

Click on the listed add on **BucketWS Public & Private CDN files API**, you will be redirected to your *Addon dashboard*.

## Bucket dashboard

We will create a new public bucket from the dashboard, you can create a Bucket from the API as well, but we are going to use the dashboard as an exercise.

<div className="image-container">
<img alt="Create public bucket" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/2d992c357fcad4e15ea3d3cf1b22991a.png/xs.webp" />
</div>

Go to the _Buckets_ sections and create a bucket named **test-public**

<div className="image-container">
<img alt="Addon control panel" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/64e1309f88fd52dcdf7c23a0fd532daf.png/xs.webp" />
</div>

Go back to the *App dashboard* and click on the **Open app** button, you will be redirected to the live application.

## Live app

This is the simplest of the upload examples, just a upload widget to upload a single file, go to the bottom of the app page and upload a file or image.

<div className="image-container">
<img alt="Addon control panel" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/49f1adfc62cf1f5647b660226a95a752.png/xs.webp" />
</div>

After the upload is completed you should see the uploaded image rendered multiple times in different sizes to show the automatic down-scale functionalities

<div className="image-container">
<img alt="Addon control panel" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/85813cbca4b8f5ce45bec0861b7b4627.png/xs.webp" />
</div>

## File listing

Now return to the bucket dashboard and go to the **test-public** bucket.
You can see the bucket's files and its details.
 - The file owner
 - File sizes
 - Minimap links
 - File tags

<div className="image-container">
<img alt="Addon control panel" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/bucketws-docs/e5763771129a278f87f8dc1f9bd6e127.png/xs.webp" />
</div>

## Demo code

Now lets take a look to the relevant parts of the code in the example.
We need two components:

- A server side route to deliver us the signed form data to perform a direct upload to the backend
- The client side upload widget

### The API instance

You can call directly the GraphQL endpoints to interact with the service or you can use the package **@bucketws/api**, this package will let you create an API instance to make function calls to the API endpoints.

Add the package to your project with the next command:

```
yarn install @bucketws/api
```

The next snip show how to get the instance object. The BUCKETWS_V2_XXX env variables are automatically setup by the addon and Heroku.

```js
const { init } = require("@bucketws/api");

const instance = BucketWS.init({
  url: process.env.BUCKETWS_V2_API_URL,
  key: process.env.BUCKETWS_V2_API_KEY,
  secret: process.env.BUCKETWS_V2_API_SECRET
});
```

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


## Video

Check this 2min video that shows the process of deploy this repository,create the addon and upload a file.
[view video](https://www.youtube.com/watch?v=ZYTkzALbzok)


# Congratulations!

You have just deployed a Heroku App with the **BucketWS Addon**, thank you!
Anything **unclear** or **buggy** in this tutorial? [Please report it!](mailto:vic@repoflow.com)
