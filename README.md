# houdini-tesla

![houdini tesla used on a button](https://user-images.githubusercontent.com/842246/102147058-0403b100-3e62-11eb-83a6-a69cf6db3bd2.png)


A CSS Houdini Worklet to paint Tesla coils.

## Getting started

### 1. Load the worklet

Using CDN is the easiest way to add the library:

```js
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('https://unpkg.com/houdini-tesla/dist/worklet.js');
}
```

#### You can use the polyfill

To add support for all moder browsers, you can load the worklet with [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) fallback.

```html
<script>
  ;(async function() {
    if (CSS['paintWorklet'] === undefined)
      await import('https://unpkg.com/css-paint-polyfill')

    CSS.paintWorklet.addModule('https://unpkg.com/houdini-tesla/dist/worklet.js');
  })()
</script>
```

### 2. Ready to use it in your CSS!

To use the **Tesla** worklet you need to define some custom properties with values and add the value `paint(tesla)` on the `background` property.

```css
.element {
  --tesla: 0; /* Entry point to animate coil and trigger repaint */
  --tesla-hue: 0;
  --tesla-saturation: 50;
  --tesla-lightness: 50;
  --tesla-blur: 10;
  --tesla-width: 10;
  --tesla-angle: 45;
  --tesla-segments: 2;
  background: paint(tesla-coil);
}
```

| Property | Description | Default |
| -------- | ----------- | ------------- |
| --tesla | **Hack**, use this property to animate coil. Animating the property triggers a repaint. | `0` |
| --tesla-hue | **Hue**, use this to define the hue of the coil | `0` |
| --tesla-saturation | **Saturation**, use this to define the saturation of the coil | `0` |
| --tesla-lightness | **Lightness**, use this to define the lightness of the coil | `0` |
| --tesla-blur | **Blur**, use this to define a stroke blur for the coil | `0` |
| --tesla-width | **Width**, use this to adjust the stroke width of the coil | `0` |
| --tesla-angle | **Angle**, use this to adjust the permitted angles in the coil | `0` |
| --tesla-segments | **Segments**, use this to adjust the number of segments in the coil | `0` |

## Development
Run it locally!

```
npm i
make develop
```

## License

MIT License

Copyright (c) 2020 jh3y
