const req = (path, cb) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', path)
  xhr.send(null)

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      cb(xhr.responseText)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input-url')
  const output = document.getElementById('output')
  const canvas = document.getElementById('canvas')
  const inputWidth = document.getElementById('input-width')
  const replaceWhite = document.getElementById('replace-white')
  const ctx = canvas.getContext('2d')

  const whiteToTransparent = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const length = data.length

    let i = 0
    for (; i < length; i += 4) {
      const oldRed = data[i]
      const oldGreen = data[i + 1]
      const oldBlue = data[i + 2]
      const oldAlpha = data[i + 3]
      if (oldRed === 255 && oldGreen === 255 && oldBlue === 255) {
        data[i + 3] = 0
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }

  document.getElementById('submit').addEventListener('click', () => {
    output.textContent = 'Loading ...'
    const width = parseInt(inputWidth.value)
    req(input.value, (res) => {
      const image = new Image()
      image.src = 'data:image/svg+xml,' + escape(res)
      image.onload = function () {
        const height = image.width * width / image.height
        canvas.width = width
        canvas.height = height
        ctx.drawImage(image, 0, 0, width, height)
        if (replaceWhite.checked) {
          whiteToTransparent()
        }
        output.href = canvas.toDataURL()
        output.textContent = 'Create PNG'
      }
    })
  })
})
