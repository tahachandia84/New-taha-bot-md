import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';
import pino from 'pino';
import chalk from 'chalk';
import figlet from 'figlet';
import dotenv from 'dotenv';
import https from 'https'; // Render ko 24/7 jagaye rakhne ke liye

// Route and Manager Imports
import pairRouter from './pair.js';
import sessionManager from './lib/sessionManager.js';

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
    console.log(chalk.white(`├ ✓ Version:        4.5.6 Cloud Engine (POWERFUL)`));
    console.log(chalk.white(`├ ✓ Storage:        Local Sessions`));
    console.log(chalk.white(`└ ✓ Status:         24/7 ANTI-CRASH ACTIVE`));
    console.log(chalk.dim('═'.repeat(80)));
}

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Integrate your pair logic routes
app.use('/pair', pairRouter);

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

// ==========================================
// POWERFUL 24/7 SELF-PING ENGINE (ANTI-SLEEP)
// ==========================================
function keepAlive(url) {
    if (!url) return;
    setInterval(() => {
        https.get(url, (res) => {
            console.log(chalk.dim(`[Self-Ping] Server auto-wake status: ${res.statusCode}`));
        }).on('error', (err) => {
            console.log(chalk.red(`[Self-Ping Error]: ${err.message}`));
        });
    }, 5 * 60 * 1000); // Har 5 minute baad server ko ping karega taaki sleep na ho
}

// Main Whatsapp connection entry
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
        keepAliveIntervalMs: 30000, // Connection active rakhne ke liye
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
                const connectText = `✨ *TAHA BABU MD IS LIVE* ✨\n\nCloud Engine optimization is fully complete! 🚀\n\n*Status:* 24/7 Online Mode Active`;
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
                    await sock.sendMessage(from, { text: '⚡ *TAHA BABU MD* is ultra fast and active!' }, { quoted: msg });
                }
            }
        } catch (e) {}
    });
    
    return sock;
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pair.html"));
});

async function start() {
    await showUltimateBanner();
    await setupDirectories();
    
    app.listen(PORT, () => {
        console.log(chalk.green(`✓ Server live on port ${PORT}`));
        
        // Render ka URL yahan auto-ping engine me connect ho jayega
        if (process.env.RENDER_EXTERNAL_URL) {
            keepAlive(process.env.RENDER_EXTERNAL_URL);
        }
    });
}

// ==========================================
// ANTI-CRASH GUARD (Server ko crash nahi hone dega)
// ==========================================
process.on('unhandledRejection', (reason, p) => {
    console.log(chalk.red('[Anti-Crash] Caught Rejection: '), reason);
});
process.on('uncaughtException', (err, origin) => {
    console.log(chalk.red('[Anti-Crash] Caught Exception: '), err);
});

start().catch(console.error);
