// Import the APIs we need.
var contextMenu = require("context-menu");
var request = require("request");
var selection = require("selection");

exports.main = function(options, callbacks) {
    console.log(options.loadReason);
    


    // Create a new context menu item.
    var menuItem = contextMenu.Item({
	
	label: "Send to Eidogo",
	data: 'http://www.eidogo.com/#url:',
	
	// Show this item when a selection exists.
	context: contextMenu.SelectorContext('a[href]'),
	
	// When this item is clicked, post a message to the item with the
	// selected text and current URL.
	contentScript: 'self.on("click", function (node,data) {' +
            '  var posturl = data + node.href; ' +
            '  self.postMessage(posturl);' +
            '});',
	
	// When we receive the message, call the Google Translate API with the
	// selected text and replace it with the translation.
	onMessage: function (text) {
	    if (text.length == 0) {
		throw ("URL for Eidogo must not be empty");
	    }
	    console.log("postUrl: " + text)

	    var windows = require("windows").browserWindows;
	    windows.open(text, '_newtab');
	}
    });
};

exports.onUnload = function (reason) {
    console.log(reason);
};