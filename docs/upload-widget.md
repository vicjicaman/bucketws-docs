---
sidebar_label: "Upload widget"
sidebar_position: 7
---

# Upload widget

WE also provide you with a widget upload utility to help you upload files that take in consideration the bucket configuration.
Some of the features are:

- Automatically get the bucket configuration like allowed extension and sizes from your backend
- Multiple uploader UI configurations: **simple**, **drag-n-drop**, **multiple**
- Automatic handler for the signed form request, you only need to set the url.
- Immediate or manual trigger modes
- Useful event callbacks for the upload cycle

## Install

To use the upload widget you need to include the next file.
Use any of your domains to get the image library, for example: **xxxxxx.pws-trial-uc1.xyz**.

```html
<script src="https://xxxxxx.pws-trial-uc1.xyz/_PWSR_/lib/pkg/v2/pagews-upload/index.js"></script>
```

## Properties

Here is a description of all the methods and properties that are used on this example:

- **id**: An id for the HTML element
- **domain**: The domain associated with the target bucket (only used on the client side)
- **bucket**: The target bucket name (only used on the client side)
- **tags**: Tags to be assigned to the uploaded file (optional)
- **method**: The method to get the signed form to perform the file upload.
- **component**: This is the type of UI widget that will be displayed, you can select the type of component and configure its style with HTML classes, in this example we will use the simplest of the components _simple-selector_
- **immediate**: A flag to indicate if the upload will be trigger immediately after the file selection or if the upload will be trigger by a button or another method.

## Event Callbacks

- **onSelected**: This callback will be triggered everytime that you select a file, you can access from the params the **fileid** and the selected **file** object, the file id is the md5 hash content of the file.
- **onUploading**: This callback will be called when the file is being uploaded to the backend.
- **onUploaded**: Use this callback to execute code once the file upload is finished.
- **onReady**: There is a small delay between the finish of the file upload and the file availability on the CDN route, this callback will be executed on the file is available to be access over the CDN
- **onMinimapReady**: If the uploaded file generates a minimap (down-scaled images) then this callback will be called on the minimaps are ready to be accessed from the CDN
- **onError**: This callback will be executed if there is an issue with the upload operation, you can access details about the cause of the issue in the params of the callback

## Code example

This is a code example for a simple uploader configuration

```js
const uploadObj = window.uploader.create({
  id: "uploader-target",
  domain,
  bucket,
  tags: ["test-tag"],
  method: {
    type: "post",
    config: { url: "/app/signed-from-server" }
  },
  component: {
    type: "simple-selector",
    config: {
      preview: true,
      controlLoadingAreaClass: "text-center",
      controlLoadingAreaContent: `<img data-zoom="75" src="${loaderUrl}" />`,
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
  immediate: true,
  onSelected: ({ file, fileid }) => {},
  onUploading: ({ fileid }) => {},
  onUploaded: ({ fileid }) => {},
  onReady: ({ fileid }) => {},
  onMinimapReady: ({ fileid }) => {},
  onError: ({ fileid }) => {}
});
```
