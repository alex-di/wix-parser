// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  let code = '`<html>${document.head.outerHTML}${document.body.outerHTML}</html>`'
  chrome.tabs.executeScript({ code }, function (result) {
    let url = tab.url.replace(/\#.*/, '')
    ,   rootReg = /https?:\/\/[^\/]+\/[^\/]+/
    ,   path = url.replace(rootReg, '')
    ,   root = rootReg.exec(url)[0]
    ,   processed = result[0].replace(new RegExp(root, 'g'), '')
    ,   doc = URL.createObjectURL( new Blob([processed], { type: 'text/html' }) )
    ,   filename = (path.slice(1).replace('/', '.') || 'index') + '.html'

    console.log(filename)

    chrome.downloads.download({ url: doc, filename, saveAs: true })
  });
});
