#!/bin/bash
# Apply Zotero 8 compatibility patches to zotero-plugin-toolkit
# These patches fix deprecated ChromeUtils.import() calls

TOOLKIT_DIR="node_modules/zotero-plugin-toolkit/dist"

# Patch basic.js - fix Console.jsm import
sed -i.bak 's/if (typeof globalThis.ChromeUtils?.import !== "undefined") {/try {/' "$TOOLKIT_DIR/basic.js"
sed -i.bak 's/ChromeUtils.import("resource:\/\/gre\/modules\/Console.jsm")/ChromeUtils.importESModule("resource:\/\/gre\/modules\/Console.sys.mjs")/' "$TOOLKIT_DIR/basic.js"
sed -i.bak 's/});$/});\n        } catch (e) {\n            \/\/ Console not available\n        }/' "$TOOLKIT_DIR/basic.js"

# Patch pluginBridge.js - fix AddonManager.jsm import
sed -i.bak 's/ChromeUtils.import("resource:\/\/gre\/modules\/AddonManager.jsm")/ChromeUtils.importESModule("resource:\/\/gre\/modules\/AddonManager.sys.mjs")/' "$TOOLKIT_DIR/utils/pluginBridge.js"

echo "Patches applied for Zotero 8 compatibility"
