const { html } = require('htm/preact')

const Category = ({ name, list }) => {
  return html`
    <h3>${name}</h3>
    <ul>
      ${list.map((item) => {
        return html`<li><a href=${item.path}>${item.title}</a></li>`
      })}
    </ul>
  `
}

const Content = ({ pages }) => {
  const categories = {}
  for (const page of pages) {
    const [x, y, category ] = page.path.split('/')
    if (!categories.hasOwnProperty(category)) categories[category] = []
    categories[category].push({ path: page.path.replace('.md', '.html'), title: page.title })
  }
  return html`
    ${ Object.entries(categories).map(([name, value]) => html`<${Category} name=${name} list=${value}/>`)}
  `
}

const App = ({ pages }) => {
  return html`
    <h1>bolo'bolo</h1>
    <p>Wir starten ein bolo in Cottbus. Bedient euch aus unseren Erfahrungen und tauscht euch mit der Welt aus.</p>
    <p>Unsere Utopie basiert auf dem Buch <a href="https://piratesparty.files.wordpress.com/2009/01/bolobolo.pdf">bolo'bolo</a> von Hans Widmer.</p>
    <h2>Inhalt</h2>
    <${Content} pages=${pages} />
    <h2>Kontakt</h2>
    <p>krispin (at) posteo.de</p>
    <p>Last Update: ${(new Date()).toISOString()}</p>
    <p>Quelltext: <a target="_blank" href="https://github.com/bolobolo-org/bolobolo-org.github.io">https://github.com/bolobolo-org/bolobolo-org.github.io</a></p>
  `
}

module.exports = App
