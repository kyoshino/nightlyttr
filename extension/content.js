/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Parse a message from the frontend script and execute a specified command.
 * @param {Object.<String,*>} message - A message object from frontend.
 */
const handle_command = message => {
  const $active = document.activeElement;
  const is_textbox = 'placeholder' in $active && !$active.readOnly;

  if (message.command === 'insert_to_textbox' && is_textbox) {
    $active.value = message.value;
  }
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handle_command(message);
});
