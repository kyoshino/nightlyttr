/**
 * Localize UI elements.
 */
const localize_view = () => {
  document.querySelectorAll('[data-i18n]').forEach($node => {
    $node.textContent = browser.i18n.getMessage($node.dataset.i18n);
  });
};
