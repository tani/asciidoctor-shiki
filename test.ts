import Asciidoctor from "npm:@asciidoctor/core";
import AsciidoctorShiki from "./index.ts";
const asciidoctor = Asciidoctor();
asciidoctor.SyntaxHighlighter.register("shiki", AsciidoctorShiki);

const output = asciidoctor.convert(
  `
[source,ruby]
----
p "hello"
----
`,
  {
    attributes: {
      "source-highlighter": "shiki",
    },
  },
);
console.log(output);
