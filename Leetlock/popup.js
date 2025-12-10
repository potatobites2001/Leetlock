// popup.js

const focusToggle = document.getElementById("focusToggle");
const statusBadge = document.getElementById("statusBadge");
const problemInfo = document.getElementById("problemInfo");
const resetBtn = document.getElementById("resetBtn");

function updateUI() {
  chrome.storage.local.get(
    ["focusEnabled", "currentProblemSlug", "currentProblemSolved"],
    (data) => {
      const { focusEnabled = true, currentProblemSlug, currentProblemSolved = false } = data;

      focusToggle.checked = focusEnabled;

      if (currentProblemSlug) {
        problemInfo.innerHTML = `
          Current problem: <span>${currentProblemSlug}</span><br/>
          Solved: <span>${currentProblemSolved ? "✅ Yes" : "❌ Not yet"}</span>
        `;
        statusBadge.textContent = currentProblemSolved
          ? "Problem solved"
          : "Locked on problem";
        statusBadge.className =
          "badge " + (currentProblemSolved ? "badge-on" : "badge-off");
      } else {
        problemInfo.textContent = "No active LeetCode problem detected yet.";
        statusBadge.textContent = "No active lock";
        statusBadge.className = "badge badge-off";
      }
    }
  );
}

focusToggle.addEventListener("change", () => {
  const enabled = focusToggle.checked;
  chrome.storage.local.set({ focusEnabled: enabled }, () => {
    updateUI();
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      currentProblemSlug: null,
      currentProblemSolved: false,
      lastLeetCodeUrl: null
    },
    () => {
      updateUI();
    }
  );
});

// Initial load
updateUI();
