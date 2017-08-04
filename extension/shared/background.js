/**
 * Retrieve the current variable values.
 * @return {Object} The values.
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
