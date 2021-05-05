import { Marked, Renderer } from "@ts-stack/markdown";

export type IPlugin = (
  code: string,
  escaped?: boolean,
  meta?: string
) => string;

type IMarkdownRendererClass = typeof MarkdownRenderer;

export class MarkdownRenderer extends Renderer {
  private static plugins: Record<string, IPlugin> = {};

  static getPlugins() {
    return this.plugins;
  }
  static getPlugin(pluginName: string): IPlugin | undefined {
    return this.plugins[pluginName];
  }
  static addPlugin(pluginName: string, plugin: IPlugin) {
    this.plugins[pluginName] = plugin;
    return this;
  }
  static removePlugin(pluginName: string) {
    delete this.plugins[pluginName];
    return this;
  }

  getClass(): IMarkdownRendererClass {
    return Object.getPrototypeOf(this).constructor;
  }

  getPlugins(): Record<string, IPlugin> {
    return this.getClass().getPlugins();
  }
  getPlugin(pluginName: string): IPlugin | undefined {
    return this.getClass().getPlugin(pluginName);
  }
  addPlugin(pluginName: string, plugin: IPlugin) {
    this.getClass().addPlugin(pluginName, plugin);
    return this;
  }
  removePlugin(pluginName: string) {
    this.getClass().removePlugin(pluginName);
    return this;
  }

  code(code: string, lang?: string, escaped?: boolean, meta?: string): string {
    const plugin = lang ? this.getPlugin(lang) : undefined;

    if (plugin) {
      return plugin(code, escaped, meta);
    } else {
      return super.code(code, lang, escaped, meta);
    }
  }
}

Marked.setOptions({ renderer: new MarkdownRenderer() });

export function addPlugin(pluginName: string, plugin: IPlugin) {
  MarkdownRenderer.addPlugin(pluginName, plugin);
}

export function removePlugin(pluginName: string) {
  MarkdownRenderer.removePlugin(pluginName);
}

export function markdown(text: string): string {
  return Marked.parse(text);
}
