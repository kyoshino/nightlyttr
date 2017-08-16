/**
 * Parse a message from the frontend script and execute a specified command.
 * @param {Object.<String,*>} message - A message object from frontend.
 */
const handle_command = message => {
  const $active = document.activeElement;
  const is_textbox = 'placeholder' in $active && !$active.readOnly;

  if (message.command === 'check_if_textbox_is_focused') {
    browser.runtime.sendMessage({ command: 'check_if_textbox_is_focused', value: is_textbox });
  }

  if (message.command === 'insert_to_textbox' && is_textbox) {
    $active.value = message.value;
  }
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handle_command(message);
});
