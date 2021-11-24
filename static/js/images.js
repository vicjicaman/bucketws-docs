setInterval(function() {
  var imgs = document.querySelectorAll("img[data-src]");

  for (const img of imgs) {
    const processed = img.getAttribute("processed");

    if (!processed) {
      img.setAttribute("processed", "true");

      img.onclick = e => {
        const fileid = e.target.src;

        if (
          window.innerWidth !== undefined &&
          window.innerHeight !== undefined
        ) {
          var w = window.innerWidth;
          var h = window.innerHeight;
        } else {
          var w = document.documentElement.clientWidth;
          var h = document.documentElement.clientHeight;
        }

        const instance = basicLightbox.create(`

        <div>
            <img style="width:${w *
              0.75}px;" data-src="${fileid}" processed="true" />
        </div>


    `);
        instance.show();

        document.body.addEventListener("keydown", e => {
          if (e.keyCode === 27) {
            instance.close();
          }
        });
      };
    }
  }
}, 200);
