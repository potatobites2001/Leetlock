// content.js

(function () {

  // STRICT MODE: Only detect fresh Accepted (run panel or submissions page)
  function isProblemSolvedStrict() {
    // Case 1: Accepted from Run/Submit result panel
    const runAccepted = document.querySelector('span[data-e2e-locator="submission-result"]');
    if (runAccepted && runAccepted.innerText.trim() === "Accepted") {
      return true;
    }

    // Case 2: Accepted on the Submissions history page
    const historyAccepted = document.querySelector('span.text-dark-green-s');
    if (historyAccepted && historyAccepted.innerText.trim().includes("Accepted")) {
      return true;
    }

    return false;
  }

  function getProblemSlug() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts[0] === "problems" && parts[1]) {
      return parts[1];
    }
    return null;
  }

  function init() {
    const slug = getProblemSlug();
    if (!slug) return;

    const solvedNow = isProblemSolvedStrict();
    const currentUrl = window.location.href;

    chrome.storage.local.set({
      currentProblemSlug: slug,
      lastLeetCodeUrl: currentUrl,
      currentProblemSolved: solvedNow
    });

    const observer = new MutationObserver(() => {
      const solved = isProblemSolvedStrict();
      chrome.storage.local.set({ currentProblemSolved: solved });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
