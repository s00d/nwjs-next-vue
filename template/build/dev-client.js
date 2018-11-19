const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe((event) => {
  switch (event.action) {
    case 'reload':
      onReload()
      break
    case 'compiling':
      onCompiling()
      break
    case 'compiled':
      onCompiled()
      break
  }
})



function onReload () {
  window.location.reload()
  // chrome.runtime.reload()
}

function onCompiling () {
  document.body.innerText += '<div style="position: absolute; bottom: 20px; left: 20px; background: #4fc08d; color: #fff;">Compiling...</div>'
}

function onCompiled () {
  chrome.runtime.reload()
}

