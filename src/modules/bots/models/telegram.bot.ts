import { IBot } from '../service/bot.service';
import { Context, Telegraf } from 'telegraf';

export type webHook = {
  domain: string;
  port: string;
};
export class TelegramBot implements IBot {
  private telegraf: Telegraf<Context<any>>;
  private webHook: string | null;
  constructor(private token: string) {
    this.webHook = null;
  }
  async setWebHook(hook: string): Promise<void> {
    return;
  }
  static async create(token: string) {
    const bot = new TelegramBot(token);
    bot.telegraf = new Telegraf(token);
    return bot;
  }
}
