// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});


chrome.browserAction.onClicked.addListener(function(tab) {
        // No tabs or host permissions needed!
        console.log('Turning ' + tab.url + ' red!');
        chrome.tabs.executeScript(null, {file: "index.js"});
  });