/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Enable the "insert" menu items if any textbox is getting focused on the page.
 */
const update_inserting_options = async () => {
  await send_message('check_if_textbox_is_focused');

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'check_if_textbox_is_focused' && message.value) {
      document.querySelectorAll('[data-command^="insert_"]').forEach($item => {
        $item.classList.remove('disabled');
      });
    }
  });
};

window.addEventListener('DOMContentLoaded', async event => {
  localize_page();
  await update_inserting_options();
});

document.addEventListener('click', async event => {
  await handle_command(event.target.dataset.command);
  window.close();
});
