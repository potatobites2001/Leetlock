// background.js

const LEETCODE_HOST = "leetcode.com";

// Helper to check if URL is LeetCode
function isLeetCodeUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.hostname === LEETCODE_HOST;
  } catch (e) {
    return false;
  }
}

// Core guard: called when a tab is created or updated
function enforceFocusOnTab(tabId, url) {
  chrome.storage.local.get(
    ["focusEnabled", "currentProblemSlug", "currentProblemSolved", "lastLeetCodeUrl"],
    (data) => {
      const {
        focusEnabled = true,
        currentProblemSlug,
        currentProblemSolved = false,
        lastLeetCodeUrl
      } = data;

      if (!focusEnabled) return;
      if (!currentProblemSlug) return;
      if (currentProblemSolved) return;
      if (!url) return;

      // If it's LeetCode, allow
      if (isLeetCodeUrl(url)) return;

      // Otherwise redirect back to the current problem
      const fallbackUrl =
        lastLeetCodeUrl || `https://leetcode.com/problems/${currentProblemSlug}/`;

      chrome.tabs.update(tabId, { url: fallbackUrl });
    }
  );
}

// When a tab's URL changes or starts loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url) {
    enforceFocusOnTab(tabId, tab.url);
  }
});

// When a new tab is created
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url) {
    enforceFocusOnTab(tab.id, tab.url);
  } else {
    // New empty tab: still enforce once it gets a URL
    chrome.tabs.onUpdated.addListener(function tempListener(tabId, changeInfo, updatedTab) {
      if (tabId === tab.id && changeInfo.status === "loading" && updatedTab.url) {
        enforceFocusOnTab(tabId, updatedTab.url);
        chrome.tabs.onUpdated.removeListener(tempListener);
      }
    });
  }
});
