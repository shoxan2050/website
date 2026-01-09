
// telegram-logger.js
const BOT_TOKEN = "7925045037:AAGddaCRkkHFB2tfN5wW46ZZ7rrAvQciWAQ";
const CHAT_ID = "7979995418";

/**
 * Sends a message to the Telegram bot.
 * @param {string} message - The message to send.
 */
export async function logToTelegram(message) {
    const timestamp = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
    const formattedMessage = `[${timestamp}]\n${message}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: formattedMessage,
                parse_mode: 'HTML'
            })
        });
    } catch (error) {
        console.error('Telegram logging failed:', error);
    }
}

/**
 * Initializes global error catching and logs it to Telegram.
 */
export function initConsoleErrorLogging() {
    const originalConsoleError = console.error;

    console.error = function (...args) {
        const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
        logToTelegram(`<b>❌ Console Error:</b>\n<code>${message}</code>`);
        originalConsoleError.apply(console, args);
    };

    window.onerror = function (message, source, lineno, colno, error) {
        const errorMsg = `<b>❌ Runtime Error:</b>\nMessage: ${message}\nSource: ${source}\nLine: ${lineno}:${colno}`;
        logToTelegram(errorMsg);
        return false;
    };

    window.onunhandledrejection = function (event) {
        logToTelegram(`<b>❌ Unhandled Rejection:</b>\n<code>${event.reason}</code>`);
    };

    logToTelegram("<b>🚀 Logger Initialized</b> on " + window.location.pathname);
}
