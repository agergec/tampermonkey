// ==UserScript==
// @name         Google Meet - Instant View (Smart Lock)
// @namespace    http://tampermonkey.net/
// @version      10.0
// @description  Opens Adjust View (V8 base) with spam protection and "Active" state detection
// @author       Gemini
// @match        https://meet.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- Configuration ---
    const TARGET_NAMES = ["Adjust view", "Change layout", "Layout"];
    const TEXT_MORE_OPTIONS = "More options";

    // State flag to prevent double-clicking while script is working
    let isProcessing = false;

    // --- 1. Helper: Check if Window is Already Open ---
    function isSettingsOpen() {
        // Look for the specific header inside a dialog box
        const headers = document.querySelectorAll('div[role="dialog"] h2');
        for (let h of headers) {
            if (h.innerText.includes("Adjust view") || h.innerText.includes("Layout")) {
                return true;
            }
        }
        return false;
    }

    // --- 2. Automation Logic ---
    async function openStandardMenu() {

        // STOP if already running OR if window is already open
        if (isProcessing) return;
        if (isSettingsOpen()) {
            console.log("Gemini: Settings window is already open.");
            return;
        }

        // Lock the button
        isProcessing = true;
        updateButtonState("...");

        // A. Find "Three Dots"
        const buttons = Array.from(document.querySelectorAll('button[aria-label]'));
        const moreBtn = buttons.find(b => b.getAttribute('aria-label').trim() === TEXT_MORE_OPTIONS);

        if (!moreBtn) {
            console.log("Gemini: 'More options' button not found.");
            resetButton();
            return;
        }

        moreBtn.click();

        // B. Search for "Adjust view" in the popup
        let attempts = 0;
        const searchInterval = setInterval(() => {
            attempts++;
            const menuItems = document.querySelectorAll('li[role="menuitem"], span');

            let found = false;
            for (let el of menuItems) {
                const text = el.innerText || "";
                if (TARGET_NAMES.some(name => text.includes(name))) {

                    el.click();
                    if(el.parentElement && el.parentElement.tagName === 'LI') el.parentElement.click();

                    found = true;
                    clearInterval(searchInterval);

                    // Success! Wait a moment for window to appear, then unlock
                    setTimeout(() => {
                        isProcessing = false;
                        checkButtonStatus(); // Will turn button "Grey/Active"
                    }, 500);
                    return;
                }
            }

            // Timeout after 2 seconds
            if (attempts > 20) {
                clearInterval(searchInterval);
                resetButton();
            }
        }, 100);
    }

    // --- 3. Button State Management ---

    function updateButtonState(text, color) {
        const btn = document.getElementById('gm-smart-btn');
        if (btn) {
            btn.innerHTML = `<span>🎛️</span> ${text}`;
            if (color) btn.style.backgroundColor = color;
        }
    }

    function resetButton() {
        isProcessing = false;
        const btn = document.getElementById('gm-smart-btn');
        if (btn) {
            btn.innerHTML = `<span>🎛️</span> Adjust View`;
            btn.style.backgroundColor = '#3c4043'; // Default Grey
            btn.style.cursor = 'pointer';
            btn.style.opacity = '1';
        }
    }

    // Monitors the screen to see if you closed the window manually
    function checkButtonStatus() {
        const btn = document.getElementById('gm-smart-btn');
        if (!btn) return;

        if (isSettingsOpen()) {
            // If window is open -> Button looks "Disabled"
            btn.innerHTML = `<span>✅</span> Active`;
            btn.style.backgroundColor = '#202124'; // Darker (blends in)
            btn.style.color = '#9aa0a6'; // Dimmed text
            btn.style.cursor = 'default';
            btn.style.border = '1px solid #3c4043';
        } else if (!isProcessing) {
            // If window is closed -> Button is ready
            resetButton();
        }
    }

    // --- 4. Create the Trigger Button ---
    function createButton() {
        if (document.getElementById('gm-smart-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'gm-smart-btn';
        btn.innerHTML = `<span>🎛️</span> Adjust View`;

        Object.assign(btn.style, {
            position: 'fixed',
            top: '12px',
            left: '110px',
            zIndex: '99999',
            padding: '8px 16px',
            backgroundColor: '#3c4043',
            color: 'white',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            transition: 'all 0.2s'
        });

        // Add hover effect only if active
        btn.onmouseover = () => { if(!isSettingsOpen() && !isProcessing) btn.style.backgroundColor = '#4d5156'; };
        btn.onmouseout = () => { if(!isSettingsOpen() && !isProcessing) btn.style.backgroundColor = '#3c4043'; };

        btn.onclick = openStandardMenu;
        document.body.appendChild(btn);
    }

    // --- 5. Init & Persistent Watcher ---
    // We run a slow check (every 500ms) to update the button status
    // in case you close the window manually using the "X"
    setInterval(() => {
        if (document.querySelector('button[aria-label*="microphone"]')) {
            createButton();
            checkButtonStatus();
        }
    }, 500);

})();
