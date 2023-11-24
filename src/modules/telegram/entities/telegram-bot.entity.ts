import { IBot } from '../service/bot.service';
import { Context, Telegraf } from 'telegraf';

export type webHook = {
  domain: string;
  port: string;
};
export class TelegramBot implements IBot {
  private telegraf: Telegraf<Context<any>>;
  private webHook: string | null;

  async setWebHook(hook: string): Promise<void> {
    this.webHook = hook;
  }
  static async create(token: string) {
    const bot = new TelegramBot();
    bot.telegraf = new Telegraf(token);
    return bot;
  }
}

export const handlers = {
  async sayHello(ctx: Context) {
    ctx.reply('Hello World');
  },
};
