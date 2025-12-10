Leetlock 🔒 — DSA Focus Chrome Extension

Leetlock is a productivity Chrome extension designed for students preparing DSA and coding interviews.
It keeps you focused by locking you on your current LeetCode problem until you actually solve it.
No YouTube. No Instagram. No new tabs. Only pure DSA grind.
🚀 Features

🔒 Strict Mode — Only unlocks when you get a fresh “Accepted” on LeetCode

⛔ Blocks distracting sites (YouTube, Instagram, Reddit, Twitter, etc.)

🧭 Prevents opening new tabs while problem is unsolved

✔ Detects fresh Accepted results in both:

main submission panel

submissions history page

🧠 Works automatically on any /problems/<slug>/ page

🌙 Clean popup UI with status & reset button




📦 Installation (Developer Mode)

Download or clone this repo.

Put all the extension files in a folder, e.g. Leetlock/

Open Chrome → go to

chrome://extensions/


Turn on Developer mode (top right)

Click Load unpacked

Select your leetlock folder

Pin the extension to the toolbar
(Click the Extensions icon → pin LeetLock)






🧪 How to Test It

Open a LeetCode problem
For example:

https://leetcode.com/problems/two-sum/


Click on the extension icon and make sure Focus mode is ON

Try:

Opening a new tab and visiting YouTube

Going to Instagram, Twitter, etc.
➝ You should be instantly redirected back to the LeetCode problem 😈

Submit your solution on LeetCode

Once you get Accepted, the extension unlocks your browser again

Only when you submit code and get a fresh Accepted, Focus mode unlocks.

📁 File Structure
Leetlock/
│── manifest.json
│── background.js
│── content.js
│── popup.html
│── popup.js


🎯 Ideal For

Students preparing coding interviews
LeetCode daily challengers
People who get distracted by YouTube, Instagram, Twitter
Anyone who wants a disciplined DSA routine

📜 License
MIT License
