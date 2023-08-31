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
      <div key={count}>
        <AppItem name={app.name} location={app.location} />
      </div>
    )
  })

  return (
    <>
      <div className='section'>
        { section.name }
      </div>
      { apps }
    </>
  )
}

function PartItem( part: PartItem ) {
    const sections = part.sections.map((section, count) => {
      return (
        <div key={count}>
          <SectionItem name={section.name} apps={section.apps} />
        </div>
      )
    })
    
    return (
      <main>
        <div className='part'>
          { part.name }
        </div>
        { sections }
      </main>
    )
  }

export default function Home() {
  const parts = APP_DB.parts.map((part, count) => {
    return (
      <div key={count}>
        <PartItem name={part.name} sections={part.sections} />
      </div>
    )
  })
  
  return (
    <main>
      <div className='title'>Emily Learns React</div>
      { parts }
    </main>
  )
}
