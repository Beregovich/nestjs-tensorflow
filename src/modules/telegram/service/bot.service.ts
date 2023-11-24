export interface IBot {
  setWebHook(hook: string): Promise<void>;
}
