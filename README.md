# svg-to-png

An HTML page to convert SVG files to PNG. The SVG is rendered in a canvas and exported to a PNG data URL. Click on the link (`Create PNG`) to create the image.

Notice that you can only render images from the same origin as the `index.html` file. The `<svg>` root element must have the `width` and the `height` attribute set:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    version="1.1"
    width="48"
    height="48">
<!-- SVG here. -->
</svg>
```
