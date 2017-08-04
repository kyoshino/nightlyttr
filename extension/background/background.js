/**
 * Update the title bar of each window.
 * @param {Array<Window>} windows - A list of windows to be updated.
 */
const update_windows = async windows => {
  const values = await get_variable_values();
  let pref;
  let prefix = ' '; // An empty string doesn't work

  try {
    pref = await browser.storage.local.get();
  } catch (ex) {}

  if (!pref) {
    return;
  }

  if (pref.enable_custom_title && pref.custom_template) {
    prefix = pref.custom_template.replace(/\$\{(\w+)\}/g, (match, str) => find_value(values, str)) + ' — ';
  }

  windows.forEach(async win => {
    await browser.windows.update(win.id, { titlePreface: prefix });
  });
};

/**
 * Find a value from the variable list by its key in a case-insensitive fashion.
 * @param {Object<key,value>} values - The current variable list.
 * @param {String} str - A key to retrieve the value.
 */
const find_value = (values, str) => {
  str = str.toLowerCase();

  for (const [key, value] of Object.entries(values)) {
    if (key.toLowerCase() === str) {
      return value;
    }
  }

  return '';
};

browser.windows.onCreated.addListener(async win => {
  await update_windows([win]);
});

browser.storage.onChanged.addListener(async (changes, area) => {
  await update_windows(await browser.windows.getAll());
});
