# 🤝 Contributing to SHEHBAZ-MD

Thank you for considering contributing! Every contribution helps make this bot better for everyone.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How to Contribute](#-how-to-contribute)
- [Reporting Bugs](#-reporting-bugs)
- [Suggesting Features](#-suggesting-features)
- [Submitting a Pull Request](#-submitting-a-pull-request)
- [Plugin Development Guide](#-plugin-development-guide)
- [Commit Message Format](#-commit-message-format)

---

## 📜 Code of Conduct

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and constructive.

---

## 🛠️ How to Contribute

### Ways to help:
- 🐛 **Fix bugs** — check open [Issues](../../issues)
- ✨ **Add new plugins** — new commands are always welcome
- 📝 **Improve documentation** — fix typos, add examples
- 🌐 **Translate** — help with multilingual support
- ⭐ **Star the repo** — it helps more people discover this project

---

## 🐛 Reporting Bugs

Before reporting, please:
1. Check if the bug is already reported in [Issues](../../issues)
2. Make sure you are on the latest version

When reporting, include:
- Your Node.js version (`node --version`)
- Your OS (Windows / Linux / macOS)
- Steps to reproduce the bug
- Expected vs actual behavior
- Any error messages from the console

👉 [Open a Bug Report](../../issues/new?template=bug_report.md)

---

## 💡 Suggesting Features

Have an idea for a new command or feature?

👉 [Open a Feature Request](../../issues/new?template=feature_request.md)

Please include:
- What the feature does
- Why it would be useful
- Example usage (e.g., `.newcommand <arg>`)

---

## 🔁 Submitting a Pull Request

### Setup

```bash
# 1. Fork the repo on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/SHEHBAZ-MD.git
cd SHEHBAZ-MD

# 3. Install dependencies
npm install

# 4. Create a new branch
git checkout -b feature/your-feature-name
```

### Make your changes

- Follow the existing code style (ES Modules, async/await)
- Test your changes before submitting
- Keep changes focused — one feature/fix per PR

### Submit

```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

---

## 🔌 Plugin Development Guide

Create a new file in `plugins/your-plugin.js`:

```js
import { cmd } from '../lib/command.js';

cmd({
    pattern: 'commandname',         // Main command (without prefix)
    alias: ['alias1', 'alias2'],    // Optional aliases
    desc: 'What this command does',
    category: 'utility',            // group / utility / download / fun / owner
    use: '.commandname <arg>'       // Usage hint
}, async (sock, msg, ctx) => {
    const { from, reply, args, isOwner, isGroup, sender } = ctx;

    // Owner only check
    if (!isOwner) return reply('❌ Owner only command!');

    // Group only check
    if (!isGroup) return reply('❌ Use this in a group!');

    // Your logic here
    const input = args.join(' ');
    if (!input) return reply('📌 Provide an argument!');

    reply(`✅ Done: ${input}`);
});
```

### Rules for plugins:
- Use **ES module** syntax (`import`, not `require`)
- Always handle errors gracefully with `try/catch`
- Never store sensitive data inside plugin files
- Keep plugins focused — one purpose per file

---

## ✍️ Commit Message Format

Use this format for commit messages:

```
type: short description
```

| Type | When to use |
|---|---|
| `feat` | New feature or plugin |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting only |
| `refactor` | Code restructure |
| `chore` | Dependency updates, configs |

**Examples:**
```
feat: add .youtube downloader plugin
fix: tiktok buffer download headers
docs: update README installation steps
chore: update baileys to latest version
```

---

Thank you for contributing! 🙏

> ⚡ *Powered by Shehbaz—Dev*
