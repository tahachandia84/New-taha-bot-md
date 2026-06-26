/**
 * TAHA BABU MD v4.5.6 - Cloud Engine
 * Edited by: Taha Babu (Fixed Render 24/7 Mode)
 */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs-extra";
import pino from "pino";
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
    useMultiFileAuthState
} = baileys;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const ownerNumbers = (process.env.OWNER_NUMBER || "923474771404").split(',');
const PREFIX = '.';

const activeSessions = new Map();
const messageCache = new Map(); 
const connectionMessageSent = new Map();

async function showUltimateBanner() {
    console.clear();
    console.log(chalk.cyan.bold(figlet.textSync('TAHA BABU', { font: 'ANSI Shadow' })));
    console.log(chalk.dim('═'.repeat(80)));
    console.log(chalk.white(`├ ✓ Version:        4.5.6 Cloud Engine`));
    console.log(chalk.white(`├ ✓ Storage:        Local Sessions`));
    console.log(chalk.white(`└ ✓ Status:         READY`));
    console.log(chalk.dim('═'.repeat(80)));
}

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

async function setupDirectories() {
    const dirs = ['temp', 'logs', 'sessions'];
    for (const dir of dirs) {
        await fs.ensureDir(path.join(__dirname, dir));
    }
}

function isOwner(number) {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    return ownerNumbers.some(owner => owner.replace(/[^0-9]/g, '') === cleanNumber);
}

// ===============================
// MAIN WHATSAPP CONNECTOR
// ===============================
export async function startSession(sessionNumber, customCreds = null) {
    const sessionFolder = path.join(__dirname, 'sessions', `SESSION_${sessionNumber}`);
    await fs.ensureDir(sessionFolder);
    
    const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
    
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
            console.log(chalk.green(`✅ Session +${sessionNumber} is ONLINE`));
            
            if (!connectionMessageSent.has(sessionNumber)) {
                connectionMessageSent.set(sessionNumber, Date.now());
                await delay(3000);
                const connectText = `✨ *TAHA BABU MD CONNECTED* ✨\n\nBot is now active 24/7 on Render cloud!`;
                await sock.sendMessage(`${sessionNumber}@s.whatsapp.net`, { text: connectText }).catch(() => {});
            }
        }
        
        if (connection === 'close') {
            activeSessions.delete(sessionNumber);
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            if (statusCode !== DisconnectReason.loggedOut) {
                console.log(chalk.yellow(`🔄 Reconnecting +${sessionNumber}...`));
                setTimeout(() => startSession(sessionNumber), 5000);
            } else {
                await fs.remove(sessionFolder).catch(() => {});
            }
        }
    });

    // Message Handler
    sock.ev.on('messages.upsert', async (msgUpdate) => {
        try {
            const msg = msgUpdate.messages[0];
            if (!msg || !msg.message || msg.key?.remoteJid === 'status@broadcast') return;

            const msgType = getContentType(msg.message);
            let body = '';
            if (msgType === 'conversation') body = msg.message.conversation || '';
            else if (msgType === 'extendedTextMessage') body = msg.message.extendedTextMessage?.text || '';

            const from = msg.key.remoteJid;
            const isCommand = body.startsWith(PREFIX);

            if (isCommand) {
                const cmdName = body.slice(PREFIX.length).split(' ')[0].toLowerCase();
                if (cmdName === 'ping') {
                    await sock.sendMessage(from, { text: 'Bot is Active! Speed: 0.45s' }, { quoted: msg });
                }
                if (cmdName === 'menu') {
                    await sock.sendMessage(from, { text: '👑 *TAHA BABU MD MENU* 👑\n\n.ping - Check Bot Speed' }, { quoted: msg });
                }
            }
        } catch (e) {}
    });
    
    return sock;
}

// ===============================
// WEB ROUTING (DIRECT INLINE HTML)
// ===============================
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TAHA BABU MD</title>
        <style>
            body { font-family: sans-serif; background: #0f172a; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { background: #1e293b; padding: 30px; border-radius: 12px; text-align: center; width: 100%; max-width: 400px; border: 1px solid #334155; }
            h2 { color: #38bdf8; margin: 0 0 10px 0; }
            input { width: 100%; padding: 12px; margin-bottom: 20px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: #fff; box-sizing: border-box; }
            button { width: 100%; padding: 12px; background: #38bdf8; border: none; color: #0f172a; font-weight: bold; border-radius: 6px; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>TAHA BABU MD</h2>
            <p>Paste your Session ID / Creds to activate the bot.</p>
            <form action="/" method="POST">
                <input type="text" name="session_id" placeholder="Paste Session ID..." required>
                <button type="submit">Connect Bot</button>
            </form>
        </div>
    </body>
    </html>
    `);
});

app.post("/", async (req, res) => {
    try {
        const { session_id } = req.body;
        if (!session_id) return res.status(400).json({ success: false, error: "Session ID required" });

        const cleanSessionId = session_id.includes("!") ? session_id.split("!")[1] : session_id;
        const credsJsonString = Buffer.from(cleanSessionId.trim(), 'base64').toString('utf-8');
        const creds = JSON.parse(credsJsonString);
        
        let userNumber = creds.me?.id ? creds.me.id.split(':')[0].split('@')[0] : null;
        if (!userNumber) return res.status(400).json({ success: false, error: "Invalid Session ID" });

        startSession(userNumber, creds).catch(console.error);
        return res.send("<h2>Taha Babu Bot Connected! Check your WhatsApp.</h2>");
    } catch (error) {
        return res.status(500).send("Error connecting bot: " + error.message);
    }
});

// ===============================
// START ENGINE
// ===============================
async function start() {
    await showUltimateBanner();
    await setupDirectories();
    
    app.listen(PORT, () => {
        console.log(chalk.green(`✓ Server live on port ${PORT}`));
    });
}

start().catch(console.error);
