/**
 * Retrieve the current variable values from the runtime.
 * @return {Object.<String,*>} The values.
 */
const get_variable_values = async () => {
  const browser_info = await browser.runtime.getBrowserInfo();
  const platform_info = await browser.runtime.getPlatformInfo();

  return {
    'AppBuildID': browser_info.buildID,
    // 'AppID',
    // 'BrandName',
    // 'Changeset',
    // 'Compiler',
    // 'DefaultTitle': (await browser.tabs.getCurrent()).title,
    'GeckoVersion': browser_info.version,
    'Locale': browser.i18n.getUILanguage(),
    'Name': browser_info.name,
    'OS': platform_info.os,
    'PlatformBuildID': browser_info.buildID,
    'PlatformVersion': browser_info.version,
    'Processor': platform_info.arch,
    // 'Profile',
    'TabsCount': (await browser.tabs.query({})).length,
    // 'TabTitle': (await browser.tabs.getCurrent()).title,
    // 'Toolkit',
    'UserAgent': navigator.userAgent,
    'Vendor': browser_info.vendor,
    'Version': browser_info.version,
  };
};

/**
 * Localize the current HTML page. Each localizable element must specify a message name with the `data-i18n` attribute.
 */
const localize_page = () => {
  document.querySelectorAll('[data-i18n]').forEach($node => {
    $node.textContent = browser.i18n.getMessage($node.dataset.i18n);
  });
};

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
  document.execCommand('Copy');
  $textbox.remove();
};

/**
 * Insert a string into the focused textbox, either <input> or <textarea>, on the current web page.
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
  return (await browser.management.getAll())
      .filter(ext => ext.type === 'extension')
      .sort((a, b) => a.name > b.name)
      .map(ext => ext.name + ' ' + ext.version + (ext.enabled ? '' : ' [DISABLED]'))
      .join('\n');
};

/**
 * Handle a menu command when the user clicked an item.
 * @param {String} command - A distinguishable command name.
 */
const handle_command = async command => {
  if (command === 'copy_build_id') {
    copy_to_clipboard(await get_build_id());
  }

  if (command === 'insert_build_id') {
    await insert_to_textbox(await get_build_id());
  }

  if (command === 'copy_extension_list') {
    copy_to_clipboard(await get_extension_list());
  }

  if (command === 'insert_extension_list') {
    await insert_to_textbox(await get_extension_list());
  }

  if (command === 'open_options_page') {
    await browser.runtime.openOptionsPage();
  }
};
