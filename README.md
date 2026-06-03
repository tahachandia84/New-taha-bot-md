<div align="center">

<img src="https://files.catbox.moe/9126wm.png" width="150" alt="SHEHBAZ-MD"/>

# 🤖 SHEHBAZ-MD

**WhatsApp Multi-Device Bot — v4.5.6**

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Baileys](https://img.shields.io/badge/Baileys-WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://github.com/WhiskeySockets/Baileys)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/SHEHBAZ-MD?style=flat-square&color=yellow&logo=github)](https://github.com/YOUR_USERNAME/SHEHBAZ-MD/stargazers)
[![Forks](https://img.shields.io/github/forks/YOUR_USERNAME/SHEHBAZ-MD?style=flat-square&color=orange&logo=github)](https://github.com/YOUR_USERNAME/SHEHBAZ-MD/forks)

> 🚀 **Free** • **Open Source** • **Multi-Device** — Apna Khud Ka WhatsApp Bot Banao!

**[📦 Installation](#-installation) · [⚡ Quick Start](#-quick-start) · [📋 Commands](#-commands) · [🔧 Config](#-configuration) · [💬 Support](#-support)**

---

<img src="https://files.catbox.moe/9126wm.png" width="600" alt="SHEHBAZ-MD Preview"/>

</div>

---

## 🌟 Features

<table>
<tr>
<td>

**🔒 Security**
- ✅ Anti-Delete System
- ✅ Anti-Call Protection
- ✅ Anti-Link (Groups)
- ✅ Owner-Only Commands

</td>
<td>

**⚡ Automation**
- ✅ Auto-React to Messages
- ✅ Auto-Read Messages
- ✅ Auto-Reply (DMs)
- ✅ Auto-Status View

</td>
<td>

**☁️ Infrastructure**
- ✅ MongoDB Cloud Storage
- ✅ QR-less Pairing System
- ✅ Multi-Session Support
- ✅ Auto-Reconnect

</td>
</tr>
</table>

---

## 📋 Commands

### 👥 Group Management

| Command | Description | Who Can Use |
|---|---|---|
| `.tagall` | Tag all group members | Admin |
| `.kick @user` | Remove a member | Admin |
| `.promote @user` | Make someone admin | Admin |
| `.demote @user` | Remove admin rights | Admin |
| `.hidetag <msg>` | Tag all (hidden list) | Admin |
| `.mute on/off` | Lock / Unlock group | Admin |
| `.grouplink` | Get invite link | Admin |
| `.warn @user` | Give warning (3 = kick) | Admin |
| `.resetwarn @user` | Reset warnings | Admin |
| `.warnlist` | View all warnings | Admin |

### 🛠️ Utilities

| Command | Description |
|---|---|
| `.tiktok <url>` | Download TikTok video without watermark |
| `.calc <expression>` | Calculator (e.g. `.calc 5*3+2`) |
| `.wiki <topic>` | Wikipedia search |
| `.fancy <text>` | 90+ fancy text styles |
| `.weather <city>` | Live weather info |
| `.shorturl <link>` | Shorten any URL |
| `.getpp @user` | Get profile picture |

### 📸 Media

| Command | Description |
|---|---|
| `.sticker` | Convert image/video to sticker |
| `.take` | Rename an existing sticker |

### 👑 Owner Commands

| Command | Description |
|---|---|
| `.broadcast <msg>` | Send message to all groups |
| `.restart` | Restart the bot |

---

## 📦 Installation

### ✅ Requirements

- **Node.js** v20 or higher → [Download](https://nodejs.org)
- **MongoDB Atlas** (Free) → [Sign up](https://mongodb.com/atlas)
- **Git** → [Download](https://git-scm.com)
- A **WhatsApp** number

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/SHEHBAZ-MD.git
cd SHEHBAZ-MD
```

### Step 2 — Install Dependencies

```bash
npm install
```

> ⏳ This may take 1-2 minutes. Do not close the terminal.

### Step 3 — Create Environment File

Create a file named `.env` in the root folder:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shehbazmd
OWNER_NUMBER=923XXXXXXXXX
PORT=8000
```

**How to get MongoDB URI:**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Sign up free
2. Create a cluster → Connect → Drivers
3. Copy the connection string and replace `<password>` with your password

### Step 4 — Start the Bot

```bash
node index.js
```

---

## ⚡ Quick Start (Pairing)

1. Start the bot: `node index.js`
2. Open your browser: **`http://localhost:8000`**
3. Enter your WhatsApp number (with country code, no `+`)
   - Example: `923001234567`
4. A **pairing code** will appear on screen
5. On your phone: **WhatsApp → Settings → Linked Devices → Link a Device → Link with Phone Number**
6. Enter the pairing code → Connected! ✅

---

## 🔧 Configuration

Open `setting.js` and customize:

```js
export default {
    BOT_NAME:        "SHEHBAZ-MD",     // Your bot's name
    OWNER_NAME:      "Shehbaz",        // Your name
    PREFIX:          ".",               // Command prefix (. / ! / #)
    MODE:            "public",          // "public" = everyone | "private" = owner only

    // Features (true = ON, false = OFF)
    AUTO_REACT:      "true",           // React with emoji to messages
    READ_MESSAGE:    "true",           // Auto read all messages
    ANTI_DELETE:     "true",           // Catch & forward deleted messages
    ANTI_CALL:       "true",           // Auto-reject incoming calls
    ANTI_LINK:       "false",          // Block links in groups
    AUTO_STATUS_SEEN:"true",           // Auto view statuses

    // Auto Reply (DMs only)
    AUTO_REPLY:      "false",
    AUTO_REPLY_MSG:  "Bot is active! Please wait.",
    AUTO_REPLY_DELAY:"60",             // Cooldown in seconds
}
```

---

## 🗂️ Project Structure

```
SHEHBAZ-MD/
│
├── 📄 index.js               # Main entry point
├── 📄 setting.js             # Bot configuration
├── 📄 pair.js                # Pairing web interface
├── 📄 package.json           # Dependencies
├── 📄 .env                   # Your secrets (create this)
├── 📄 .gitignore
│
├── 📁 lib/
│   ├── command.js            # Plugin command helper
│   ├── commandRegistry.js    # Command routing
│   ├── mongoAuth.js          # MongoDB session storage
│   └── sessionManager.js     # Multi-session handler
│
├── 📁 plugins/               # All bot commands live here
│   ├── tiktok.js             # TikTok video downloader
│   ├── sticker.js            # Sticker creator
│   ├── group.js              # Group management
│   ├── warn.js               # Warning system
│   ├── tools.js              # Utility commands
│   └── ...
│
└── 📁 public/
    └── pair.html             # Pairing web page
```

---

## ➕ Adding Your Own Plugin

Create a new `.js` file in the `plugins/` folder:

```js
import { cmd } from '../lib/command.js';

cmd({
    pattern: 'hello',           // Command: .hello
    alias: ['hi', 'hey'],       // Aliases
    desc: 'Say hello',
    category: 'fun'
}, async (sock, msg, ctx) => {
    const { from, reply, args, sender } = ctx;

    reply(`👋 Hello @${sender.split('@')[0]}!`);
});
```

**Available context (`ctx`):**
| Property | Description |
|---|---|
| `from` | Chat JID (group or DM) |
| `reply(text)` | Send a reply message |
| `args` | Array of command arguments |
| `sender` | Sender's JID |
| `isGroup` | Boolean — is it a group? |
| `isOwner` | Boolean — is sender owner? |
| `prefix` | Command prefix (`.`) |
| `command` | The command name used |

---

## 🐛 Troubleshooting

<details>
<summary><b>Bot doesn't connect to WhatsApp</b></summary>

- Check your internet connection
- Make sure `MONGODB_URI` in `.env` is correct
- Run `node index.js` and check for error messages

</details>

<details>
<summary><b>Commands are not working</b></summary>

- Verify you're using the correct prefix (default: `.`)
- In `private` MODE, only the owner can use commands
- Check if the plugin loaded: look for errors on startup

</details>

<details>
<summary><b>Pairing code not showing</b></summary>

- Open `http://localhost:8000` in your browser
- Enter number **with country code**, without `+`
- Example: `923001234567` ✅ — NOT `+923001234567` ❌

</details>

<details>
<summary><b>Plugin not loading on startup</b></summary>

Check for syntax errors:
```bash
node --check plugins/yourplugin.js
```

</details>

<details>
<summary><b>Bot gets disconnected frequently</b></summary>

- The bot auto-reconnects after disconnect
- If it keeps happening, check MongoDB connection
- Make sure your server/PC stays online

</details>

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork this repository
2. Create your branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m 'feat: Add AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 🔒 Security

Found a vulnerability? Please read [SECURITY.md](SECURITY.md) before opening an issue.

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

You are free to use, modify, and distribute this project. Credit is appreciated but not required.

---

## 💬 Support

| Platform | Link |
|---|---|
| 💬 WhatsApp | [Chat with Developer](https://wa.me/923212844383) |
| 🐛 Bug Reports | [GitHub Issues](../../issues/new?template=bug_report.md) |
| 💡 Feature Request | [GitHub Issues](../../issues/new?template=feature_request.md) |

---

## ⭐ Star History

If this project helped you, please give it a ⭐ — it motivates me to keep improving!

---

<div align="center">

**Made with ❤️ by [Shehbaz Dev](https://wa.me/923212844383)**

> ⚡ *Powered by Shehbaz—Dev*

</div>
