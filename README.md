# Nightly Tester Tools Redux

A WebExtension port of [Nightly Tester Tools](https://github.com/mozilla/nightlytt).

## Install

This port is not yet available on [AMO](https://addons.mozilla.org/), but you can [give it a try](https://developer.mozilla.org/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) using the built-in debugging tool of Firefox.

## Features

Those are currently implemented features. Other features may be added soon depending on the available [WebExtensions APIs](https://developer.mozilla.org/Add-ons/WebExtensions/API).

* Copy Build ID to Clipboard
* Copy List of Extensions to Clipboard
* Insert Build ID into Textbox
* Insert List of Extensions into Textbox

## Limitations

Because of the nature of the limited WebExtensions APIs, not all the features found in the original extension can be implemented. This list explains what you cannot do with this port at this time.

* The change set cannot be retrieved
* The complete extension list cannot be retrieved
