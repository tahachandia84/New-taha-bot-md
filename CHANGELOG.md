# 📅 Changelog

All notable changes to SHEHBAZ-MD are documented here.

---

## [v4.5.6] — 2025-06-03

### ✨ Added
- QR-less Phone Number Pairing System
- MongoDB Atlas cloud session storage
- Multi-session support (multiple WhatsApp numbers)
- Anti-Delete: forwards deleted messages to owner
- Anti-Call: auto-reject incoming calls
- Anti-Link: remove links in groups automatically
- Auto-React: react with emoji to messages
- Auto-Read: auto-read all incoming messages
- Auto-Reply: custom DM auto-reply with cooldown
- Auto-Status-Seen: automatically view statuses
- Owner broadcast to all groups
- Bot restart command

### 🔌 Plugins Added
- `tiktok.js` — TikTok video downloader (no watermark, buffer-based)
- `sticker.js` — Image/Video to WhatsApp sticker
- `group.js` — tagall, kick, promote, demote, hidetag, mute, grouplink
- `warn.js` — Warning system (3 warnings = auto kick)
- `tools.js` — calc, wiki, fancy text, weather, shorturl, getpp

### 🐛 Fixed
- TikTok download: switched from URL-based to buffer-based sending for reliability
- TikTok: use `play` (no watermark) instead of `wmplay` (with watermark)
- Args parsing: removed broken `ctx.q` reference
- Session reconnect: exponential backoff on disconnect

---

## [v4.0.0] — Initial Release

- Basic WhatsApp bot with Baileys
- File-based session storage
- Simple command system

---

> Format follows [Keep a Changelog](https://keepachangelog.com)
