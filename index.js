/**
 * TAHA BABU MD v4.5.6 - Ultimate WhatsApp Multi-Device Cloud Bot
 * Edited by: Taha Babu (Local Storage Mode)
 */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs-extra";
import pino from "pino";
import { createRequire } from "module";
import chalk from "chalk";
import figlet from "figlet";
import dotenv from "dotenv";

dotenv.config();

import * as baileys from '@whiskeysockets/baileys';

const {
    makeWASocket,
    DisconnectReason,
    getContentType,
    fetchLatestBaileysVersion,
    Browsers,
    delay,
    makeCacheableSignalKeyStore,
    downloadMediaMessage,
    useMultiFileAuthState, // Local authentication function
    proto
} = baileys;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

import config from './setting.js';
import pairRouter from './pair.js';
import sessionManager from './lib/sessionManager.js';
import commandRegistry from './lib/commandRegistry.js';

const PORT = process.env.PORT || 8000;
const ownerNumbers = (process.env.OWNER_NUMBER || "923474771404").split(',');
const PREFIX = config.PREFIX || '.';

const activeSessions = new Map();
const messageCache = new Map(); 
const connectionMessageSent = new Map();
const groupSettings = new Map();
const cooldownMap = new Map();

async function showUltimateBanner() {
    console.clear();
    console.log(chalk.cyan.bold(figlet.textSync('TAHA BABU', { font: 'ANSI Shadow' })));
    console.log(chalk.dim('═'.repeat(80)));
    console.log(chalk.white(`├ ${chalk.green('✓')} Version:        ${chalk.yellow('4.5.6 Cloud Engine')}`));
    console.log(chalk.white(`├ ${chalk.green('✓')} Storage:        ${chalk.cyan('Local Storage (JSON/Files)')}`));
    console.log(chalk.white(`├ ${chalk.green('✓')} Multi-Session: ${chalk.green('ACTIVE')}`));
    console.log(chalk.white(`└ ${chalk.green('✓')} Status:        ${chalk.green('READY')}`));
    console.log(chalk.dim('═'.repeat(80)));
    console.log();
}

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

async function setupDirectories() {
    // Session save karne ke liye 'sessions' folder lazmi banayein
    const dirs = ['lib', 'plugins', 'temp', 'logs', 'public', 'sessions'];
    for (const dir of dirs) {
        await fs.ensureDir(path.join(__dirname, dir));
    }
}

async function loadPlugins() {
    const pluginsDir = path.join(__dirname, 'plugins');
    await fs.ensureDir(pluginsDir);
    console.log(chalk.cyan(`📦 Plugins directory: ${pluginsDir}`));

    const files = (await fs.readdir(pluginsDir)).filter(f => f.endsWith('.js'));
    let loaded = 0, failed = 0;
    for (const file of files) {
        try {
            await import(`file://${path.join(pluginsDir, file)}`);
            loaded++;
        } catch (err) {
            console.error(chalk.red(`❌ Plugin load failed [${file}]:`), err.message);
            failed++;
        }
    }
    console.log(chalk.green(`✓ Loaded ${loaded} plugin(s)${failed ? chalk.red(`, ${failed} failed`) : ''}\n`));
}

function isOwner(number) {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    return ownerNumbers.some(owner => owner.replace(/[^0-9]/g, '') === cleanNumber);
}

// ===============================
// MAIN SESSION CONNECTOR (LOCAL FILE AUTH)
// ===============================
export async function startSession(sessionNumber, retryCount = 0, customCreds = null) {
    const maxRetries = 5;
    const sessionFolder = path.join(__dirname, 'sessions', `SESSION_${sessionNumber}`);
    await fs.ensureDir(sessionFolder);
    
    console.log(chalk.yellow(`🔌 Starting local session for +${sessionNumber}...`));
    
    const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
    
    // Agar pairRouter se new base64 data aaya ho to use inject karein
    if (customCreds && Object.keys(state.creds).length === 0) {
        Object.assign(state.creds, customCreds);
        await saveCreds();
    }
    
    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.windows("Chrome"),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
        },
        version,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 15000,
        emitOwnEvents: false
    });
    
    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'open') {
            activeSessions.set(sessionNumber, sock);
            sessionManager.register(sessionNumber, 'active');
            console.log(chalk.green(`✅ Session +${sessionNumber} is ONLINE`));

            const botNum = sock.user?.id?.split(':')[0].split('@')[0];
            if (botNum && !ownerNumbers.includes(botNum)) {
                ownerNumbers.push(botNum);
                console.log(chalk.cyan(`✓ Owner auto-set: +${botNum}`));
            }
            
            if (!connectionMessageSent.has(sessionNumber)) {
                connectionMessageSent.set(sessionNumber, Date.now());
                await delay(3000);
                const connectImg = config.MAIN_IMG || process.env.MAIN_IMG || 'https://files.catbox.moe/9126wm.png';
                const connectText =
`╭━━━〔 *TAHA BABU MD* 〕━━━┈⊷
┃
┃ ✅ *Bot Successfully Connected!*
┃
┃ 🤖 *Bot:* ${config.BOT_NAME || 'TAHA BABU-MD'}
┃ 📡 *Prefix:* [ ${PREFIX} ]
┃ 🌍 *Mode:* ${config.MODE === 'private' ? 'Private 🔐' : 'Public 🌍'}
┃ 👑 *Owner:* TAHA BABU
┃
┃ 🟢 Anti-Delete   🟢 Anti-Call
┃ 🟢 Auto-React    🟢 Auto-Read
┃
╰━━━━━━━━━━━━━━━━━━┈⊷

Type *${PREFIX}menu* for all commands
Type *${PREFIX}settings* for feature status

> ⚡ _Powered by Taha Babu_`;
                try {
                    await sock.sendMessage(`${sessionNumber}@s.whatsapp.net`, {
                        image: { url: connectImg },
                        caption: connectText
                    });
                } catch {
                    await sock.sendMessage(`${sessionNumber}@s.whatsapp.net`, {
                        text: connectText
                    }).catch(() => {});
                }
            }
        }
        
        if (connection === 'close') {
            activeSessions.delete(sessionNumber);
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            
            if (statusCode === DisconnectReason.loggedOut) {
                console.log(chalk.red(`🔴 Session +${sessionNumber} logged out`));
                sessionManager.register(sessionNumber, 'revoked');
                await fs.remove(sessionFolder).catch(() => {});
            } else {
                if (retryCount < maxRetries) {
                    const delayTime = Math.min(5000 * (retryCount + 1), 30000);
                    console.log(chalk.yellow(`🔄 Reconnecting +${sessionNumber} in ${delayTime/1000}s`));
                    setTimeout(() => startSession(sessionNumber, retryCount + 1), delayTime);
                } else {
                    console.log(chalk.red(`❌ Failed to reconnect +${sessionNumber}`));
                    sessionManager.register(sessionNumber, 'disconnected');
                }
            }
        }
    });

    const REACT_EMOJIS = ['❤️','🔥','😎','⚡','🎯','💫','✨','🌟','👑','💎','🚀','🎉'];
    const autoReplyTracker = new Map();

    // Anti-Call
    sock.ev.on('call', async (calls) => {
        for (const call of calls) {
            if (call.status !== 'offer') continue;
            const callerNum = call.from?.split('@')[0].split(':')[0];
            const isOwnerCaller = isOwner(callerNum);

            if (config.ANTI_CALL === 'true' && !isOwnerCaller) {
                await sock.rejectCall(call.id, call.from).catch(() => {});
                const arMsg = config.AUTO_REPLY === 'true' && config.AUTO_REPLY_MSG ? config.AUTO_REPLY_MSG : null;
                const callText = arMsg
                    ? `📵 *Auto-Reply* (missed call)\n\n${arMsg}`
                    : `📵 *TAHA BABU MD*\n\nCalls are not allowed!\nPlease send a message instead.`;

                await sock.sendMessage(call.from, { text: callText }).catch(() => {});
            }
        }
    });

    // Anti-Delete
    sock.ev.on('messages.update', async (updates) => {
        if (config.ANTI_DELETE !== 'true') return;
        for (const update of updates) {
            try {
                const { key, update: msgUpdate } = update;
                if (!key || key.remoteJid === 'status@broadcast') continue;

                const isRevoke = msgUpdate?.message?.protocolMessage?.type === 0 || msgUpdate?.messageStubType === 1;
                if (!isRevoke) continue;

                const cached = messageCache.get(key.id);
                if (!cached) continue;

                const ownerJid = `${ownerNumbers[0]}@s.whatsapp.net`;
                const from     = key.remoteJid;
                const deleter  = key.participant || key.remoteJid;
                const delNum   = deleter.split('@')[0].split(':')[0];
                const isGroup  = from.endsWith('@g.us');
                const location = isGroup ? `Group: ${from.split('@')[0]}` : 'DM';

                const header = `♻️ *Anti-Delete Alert*\n👤 *Deleted by:* @${delNum}\n📍 *From:* ${location}\n\n`;
                const msgType = getContentType(cached.message);

                if (msgType === 'conversation' || msgType === 'extendedTextMessage') {
                    const text = cached.message?.conversation || cached.message?.extendedTextMessage?.text || '';
                    await sock.sendMessage(ownerJid, { text: header + text, mentions: [deleter] }).catch(() => {});
                } else if (['imageMessage','videoMessage','audioMessage','stickerMessage','documentMessage'].includes(msgType)) {
                    try {
                        const buffer = await downloadMediaMessage(cached, 'buffer', {});
                        const mediaInfo = cached.message[msgType];

                        if (msgType === 'imageMessage') {
                            await sock.sendMessage(ownerJid, { image: buffer, caption: header + (mediaInfo.caption || '') });
                        } else if (msgType === 'videoMessage') {
                            await sock.sendMessage(ownerJid, { video: buffer, caption: header + (mediaInfo.caption || '') });
                        } else if (msgType === 'audioMessage') {
                            await sock.sendMessage(ownerJid, { audio: buffer, mimetype: mediaInfo.mimetype || 'audio/ogg; codecs=opus', ptt: mediaInfo.ptt || false });
                            await sock.sendMessage(ownerJid, { text: header + (mediaInfo.ptt ? '🎤 Voice Message' : '🎵 Audio') });
                        } else if (msgType === 'stickerMessage') {
                            await sock.sendMessage(ownerJid, { sticker: buffer });
                            await sock.sendMessage(ownerJid, { text: header + '🎴 Sticker' });
                        } else if (msgType === 'documentMessage') {
                            await sock.sendMessage(ownerJid, { document: buffer, mimetype: mediaInfo.mimetype || 'application/octet-stream', fileName: mediaInfo.fileName || 'file' });
                            await sock.sendMessage(ownerJid, { text: header + `📄 Document: ${mediaInfo.fileName || 'file'}` });
                        }
                    } catch (dlErr) {
                        await sock.sendMessage(ownerJid, { text: header + `[${msgType.replace('Message','')} — could not download]` }).catch(() => {});
                    }
                } else {
                    await sock.sendMessage(ownerJid, { text: header + `[${msgType || 'Unknown'}]` }).catch(() => {});
                }
            } catch (_) {}
        }
    });

    // Message Handler
    sock.ev.on('messages.upsert', async (msgUpdate) => {
        try {
            const msg = msgUpdate.messages[0];
            if (!msg || !msg.message) return;
            if (msg.key?.remoteJid === 'status@broadcast') {
                if (config.AUTO_STATUS_SEEN === 'true') {
                    await sock.readMessages([msg.key]).catch(() => {});
                }
                return;
            }

            const msgType = getContentType(msg.message);
            let body = '';
            if (msgType === 'conversation') body = msg.message.conversation || '';
            else if (msgType === 'extendedTextMessage') body = msg.message.extendedTextMessage?.text || '';
            else if (msgType === 'imageMessage') body = msg.message.imageMessage?.caption || '';
            else if (msgType === 'videoMessage') body = msg.message.videoMessage?.caption || '';

            const from = msg.key.remoteJid;
            const sender = msg.key.participant || msg.key.remoteJid;
            const senderNumber = sender.split('@')[0].split(':')[0];
            const isGroup = from.endsWith('@g.us');
            const botOwnNum = sock.user?.id?.split('@')[0].split(':')[0];
            const isOwnerNumber = isOwner(senderNumber) || (botOwnNum && senderNumber === botOwnNum);
            const isBot = botOwnNum && senderNumber === botOwnNum && msg.key.fromMe;

            if (msg.key?.id && !isBot) {
                messageCache.set(msg.key.id, msg);
                if (messageCache.size > 200) {
                    const firstKey = messageCache.keys().next().value;
                    messageCache.delete(firstKey);
                }
            }

            if (config.READ_MESSAGE === 'true' && !isBot) {
                await sock.readMessages([msg.key]).catch(() => {});
            }

            const isCommand = body.startsWith(PREFIX);

            if (config.AUTO_REACT === 'true' && !isBot && !isCommand && !msg.key.fromMe && msgType !== 'protocolMessage' && msgType !== 'senderKeyDistributionMessage') {
                const emoji = REACT_EMOJIS[Math.floor(Math.random() * REACT_EMOJIS.length)];
                await sock.sendMessage(from, { react: { text: emoji, key: msg.key } }).catch(() => {});
            }

            if (config.ANTI_LINK === 'true' && isGroup && !isOwnerNumber && body) {
                const linkRegex = /(https?:\/\/|www\.|chat\.whatsapp\.com)[^\s]*/i;
                if (linkRegex.test(body)) {
                    await sock.sendMessage(from, { delete: msg.key }).catch(() => {});
                    await sock.sendMessage(from, { text: `⚠️ @${senderNumber} Links are not allowed in this group!`, mentions: [sender] }).catch(() => {});
                    return;
                }
            }

            if (config.AUTO_REPLY === 'true' && config.AUTO_REPLY_MSG && !isGroup && !isOwnerNumber && !msg.key.fromMe && !isCommand) {
                const cooldown = parseInt(config.AUTO_REPLY_DELAY || '60') * 1000;
                const lastSent = autoReplyTracker.get(senderNumber) || 0;
                if (Date.now() - lastSent > cooldown) {
                    autoReplyTracker.set(senderNumber, Date.now());
                    await sock.sendMessage(from, { text: config.AUTO_REPLY_MSG }, { quoted: msg }).catch(() => {});
                }
            }

            if (!isCommand) return;
            if (config.MODE === 'private' && !isOwnerNumber && !isBot) return;

            const cmdName = body.slice(PREFIX.length).split(' ')[0].toLowerCase();
            const args = body.slice(PREFIX.length + cmdName.length).trim().split(/\s+/);
            const cmdArgs = args.filter(a => a);

            const command = commandRegistry.get(cmdName);
            if (command) {
                try {
                    await command.execute(sock, msg, {
                        from,
                        reply: (text) => sock.sendMessage(from, { text }, { quoted: msg }),
                        isGroup,
                        isOwner: isOwnerNumber,
                        sender: senderNumber,
                        args: cmdArgs,
                        prefix: PREFIX,
                        command: cmdName
                    });
                } catch (err) {
                    console.error(`Command Error (${cmdName}):`, err);
                    await sock.sendMessage(from, { text: `❌ Command error: ${err.message}` }, { quoted: msg }).catch(() => {});
                }
            }
        } catch (error) {
            console.error('Message Handler Error:', error);
        }
    });
    
    return sock;
}

// ===============================
// LOAD ALL LOCAL SESSIONS
// ===============================
async function loadAllSessions() {
    try {
        const sessionsFolder = path.join(__dirname, 'sessions');
        const items = await fs.readdir(sessionsFolder);
        
        const activeNumbers = items
            .filter(item => item.startsWith('SESSION_'))
            .map(item => item.replace('SESSION_', ''))
            .filter(Boolean);
        
        console.log(chalk.cyan(`\n📱 Found ${activeNumbers.length} local saved sessions\n`));
        
        for (const number of activeNumbers) {
            console.log(chalk.yellow(`⚙️ Loading local session: +${number}`));
            sessionManager.register(number, 'pending');
            startSession(number).catch(err => console.error(`Failed to start +${number}:`, err.message));
            await delay(2000);
        }
    } catch (e) {
        console.error(chalk.red("❌ Failed to load local sessions:"), e.message);
    }
}

// ===============================
// WEB ROUTING
// ===============================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pair.html"));
});

// FIXED POST ROUTE: Bina MongoDB ke credentials file directory me save karega
app.post("/", async (req, res) => {
    try {
        const { session_id } = req.body;
        console.log(chalk.yellow("📥 Received session submission..."));
        
        if (!session_id) {
            return res.status(400).json({ success: false, error: "Session ID required" });
        }
        
        if (!session_id.startsWith("Shehbaz-MD!") && !session_id.startsWith("Taha-Babu!")) {
            // Dono formates ko accept karega security bypass ke liye
        }

        const cleanSessionId = session_id.includes("!") ? session_id.split("!")[1] : session_id;
        const credsJsonString = Buffer.from(cleanSessionId.trim(), 'base64').toString('utf-8');
        
        let creds;
        try {
            creds = JSON.parse(credsJsonString);
            console.log(chalk.green("✓ Creds parsed successfully"));
        } catch (parseErr) {
            console.error("Parse Error:", parseErr);
            return res.status(400).json({ success: false, error: "Invalid session data" });
        }
        
        let userNumber = null;
        if (creds.me?.id) {
            userNumber = creds.me.id.split(':')[0].split('@')[0];
        } else if (creds.account?.details?.me?.id) {
            userNumber = creds.account.details.me.id.split(':')[0].split('@')[0];
        }

        if (!userNumber) {
            console.error(chalk.red("❌ Could not extract user number"));
            return res.status(400).json({ success: false, error: "Failed to extract user number" });
        }

        console.log(chalk.green(`✓ User: +${userNumber}`));

        if (activeSessions.has(userNumber)) {
            console.log(chalk.yellow(`🔄 Old session found for +${userNumber}, disconnecting...`));
            try {
                const oldSock = activeSessions.get(userNumber);
                oldSock.end();
            } catch (_) {}
            activeSessions.delete(userNumber);
            connectionMessageSent.delete(userNumber);
            await delay(3000);
        }

        await sessionManager.register(userNumber, 'pending');

        // Start session directly with custom parsed creds
        startSession(userNumber, 0, creds).catch(err => console.error(err));

        return res.json({ success: true, message: `Session stored locally! Bot will connect as +${userNumber}` });
        
    } catch (error) {
        console.error(chalk.red("❌ Error:"), error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.use("/pair", pairRouter);

app.get("/api/sessions", (req, res) => {
    const sessions = sessionManager.getAll().map(s => ({
        number: s.number,
        status: s.status,
        isActive: activeSessions.has(s.number)
    }));
    res.json({ success: true, sessions });
});

app.get("/api/stats", (req, res) => {
    res.json({
        success: true,
        sessions: activeSessions.size,
        uptime: process.uptime()
    });
});

// ===============================
// START APPLICATION
// ===============================
async function start() {
    await showUltimateBanner();
    await setupDirectories();
    await loadPlugins();
    // MongoDB references completely removed from server startup
    try { await sessionManager.load(); } catch (e) {}
    await loadAllSessions();
    
    app.listen(PORT, () => {
        console.log(chalk.green(`\n✓ Server on port ${PORT}`));
        console.log(chalk.cyan(`✓ Pairing Dashboard Ready`));
        console.log(chalk.white.bold(`\n⚡ TAHA BABU MD ACTIVE! ⚡\n`));
    });
}

process.on('SIGINT', async () => {
    for (const [num, sock] of activeSessions.entries()) { sock.end(); }
    process.exit(0);
});

start().catch(console.error);

export default app;
