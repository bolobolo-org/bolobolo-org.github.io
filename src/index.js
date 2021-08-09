const { html } = require('htm/preact')
const App = require('./App.js')

const Index = ({ pages }) => {
  return html`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>bolo'bolo</title>
        <link rel="stylesheet" type="text/css" href="css/main.css" media="screen" />
      </head>
      <body>
        <${App} page="index" pages=${pages} />
      </body>
    </html>
  `
}

module.exports = Index