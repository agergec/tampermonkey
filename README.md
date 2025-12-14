# IVANTI Toolbar Remover

A userscript designed to improve the viewing area of IVANTI's web-based remote desktop interface by removing specific navigation toolbars and overlays.

## Overview

When accessing remote desktops via IVANTI SparkGateway, certain toolbars (`svToolbar`) and elements (`dsl0`) can obstruct the view or take up valuable screen real estate. This script automatically detects and removes these HTML elements from the DOM.

## Features

- **Targeted Removal**: Specifically targets element IDs `svToolbar` and `dsl0`.
- **Dynamic Monitoring**: Uses a `MutationObserver` to watch the DOM, ensuring that if these toolbars are re-injected or loaded dynamically after the page load, they are immediately removed again.
- **Immediate Execution**: Runs an initial check immediately upon script load to clear existing elements.

## Installation

1. Install a userscript manager extension for your browser:
   - **Tampermonkey**: [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - **Violentmonkey**: [Chrome](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
2. Create a new script in your manager.
3. Copy and paste the content of `ivantiToolbarRemover.js` into the editor.
4. Save the script.

## Usage

The script is configured to run automatically on URLs matching the pattern:
`https://*/dana/html5acc/SparkGateway/*`

No manual intervention is required. Once installed, the specified toolbars will simply not appear or will vanish immediately upon loading the remote session.

## Technical Details

- **Language**: JavaScript
- **Key API**: `MutationObserver` (to handle asynchronous DOM changes)
- **Target Elements**: 
  - `svToolbar`: Typically the main floating control bar.
  - `dsl0`: Often an overlay or secondary status container.

## Disclaimer

This script is a third-party modification and is not affiliated with or endorsed by IVANTI. Use it at your own discretion.
