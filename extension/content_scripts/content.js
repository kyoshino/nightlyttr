browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const $element = document.activeElement;
  const is_textbox = 'placeholder' in $element && !$element.readOnly;

  if (request.command === 'check_if_textbox_is_focused') {
    browser.runtime.sendMessage({ command: 'check_if_textbox_is_focused', value: is_textbox });
  }

  if (request.command === 'insert_to_textbox' && is_textbox) {
    document.activeElement.value = request.value;
  }
});
