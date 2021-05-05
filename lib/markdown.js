"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdown = exports.removePlugin = exports.addPlugin = exports.MarkdownRenderer = void 0;
const markdown_1 = require("@ts-stack/markdown");
class MarkdownRenderer extends markdown_1.Renderer {
    static getPlugins() {
        return this.plugins;
    }
    static getPlugin(pluginName) {
        return this.plugins[pluginName];
    }
    static addPlugin(pluginName, plugin) {
        this.plugins[pluginName] = plugin;
        return this;
    }
    static removePlugin(pluginName) {
        delete this.plugins[pluginName];
        return this;
    }
    getClass() {
        return Object.getPrototypeOf(this).constructor;
    }
    getPlugins() {
        return this.getClass().getPlugins();
    }
    getPlugin(pluginName) {
        return this.getClass().getPlugin(pluginName);
    }
    addPlugin(pluginName, plugin) {
        this.getClass().addPlugin(pluginName, plugin);
        return this;
    }
    removePlugin(pluginName) {
        this.getClass().removePlugin(pluginName);
        return this;
    }
    code(code, lang, escaped, meta) {
        const plugin = lang ? this.getPlugin(lang) : undefined;
        if (plugin) {
            return plugin(code, escaped, meta);
        }
        else {
            return super.code(code, lang, escaped, meta);
        }
    }
}
exports.MarkdownRenderer = MarkdownRenderer;
MarkdownRenderer.plugins = {};
markdown_1.Marked.setOptions({ renderer: new MarkdownRenderer() });
function addPlugin(pluginName, plugin) {
    MarkdownRenderer.addPlugin(pluginName, plugin);
}
exports.addPlugin = addPlugin;
function removePlugin(pluginName) {
    MarkdownRenderer.removePlugin(pluginName);
}
exports.removePlugin = removePlugin;
function markdown(text) {
    return markdown_1.Marked.parse(text);
}
exports.markdown = markdown;
