<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=SHEHBAZ-MD&fontSize=90&fontColor=fff&animation=twinkling&fontAlignY=40&desc=🤖+WhatsApp+Multi-Device+Bot&descAlignY=62&descSize=22&descColor=ffffff" width="100%"/>

<br/>

<img src="https://files.catbox.moe/x9rntx.png" width="330" alt="SHEHBAZ-MD Logo"/>

<br/><br/>

<img src="https://img.shields.io/badge/Version-4.5.6-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logoColor=white"/>

<br/><br/>

[![Stars](https://img.shields.io/github/stars/shehbaz-dev/Shehbaz-MD?style=for-the-badge&logo=github&color=00ffcc&labelColor=121212)](https://github.com/shehbaz-dev/Shehbaz-MD/stargazers)
[![Forks](https://img.shields.io/github/forks/shehbaz-dev/Shehbaz-MD?style=for-the-badge&logo=git&color=00ffcc&labelColor=121212)](https://github.com/shehbaz-dev/Shehbaz-MD/network/members)
[![Issues](https://img.shields.io/github/issues/shehbaz-dev/Shehbaz-MD?style=for-the-badge&logo=github-actions&color=ff0055&labelColor=121212)](https://github.com/shehbaz-dev/Shehbaz-MD/issues)



<br/><br/>

 **Free · Open Source · Multi-Device**
>
> *Make Your Own WhatsApp bot — Free And Easy!*

<br/>

[📦 Install](#-installation) &nbsp;•&nbsp; [⚡ Pair](#-pairing-guide) &nbsp;•&nbsp; [📋 Commands](#-commands) &nbsp;•&nbsp; [⚙️ Settings](#%EF%B8%8F-configuration) &nbsp;•&nbsp; [🖥️ Free Hosting](#%EF%B8%8F-free-hosting--panels) &nbsp;•&nbsp; [💬 Support](#-support)

</div>

---

> ## ⚠️ IMPORTANT WARNING — Termux Users Must Read
>
> ```
> ❌  DO NOT run this bot on Termux (Android)
> ```
>
> **Why?** Termux has known issues with:
> - `node_modules` installation failures (permission errors)
> - `npm install` crashing on native packages like `sharp`, `canvas`
> - RAM limits on Android causing the bot to crash frequently
> - Sessions breaking due to Android battery optimization killing the process
>
> ✅ **Use a VPS or Free Panel instead** — see the [Free Hosting section](#%EF%B8%8F-free-hosting--panels) below.

---

## ✨ What Can This Bot Do?

<div align="center">

<table>
<tr>
<td align="center" width="33%">

**🔒 Protection**

Anti-Delete Messages<br/>
Anti-Call Reject<br/>
Anti-Link in Groups<br/>
Owner-Only Mode

</td>
<td align="center" width="33%">

**⚡ Automation**

Auto React to Messages<br/>
Auto Read Messages<br/>
Auto Reply in DMs<br/>
Auto View Statuses

</td>
<td align="center" width="33%">

**☁️ Cloud**

MongoDB Session Storage<br/>
Multi-Session Support<br/>
Auto Reconnect<br/>
QR-less Pairing

</td>
</tr>
</table>

</div>

---

## 📋 Commands

<details>
<summary>
  <b>&nbsp;👥&nbsp; Group Management &nbsp;—&nbsp; click to expand</b>
</summary>

<br/>

> All group commands require **Admin** rights.

| Command | What it does |
|---|---|
| `.tagall` | Tag every member in the group |
| `.tagall Hello everyone!` | Tag everyone with your custom message |
| `.kick @user` | Remove someone from the group |
| `.promote @user` | Make someone an admin |
| `.demote @user` | Remove someone's admin role |
| `.hidetag <msg>` | Tag all members — list stays hidden |
| `.mute on` | Lock group (only admins can message) |
| `.mute off` | Unlock group for everyone |
| `.grouplink` | Get the group invite link |
| `.warn @user` | Give a warning — **3 warnings = auto kick** |
| `.resetwarn @user` | Clear all warnings for a member |
| `.warnlist` | See all current warnings in the group |

<br/>

</details>

<details>
<summary>
  <b>&nbsp;🛠️&nbsp; Tools & Utilities &nbsp;—&nbsp; click to expand</b>
</summary>

<br/>

| Command | What it does | Example |
|---|---|---|
| `.tiktok <link>` | Download TikTok video (no watermark) | `.tiktok https://vt.tiktok.com/xxx` |
| `.calc <math>` | Solve any math expression | `.calc 150*12/4+200` |
| `.wiki <topic>` | Search Wikipedia | `.wiki Black Hole` |
| `.fancy <text>` | Get 90+ fancy font styles | `.fancy Shehbaz` |
| `.weather <city>` | Get live weather | `.weather Lahore` |
| `.shorturl <url>` | Make any URL short | `.shorturl https://google.com` |
| `.getpp @user` | Download someone's profile photo | `.getpp @contact` |

<br/>

</details>

<details>
<summary>
  <b>&nbsp;📸&nbsp; Media & Stickers &nbsp;—&nbsp; click to expand</b>
</summary>

<br/>

| Command | How to use |
|---|---|
| `.sticker` | Reply to any **image or video** — converts to sticker |
| `.take` | Reply to a **sticker** — rename it (`.take BotName PackName`) |

<br/>

</details>

<details>
<summary>
  <b>&nbsp;👑&nbsp; Owner Commands &nbsp;—&nbsp; click to expand</b>
</summary>

<br/>

> 🔐 Only your number (set in `.env`) can use these.

| Command | What it does |
|---|---|
| `.broadcast <message>` | Send a message to **all your groups** at once |
| `.restart` | Restart the bot remotely from WhatsApp |

<br/>

</details>

---

## 📦 Installation

<details open>
<summary>
  <b>&nbsp;✅&nbsp; Step-by-Step Install Guide</b>
</summary>

<br/>

### 1️⃣ — Clone the project

```bash
git clone https://github.com/shehbaz-dev/SHEHBAZ-MD.git
cd SHEHBAZ-MD
```

### 2️⃣ — Install packages

```bash
npm install
```

> 💡 First time takes 2–5 minutes. Do not close the terminal.

### 3️⃣ — Edit index.js file 

```
nano index.js
```
<br/>

edit in these values:

```env
MONGODB_URI  =  mongodb+srv://username:password@cluster.mongodb.net/shehbazmd
OWNER_NUMBER =  923001234567   ← your number, with country code, no +
PORT         =  8000
```

<img src="https://i.postimg.cc/CKkvkM1z/GIF-20260604-114106-957.gif" width="330" alt="Startup GiF"/>

<br/><br/>

<details>
<summary>📌 How to get MongoDB URI (free)</summary>

<br/>

1. Go to → **[mongodb.com/atlas](https://mongodb.com/atlas)** → Sign up free
2. Create a **free M0 cluster**
3. Go to **Connect → Drivers**
4. Copy the connection string
5. Replace `<password>` with your DB password
6. Paste as `MONGODB_URI` in your `.env` file

</details>

### 4️⃣ — Start the bot

```bash
npm start
```

</details>

---

## ⚡ Pairing Guide

<details open>
<summary>
  <b>&nbsp;📱&nbsp; How to connect your WhatsApp</b>
</summary>

<br/>

```
Step 1 → Start bot:   npm start
Step 2 → Open:        http://localhost:8000    (in your browser)
Step 3 → Enter:       Your WhatsApp number with country code
                      ✅  923001234567
                      ❌  +923001234567  or  03001234567

Step 4 → A PAIRING CODE will appear on your screen
Step 5 → On Phone:    WhatsApp → Settings → Linked Devices
                      → Link a Device → Link with Phone Number
Step 6 → Type the code → ✅ Connected!
```

> 🔒 Your session is saved in MongoDB — no need to pair again after restart.

</details>

---

## ⚙️ Configuration

<details>
<summary>
  <b>&nbsp;🔧&nbsp; All settings in setting.js — click to expand</b>
</summary>

<br/>

```js
export default {
    //  ────────────────────────────────────────────────
    //  BASIC INFO
    //  ────────────────────────────────────────────────
    BOT_NAME:        "SHEHBAZ-MD",       // Bot name shown in messages
    OWNER_NAME:      "Shehbaz",          // Your name
    PREFIX:          ".",                 // Change command prefix: . / ! / #

    //  ────────────────────────────────────────────────
    //  MODE
    //  ────────────────────────────────────────────────
    MODE:            "public",
    //               "public"  = everyone can use commands
    //               "private" = only owner can use commands

    //  ────────────────────────────────────────────────
    //  AUTOMATIC FEATURES (true = ON, false = OFF)
    //  ────────────────────────────────────────────────
    AUTO_REACT:       "true",   // React with emoji to every message
    READ_MESSAGE:     "true",   // Auto-read messages (blue ticks)
    AUTO_STATUS_SEEN: "true",   // Auto-view WhatsApp statuses

    //  ────────────────────────────────────────────────
    //  PROTECTION FEATURES
    //  ────────────────────────────────────────────────
    ANTI_DELETE:      "true",   // Forward deleted messages to owner
    ANTI_CALL:        "true",   // Auto reject incoming calls
    ANTI_LINK:        "false",  // Remove links from groups (set true to enable)

    //  ────────────────────────────────────────────────
    //  AUTO REPLY  (for DMs only)
    //  ────────────────────────────────────────────────
    AUTO_REPLY:       "false",
    AUTO_REPLY_MSG:   "Hi! Bot is active. Please wait for owner.",
    AUTO_REPLY_DELAY: "60",     // Seconds before replying to same person again
}
```

</details>

---

## 🖥️ Free Hosting & Panels

> ✅ **Recommended for 24/7 running — no Termux needed!**

<details open>
<summary>
  <b>&nbsp;🆓&nbsp; Best Free Hosting Options — click to expand</b>
</summary>

<br/>

### ⭐ Option 1 — Railway (Best for Beginners)

| | |
|---|---|
| 🌐 Link | [railway.app](https://railway.app) |
| 💰 Cost | **Free** — $5 credit/month |
| ⏰ Uptime | 24/7 |
| 🚀 Deploy | Connect GitHub → 1 click deploy |
| ✅ Supports | Node.js, MongoDB (built-in) |

```
Steps:
1. Go to railway.app → Sign up with GitHub
2. New Project → Deploy from GitHub repo
3. Select SHEHBAZ-MD repo
4. Add Variables: MONGODB_URI, OWNER_NUMBER, PORT
5. Deploy → Done! ✅
```

---

### ⭐ Option 2 — Render

| | |
|---|---|
| 🌐 Link | [render.com](https://render.com) |
| 💰 Cost | **Free** tier available |
| ⏰ Uptime | 24/7 on paid / sleeps after 15min on free |
| ✅ Supports | Node.js, auto-deploy from GitHub |

```
Steps:
1. Go to render.com → Sign up
2. New → Web Service → Connect GitHub
3. Select repo → Runtime: Node
4. Start Command: node index.js
5. Add Environment Variables → Deploy ✅
```

---

### ⭐ Option 3 — Koyeb

| | |
|---|---|
| 🌐 Link | [koyeb.com](https://koyeb.com) |
| 💰 Cost | **Free** — always-on free tier |
| ⏰ Uptime | 24/7 |
| ✅ Supports | Node.js, Docker |

---

### ⭐ Option 4 — Okteto

| | |
|---|---|
| 🌐 Link | [cloud.okteto.com](https://cloud.okteto.com) |
| 💰 Cost | **Free** |
| ⏰ Uptime | 24/7 |
| ✅ Supports | Docker / Node.js |

---

### 💡 Option 5 — Free VPS (Bonus)

These give you a full Linux server — best for advanced users:

| Provider | Free Plan |
|---|---|
| [Oracle Cloud](https://cloud.oracle.com) | **Always Free** — 2 VMs, 24GB RAM total |
| [Google Cloud](https://cloud.google.com) | 90-day $300 free credit |
| [AWS EC2](https://aws.amazon.com) | 12 months free tier |
| [Hetzner](https://hetzner.com) | €20 free credit for new users |

**On any VPS (Ubuntu/Debian), install like this:**

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (keeps bot running 24/7)
npm install -g pm2

# Clone and run
git clone https://github.com/shehbaz-dev/SHEHBAZ-MD.git
cd SHEHBAZ-MD
npm install
cp .env.example .env
nano .env         # fill in your values

pm2 start index.js --name shehbaz-md
pm2 save
pm2 startup       # auto-start on server reboot
```

</details>

---

## 🔌 Add Your Own Plugin

<details>
<summary>
  <b>&nbsp;💻&nbsp; How to write a custom plugin — click to expand</b>
</summary>

<br/>

Create a new file: `plugins/myplugin.js`

```js
import { cmd } from '../lib/command.js';

cmd({
    pattern: 'hello',           // Command: .hello
    alias: ['hi'],              // Also works as: .hi
    desc: 'Greet someone',
    category: 'fun'
}, async (sock, msg, ctx) => {

    const { from, reply, args, isOwner, isGroup } = ctx;

    // Get what user typed after the command
    const name = args.join(' ') || 'there';

    reply(`👋 Hello, ${name}!`);

});
```

**Restart the bot after adding any new plugin.**

</details>

---

## 🐛 Troubleshooting

<details>
<summary><b>❌ Bot doesn't start</b></summary>

- Is `MONGODB_URI` correct in your `.env`?
- Is Node.js v20+? Run: `node --version`
- Check the error in your terminal

</details>

<details>
<summary><b>❌ Commands not working</b></summary>

- Are you using the right prefix? Default is `.`
- If MODE is `private`, only the owner can use commands
- Look for plugin load errors on startup

</details>

<details>
<summary><b>❌ Pairing code won't show</b></summary>

- Open `http://localhost:8000` in browser after starting bot
- Number format: `923001234567` ✅ — NOT `+923...` ❌
- Make sure port `8000` is not blocked by firewall

</details>

<details>
<summary><b>❌ Bot keeps disconnecting</b></summary>

- It auto-reconnects — wait a few seconds
- If on free hosting — use Railway or Koyeb for stable uptime
- Use `pm2` on VPS to keep it running forever

</details>

<details>
<summary><b>❌ Termux issues (npm install fails)</b></summary>

> ⚠️ **Termux is NOT supported.** Please use Railway, Render, or a free VPS instead.
>
> See [Free Hosting section](#%EF%B8%8F-free-hosting--panels) above.

</details>

---

## 🛠️ Built With

<div align="center">

<img src="https://skillicons.dev/icons?i=nodejs,mongodb,js,git,github,linux&theme=dark"/>

</div>

---

## 🤝 Contributing

Contributions are welcome! Fork → Branch → PR.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## 💬 Support

<div align="center">

| | |
|---|:---:|
| 💬 **WhatsApp** | [![Chat](https://img.shields.io/badge/Join%20WhatsApp%20Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VbD4UbdCRs1mNQPRZt2F) |
| 🐛 **Bug Report** | [![Bug](https://img.shields.io/badge/Report%20a%20Bug-red?style=for-the-badge&logo=github&logoColor=white)](../../issues/new?template=bug_report.md) |
| 💡 **Feature Request** | [![Feature](https://img.shields.io/badge/Request%20Feature-blue?style=for-the-badge&logo=github&logoColor=white)](../../issues/new?template=feature_request.md) |

</div>

---

## 📜 License

Licensed under **[MIT](LICENSE)** — free to use, fork, and modify. Credit appreciated! 🙏

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=130&section=footer" width="100%"/>

**⭐ Star this repo if it helped you!**

Made with ❤️ by **[Shehbaz Dev](https://shehbaz-dev.vercel.app)**

> ⚡ *Powered by Shehbaz—Dev*

</div>
