import Link from 'next/link'

interface AppItem {
  name: string,
  location: string
}

interface SectionItem {
  name: string,
  apps: AppItem[]
}

interface SectionsInterface {
  sections: SectionItem[]
}

const APP_DB: SectionsInterface = require('./apps.json')

function AppItem( app: AppItem ) {
  return (
      <Link href={app.location}>{app.name}</Link>
  )
}

function SectionItem( section: SectionItem ) {
  const apps = section.apps.map((app, count) => {
    return (
      <li key={count}>
        <AppItem name={app.name} location={app.location} />
      </li>
    )
  })

  return (
    <>
      <p>
        { section.name }
      </p>
      <ol>
        { apps }
      </ol>
    </>
  )
}

export default function Home() {
  const sections = APP_DB.sections.map((section, count) => {
    return (
      <li key={count}>
        <SectionItem name={section.name} apps={section.apps} />
      </li>
    )
  })
  
  return (
    <main>
      <h1>Emily's Learn-react repo</h1>
      <ul>
        { sections }
      </ul>
    </main>
  )
}
