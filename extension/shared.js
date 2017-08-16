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
