import { Renderer } from "@ts-stack/markdown";
export declare type IPlugin = (code: string, escaped?: boolean, meta?: string) => string;
declare type IMarkdownRendererClass = typeof MarkdownRenderer;
export declare class MarkdownRenderer extends Renderer {
    private static plugins;
    static getPlugins(): Record<string, IPlugin>;
    static getPlugin(pluginName: string): IPlugin | undefined;
    static addPlugin(pluginName: string, plugin: IPlugin): typeof MarkdownRenderer;
    static removePlugin(pluginName: string): typeof MarkdownRenderer;
    getClass(): IMarkdownRendererClass;
    getPlugins(): Record<string, IPlugin>;
    getPlugin(pluginName: string): IPlugin | undefined;
    addPlugin(pluginName: string, plugin: IPlugin): this;
    removePlugin(pluginName: string): this;
    code(code: string, lang?: string, escaped?: boolean, meta?: string): string;
}
export declare function addPlugin(pluginName: string, plugin: IPlugin): void;
export declare function removePlugin(pluginName: string): void;
export declare function markdown(text: string): string;
export {};
