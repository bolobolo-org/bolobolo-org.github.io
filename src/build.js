const { promises: fs } = require("fs");
const { html } = require('htm/preact')
const showdown  = require('showdown')
const render = require('preact-render-to-string')
const Index = require('./Index.js')

const converter = new showdown.Converter()

async function getFiles(path = "./") {
  const entries = await fs.readdir(path, { withFileTypes: true });
  // Get files within the current directory and add a path key to the file objects
  const files = entries
      .filter((file) => {
        return !file.isDirectory() && file.name.endsWith('.md')
      })
      .map(file => ({ ...file, path: path + file.name }));
  // Get folders within the current directory
  const folders = entries.filter(folder => folder.isDirectory());
  for (const folder of folders)
      /*
        Add the found files within the subdirectory to the files array by calling the
        current function itself
      */
      files.push(...await getFiles(`${path}${folder.name}/`));
  return files;
}

async function main () {
  const styles = `<style>${(await fs.readFile('./css/main.css')).toString()}</style>`
  const files = await getFiles('./pages/')
  for (const file of files) {
    const md = (await fs.readFile(file.path)).toString()
    // use heading in md as page title:
    file.title = md.split('\n')[0].split('#')[1].trim()
    const page = styles + converter.makeHtml(md)
    await fs.writeFile(file.path.replace('.md', '.html'), page)
  }
  // console.log(files)
  const website = `<!DOCTYPE html>${render(html`<${Index} page="index" pages=${files} />`)}`
  console.log(website)
}

main()