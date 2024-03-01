const fs = require("fs/promises")
const path = require("path")

const apps_file = "app/apps.json"

fs.readFile(apps_file, "utf8").then((_data) => {
    const data = JSON.parse(_data)
    data.parts.forEach((part) => {
        part.sections.forEach((section) => {
            section.apps.forEach((app) => {
                const page_dir = path.join("pages", app.location)
                const index_dir = path.join("@", "modules", app.location)
                try {
                    console.log(`Creating ${page_dir}...`)
                    fs.mkdir(page_dir, { recursive: true }).then(() => {
                        const content = `import App from "${index_dir}"\nexport default App\n`
                        console.log(`Writing index for ${page_dir}...`)
                        fs.writeFile(path.join(page_dir, "index.jsx"), content)
                    })
                } catch (err) {
                    console.error(err)
                }
            })
        })
    })
})
