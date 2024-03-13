import { readFile, mkdir, writeFile } from "fs/promises"
import { join } from "path"

const apps_file = "app/apps.json"

async function makePages() {
    const apps_data_raw = await readFile(apps_file, "utf8")
    const apps_data = JSON.parse(apps_data_raw)
    for (const part of apps_data.parts) {
        for (const section of part.sections) {
            for (const app of section.apps) {
                const page_dir = join("pages", app.location)
                console.log(`Creating ${page_dir}...`)
                await mkdir(page_dir, { recursive: true })
                const index_dir = join("@", "modules", app.location)
                const content = `import App from "${index_dir}"\nexport default App\n`
                console.log(`Writing index for ${page_dir}...`)
                await writeFile(join(page_dir, "index.jsx"), content)
            }
        }
    }
}

try {
    makePages()
} catch (err) {
    console.error(err)
}
