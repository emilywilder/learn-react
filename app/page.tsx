import Link from 'next/link'

interface AppItem {
  name: string,
  location: string
}

interface SectionItem {
  name: string,
  apps: AppItem[]
}

interface PartItem {
  name: string,
  sections: SectionItem[]
}

interface AppDBInterface {
  parts: PartItem[]
}

const APP_DB: AppDBInterface = require('./apps.json')

function AppItem( app: AppItem ) {
  return (
    <div className='app'>
      <Link href={app.location}>{app.name}</Link>
    </div>
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
      <div className='section'>
        { section.name }
      </div>
      <ol>
        { apps }
      </ol>
    </>
  )
}

function PartItem( part: PartItem ) {
    const sections = part.sections.map((section, count) => {
      return (
        <li key={count}>
          <SectionItem name={section.name} apps={section.apps} />
        </li>
      )
    })
    
    return (
      <main>
        <div className='part'>
          { part.name }
        </div>
        <ul>
          { sections }
        </ul>
      </main>
    )
  }

export default function Home() {
  const parts = APP_DB.parts.map((part, count) => {
    return (
      <li key={count}>
        <PartItem name={part.name} sections={part.sections} />
      </li>
    )
  })
  
  return (
    <main>
      <div className='title'>Emily's Learn-react repo</div>
      <ul>
        { parts }
      </ul>
    </main>
  )
}
