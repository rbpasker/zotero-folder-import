export function install() {}
export function uninstall() {}

let chromeHandle
export async function startup({ id, version, rootURI }) {
  const aomStartup = Components.classes['@mozilla.org/addons/addon-manager-startup;1'].getService(Components.interfaces.amIAddonManagerStartup)
  const manifestURI = Services.io.newURI(`${rootURI}manifest.json`)
  chromeHandle = aomStartup.registerChrome(manifestURI, [
    ['content', 'zotero-folder-import', 'content/'],
  ])

  Services.scriptloader.loadSubScript(`${rootURI}content/folder-import.js`, { rootURI, Zotero })
  await Zotero.FolderImport.startup()
}

export async function shutdown() {
  await Zotero.FolderImport.shutdown()
  if (chromeHandle) {
    chromeHandle.destruct()
    chromeHandle = undefined
  }
  Zotero.FolderImport = null
}

export function onMainWindowLoad({ window }) {
  Zotero.FolderImport?.onMainWindowLoad(window)
}

export function onMainWindowUnload({ window }) {
  Zotero.FolderImport?.onMainWindowUnload(window)
}
