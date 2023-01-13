const { Telegraf, Markup 
} = require('telegraf');

require('dotenv').config()

const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Панда'}!`))
bot.help((ctx) => ctx.reply(text.commands));

bot.command('dates', async (ctx) => {
    try {
   await ctx.replyWithHTML('<b>Сроки годности</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Заморозка', 'btn_1')],
            [Markup.button.callback('Сухач(лапша и пр.)', 'btn_2')],
            [Markup.button.callback('Напитки(лимонады,морс)', 'btn_3')],
            [Markup.button.callback('Молочка', 'btn_4')],
            [Markup.button.callback('Колбасы','btn_5')],
            [Markup.button.callback('Сыры','btn_6')]

        ]
    ))
    } catch(e) {
        console.error(e)
    }
})

bot.command('out', async (ctx) =>{
    try{
        await ctx.replyWithHTML('<b>Позиции с подходящими сроками</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Список планируемого списания', 'btn_7')]
            ]
        ))
        
    } catch (e) {
        console.error(e)
    }
})

function addActionBot(name,src, text) {
    bot.action(name, async (ctx) => 
{
    try{
        await ctx.answerCbQuery()
        if(src !== false) {
            await ctx.replyWithPhoto({
                source: src
            })
        }
      await  ctx.replyWithHTML(text,{
            disable_web_page_preview: true
        })

    } catch(e){
        console.error(e)
    }
})

}

addActionBot('btn_1', false, text.text1 )
addActionBot('btn_2', false, text.text2 )
addActionBot('btn_3', false, text.text3)
addActionBot('btn_4', false, text.text4)
addActionBot('btn_5', false, text.text5)
addActionBot('btn_6', false, text.text6)
addActionBot('btn_7', false, text.text7)




bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
