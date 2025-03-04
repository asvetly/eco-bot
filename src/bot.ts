import { Markup, Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_TOKEN ?? '';

const bot = new Telegraf(token);

bot.start((ctx) => {
    ctx.reply('Привет,  ' + ctx.from.first_name + '!');
});

bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});

bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id);
    
    // Using context shortcut
    ctx.leaveChat();
});

// bot.on('text', (ctx) => {
//     // Explicit usage
//     ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);
    
//     // Using context shortcut
//     ctx.reply(`Hello ${ctx.state.role}`);
// });

bot.command('keyboard', (ctx) => {
    ctx.reply(
        'Keyboard',
        Markup.inlineKeyboard([
            Markup.button.callback('First option', 'first'),
            Markup.button.callback('Second option', 'second'),
        ]),
    );
});
    
bot.action('first', ctx => {
    ctx.reply('First button is pressed');
});

bot.action('second', ctx => {
    ctx.reply('Second button is pressed');
});

// bot.on('callback_query', (ctx) => {
//     // Explicit usage
//     ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

//     // Using context shortcut
//     // ctx.answerCbQuery();
// });

bot.on('inline_query', (ctx) => {
    const result = [];
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);
    
    // Using context shortcut
    // ctx.answerInlineQuery(result);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export default bot;