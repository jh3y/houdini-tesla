if (typeof registerPaint !== 'undefined') {
  const PROPS = [
    '--tesla', // Trick here is to listen something being animated so it triggers repaint
    '--tesla-hue',
    '--tesla-saturation',
    '--tesla-lightness',
    '--tesla-blur',
    '--tesla-width',
    '--tesla-segments',
    '--tesla-angle',
  ]
  class TeslaCoil {
    static get inputProperties() {
      return PROPS
    }

    parseProps(props) {
      return PROPS.map((prop) => props.get(prop).toString().trim())
    }

    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    generateSegments(startX, endX, startY, endY) {
      const FIELD = parseInt(this.__angle, 10)
      const SEGMENTS = parseInt(this.__segments, 10)
      const result = []
      let refX = startX
      let refY = startY
      const getDistance = (x, y) => {
        const xLength = endX - x
        const yLength = endY - y
        const distance = Math.sqrt(xLength * xLength + yLength * yLength)
        return distance
      }
      const addSegment = (refX, refY) => {
        let angleToCenter =
          Math.atan2(endY - refY, endX - refX) * (180 / Math.PI)
        const lowerAngle = angleToCenter - FIELD
        const upperAngle = angleToCenter + FIELD
        const angle = this.getRandom(lowerAngle, upperAngle) * (Math.PI / 180)
        const distance = getDistance(refX, refY)
        const radius = this.getRandom(1, Math.min(endX / SEGMENTS, distance))
        const x = refX + radius * Math.cos(angle)
        const y = refY + radius * Math.sin(angle)
        if (y > 0 && y < endY * 2) {
          refX = x
          refY = y
          result.push([x, y])
          if (getDistance(x, y) > (endX / SEGMENTS)) {
            addSegment(x, y)
          }
        } else {
          addSegment(refX, refY)
        }
      }
      addSegment(refX, refY)
      return result
    }

    drawLine(ctx, x1, x2, y1, y2) {
      const SEGMENTS = this.generateSegments(x1, x2, y1, y2)
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      for (const SEGMENT of SEGMENTS) ctx.lineTo(SEGMENT[0], SEGMENT[1])
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    paint(ctx, size, properties) {
      this.__ctx = ctx
      const [, hue, saturation, lightness, blur, width, segments, angle] = this.parseProps(
        properties
      )
      // Store in class
      this.__segments = segments
      this.__angle = angle
      // Set stroke properties
      ctx.lineWidth = width
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
      ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
      ctx.shadowBlur = blur
      this.drawLine(ctx, -width, parseInt(size.width, 10) + parseInt(width, 10), size.height * 0.5, size.height * 0.5)
    }
  }

  registerPaint('tesla-coil', TeslaCoil)
}
