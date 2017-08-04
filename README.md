# Nightly Tester Tools Redux

A WebExtension port of [Nightly Tester Tools](https://github.com/mozilla/nightlytt).

<img src="https://pbs.twimg.com/media/DGYHGUWXUAAHTvH.jpg:large" alt="screenshot" width="400">

## Install

This port is not yet available on [AMO](https://addons.mozilla.org/), but you can give it a try on [Firefox Nightly](https://nightly.mozilla.org/). Just clone or download this repository and load it as a [temporary add-on](https://developer.mozilla.org/Add-ons/WebExtensions/Temporary_Installation_in_Firefox).

## Features

Those are currently implemented features. Other features may be added soon depending on the available [WebExtensions APIs](https://developer.mozilla.org/Add-ons/WebExtensions/API).

* Copy Build ID to Clipboard
* Copy List of Extensions to Clipboard
* Insert Build ID into Textbox
* Insert List of Extensions into Textbox
* Customize Title Bar

## Limitations

Because of the nature of the limited WebExtensions APIs, not all the features found in the original extension can be implemented. This list explains what you cannot do with this port at this time.

* The change set cannot be retrieved
* The complete extension list cannot be retrieved
* Some variables are not available for the custom title template
