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
