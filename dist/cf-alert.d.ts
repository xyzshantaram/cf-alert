declare function prompt(title: string): Promise<unknown>;
declare function message(text: string, title?: string, customLabel?: string): Promise<void>;
declare function confirm(): Promise<unknown>;
declare const _default: {
    prompt: typeof prompt;
    message: typeof message;
    confirm: typeof confirm;
};
export default _default;
