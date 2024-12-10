import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { bundledLanguages } from "shiki/langs";
import { bundledThemes } from "shiki/themes";
import type { SyntaxHighlighterFunctions } from "@asciidoctor/core";

const engine = createJavaScriptRegexEngine();
const langs = await Promise.all(
  Object.values(bundledLanguages).map((importFn) =>
    importFn().then((m) => m.default)
  ),
);
const themes = await Promise.all(
  Object.values(bundledThemes).map((importFn) =>
    importFn().then((m) => m.default)
  ),
);
const shiki = createHighlighterCoreSync({ themes, langs, engine });

const AsciidoctorShiki: SyntaxHighlighterFunctions = {
  initialize(_name, _backend, { document }) {
    this.options = { theme: "nord" };
    if (document.hasAttribute("shiki-theme")) {
      this.options.theme = document.getAttribute("shiki-theme");
    }
    this.super();
  },
  highlight(_node, content, lang) {
    return shiki.codeToHtml(content, { lang, ...this.options });
  },
  handlesHighlighting() {
    return true;
  },
};

export default AsciidoctorShiki;
