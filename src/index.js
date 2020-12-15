import { GUI } from 'https://cdn.skypack.dev/dat.gui'
;(async function () {
  CSS.registerProperty({
    name: '--noise',
    syntax: '<number>',
    inherits: false,
    initialValue: 0,
  })

  CSS.registerProperty({
    name: '--noise-cell-size',
    syntax: '<number>',
    inherits: false,
    initialValue: 2,
  })

  CSS.paintWorklet.addModule(`https://unpkg.com/houdini-tesla`)

  const CONFIG = {
    WIDTH: 5,
    BLUR: 10,
    HUE: 180,
    SATURATION: 100,
    LIGHTNESS: 50,
    SEGMENTS: 8,
    ANGLE: 45,
  }

  const TESLA = document.querySelector('.tesla')
  document.documentElement.style.setProperty('--h', TESLA.offsetHeight - 0.1 + 'px')

  const UPDATE = () => {
    TESLA.style.setProperty('--tesla-width', CONFIG.WIDTH)
    TESLA.style.setProperty('--tesla-blur', CONFIG.BLUR)
    TESLA.style.setProperty('--tesla-segments', CONFIG.SEGMENTS)
    TESLA.style.setProperty('--tesla-angle', CONFIG.ANGLE)
    TESLA.style.setProperty(
      '--tesla-hue',CONFIG.HUE
    )
    TESLA.style.setProperty(
      '--tesla-saturation',
      CONFIG.SATURATION
    )
    TESLA.style.setProperty(
      '--tesla-lightness',
      CONFIG.LIGHTNESS
    )
  }

  const CONTROLLER = new GUI()
  CONTROLLER.add(CONFIG, 'SEGMENTS', 1, 100, 1).name('Segments').onChange(UPDATE)
  CONTROLLER.add(CONFIG, 'ANGLE', 1, 120, 1).name('Angle').onChange(UPDATE)
  CONTROLLER.add(CONFIG, 'WIDTH', 1, 100, 1).name('Width').onChange(UPDATE)
  CONTROLLER.add(CONFIG, 'BLUR', 1, 100, 1).name('Blur').onChange(UPDATE)
  CONTROLLER.add(CONFIG, 'HUE', 0, 360, 1).name('Hue').onChange(UPDATE)
  CONTROLLER.add(CONFIG, 'SATURATION', 0, 100, 1).name('Saturation').onChange(UPDATE)
  CONTROLLER.add(CONFIG, 'LIGHTNESS', 0, 100, 1).name('Lightness').onChange(UPDATE)


  // Trick to get Firefox to render
  UPDATE()
})()
