const asciidoctor = require('@asciidoctor/core')()
const AsciidoctorShiki = require('.')
asciidoctor.SyntaxHighlighter.register('shiki', AsciidoctorShiki)

const output = asciidoctor.convert(`
[source,ruby]
----
p "hello"
----
`, {
  attributes: {
    'source-highlighter': 'shiki'
  }
})
console.log(output)
