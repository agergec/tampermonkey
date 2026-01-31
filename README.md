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
Here is the raw Markdown code for your README.md file. You can copy and paste this directly into GitHub.
Markdown

# Google Meet - Instant View Settings 🎛️

A lightweight userscript that fixes the "buried" view settings in Google Meet. It adds a persistent, native-looking button to the main toolbar that instantly opens the **Adjust View** window, bypassing the nested `(...) -> Change layout` menu.

### 🚀 Features

* **One-Click Access:** Opens the "Adjust View" / "Change Layout" modal instantly.
* **Smart Lock Mechanism:** Prevents spam-clicking and accidental cascaded windows.
* **Active State Detection:** The button detects if the settings window is already open and switches to an "Active" (read-only) state.
* **Native UI Integration:** Designed to match Google Meet's dark theme and button styles perfectly.
* **Zero Configuration:** Works automatically upon joining a meeting.

### 📦 Installation

1.  Install a userscript manager:
    * **Chrome/Edge:** [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
    * **Firefox:** [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2.  Create a new script in your manager.
3.  Copy and paste the code from `script.js` (provided below).
4.  Save the script and refresh your Google Meet tab.

### 🛠️ How it Works

The script uses a secure `MutationObserver` to detect when the Google Meet toolbar loads. It injects a custom button that programmatically triggers the specific generic events required to open the layout menu, doing so invisibly to the user.

**Smart Lock Logic:**
* **Click:** Triggers the menu automation.
* **Processing:** Locks the button to prevent double-clicks.
* **Open:** Changes button text to `✅ Active` until the user closes the dialog manually.

###  🤝 Contributing

This is a personal utility script. Feel free to fork and improve if Google updates their DOM structure!
**Disclaimer**: This project is not affiliated with Google or Google Meet. It is a client-side customization script.
