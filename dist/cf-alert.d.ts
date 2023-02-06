declare function message(text: string, title?: string, customLabel?: string, safeBody?: boolean): Promise<void>;
declare function input(type: string, text: string, title?: string, safeBody?: boolean): Promise<unknown>;
interface CustomLabels {
    yes?: string;
    no?: string;
}
declare function confirm(text: string, customLabels: CustomLabels, title?: string, safeBody?: boolean): Promise<unknown>;
declare const _default: {
    input: typeof input;
    message: typeof message;
    confirm: typeof confirm;
};
export default _default;
