// Simple logger using Zotero.debug directly (Zotero 8 compatible)
declare var Zotero: any

export const log = {
  info: (...args: any[]) => Zotero.debug(`[folder-import] INFO: ${args.join(' ')}`),
  debug: (...args: any[]) => Zotero.debug(`[folder-import] DEBUG: ${args.join(' ')}`),
  error: (...args: any[]) => Zotero.debug(`[folder-import] ERROR: ${args.join(' ')}`),
  warn: (...args: any[]) => Zotero.debug(`[folder-import] WARN: ${args.join(' ')}`),
}
