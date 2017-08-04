/**
 * Send a message to the content script.
 * @param {String} command - A distinguishable command name.
 * @param {*} value - Any value to be passed to content.
 */
const send_message = async (command, value) => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });

  browser.tabs.sendMessage(tabs[0].id, { command, value });
};

/**
 * Copy a string to the system clipboard.
 * @param {String} str - A string to be copied.
 */
const copy_to_clipboard = str => {
  const $textbox = document.body.appendChild(document.createElement('textarea'));

  $textbox.value = str;
  $textbox.select();
  document.execCommand("Copy");
  $textbox.remove();
};

/**
 * Insert a string into the focused textbox, either <input> or <textarea>, on the current page.
 * @param {String} str - A string to be inserted.
 */
const insert_to_textbox = async str => {
  await send_message('insert_to_textbox', str);
};

/**
 * Get the build ID of the browser.
 * @return {String} A summarized build info.
 */
const get_build_id = async () => {
  const info = await browser.runtime.getBrowserInfo();

  return navigator.userAgent + ' ID: ' + info.buildID + ' CSet: (unknown)';
};

/**
 * Get a list of currently installed extensions.
 * @return {String} A summarized extension list.
 */
const get_extension_list = async () => {
  const list = await browser.management.getAll();

  return list
      .filter(ext => ext.type === 'extension')
      .sort((a, b) => a.name > b.name)
      .map(ext => ext.name + ' ' + ext.version + (ext.enabled ? '' : ' [DISABLED]'))
      .join('\n');
};

/**
 * Localize the menu items.
 */
const localize_items = () => {
  document.querySelectorAll('[data-i18n]').forEach($node => {
    $node.textContent = browser.i18n.getMessage($node.dataset.i18n);
  });
};

/**
 * Enable the "insert" menu items if any textbox is getting focused on the page.
 */
const update_inserting_options = async () => {
  await send_message('check_if_textbox_is_focused');

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'check_if_textbox_is_focused' && request.value) {
      document.querySelectorAll('[data-command^="insert_"]').forEach($item => {
        $item.classList.remove('disabled');
      });
    }
  });
};

/**
 * Handle a menu command when the user clicked an item.
 * @param {MouseEvent} event - A click event.
 */
const handle_command = async event => {
  const command = event.target.dataset.command;

  if (command === "copy_build_id") {
    copy_to_clipboard(await get_build_id());
  }

  if (command === "insert_build_id") {
    await insert_to_textbox(await get_build_id());
  }

  if (command === "copy_extension_list") {
    copy_to_clipboard(await get_extension_list());
  }

  if (command === "insert_extension_list") {
    await insert_to_textbox(await get_extension_list());
  }
};

window.addEventListener('DOMContentLoaded', async event => {
  localize_items();
  await update_inserting_options();
});

document.addEventListener('click', async event => {
  await handle_command(event);
  window.close();
});
