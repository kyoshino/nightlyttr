const { classes: Cc, interfaces: Ci, manager: Cm, results: Cr, utils: Cu } = Components;

class NTT {
  static get_app_ini_string (section, key) {
    const directory_service = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties);
    const ini_file = directory_service.get('GreD', Ci.nsIFile);

    ini_file.append('application.ini');

    if (!ini_file.exists()) {
      ini_file = directory_service.get('CurProcD', Ci.nsIFile);
      ini_file.append('application.ini');
    }

    const ini_parser = Cm.getClassObjectByContractID('@mozilla.org/xpcom/ini-parser-factory;1', Ci.nsIINIParserFactory)
                         .createINIParser(ini_file);

    try {
      return ini_parser.getString(section, key);
    } catch (ex) {
      return undefined;
    }
  }
}

class API extends ExtensionAPI {
  getAPI (context) {
    return {
      ntt: {
        async get_changeset () {
          NTT.get_app_ini_string('App', 'SourceStamp');
        },
      }
    };
  }
}
