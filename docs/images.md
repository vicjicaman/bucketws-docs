---
sidebar_label: "Optimized images"
sidebar_position: 6
---

# Optimized images

If you upload a png, webp or jpg file the service generated a set of down-scaled images that you can use depending on the target viewport, this smaller size image is a **minimap**

## Install

You can include on your site the next script to automatically detect and change the right image based on the image or background width.
Use any of your domains to get the image library, for example: **xxxxxx.pws-trial-uc1.xyz**.

```html
<script src="https://xxxxxx.pws-trial-uc1.xyz/_PWSR_/lib/pkg/v2/pagews-image/index.js"></script>
```

## Usage

Now use the minimap URL on the **data-src** attribute as in this example:

```html
<img
  data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/photos/9aca4aa83e79507630361b8fad6a7561.jpg/xs.webp"
/>
```

Thats all, we will take care of request and download the right image size.


## Example

You can resize your screen or check the image on any device, the image will be automatically changed to get the optimal image size.

<div className="image-container">
<img alt="Demo home page on localhost" className="image" data-src="https://util-files.listws.com/_PWSR_/files/minimaps/buckets/photos/9aca4aa83e79507630361b8fad6a7561.jpg/xs.webp" />
</div>
