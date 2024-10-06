export interface IBot {
  setWebHook(hook: string): Promise<void>;
  handleMessage(data: any): Promise<any>;
}
