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
    <div className="flex p-2 pl-5 hover:bg-gradient-to-r from-tiffany-blue hover:text-white shadow-md rounded">
      <div className='flex-none w-10 react-logo'>
        <img src='/react.svg' width='24em' />
      </div>
      <div className='flex-auto'>
        <Link href={app.location}>{app.name}</Link>
      </div>
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
      <div className='p-1'>
        { section.name }
      </div>
      <div className='p-2 space-y-3'>
        { apps }
      </div>
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
        <div className='p-3'>
          <div className='font-bold border-b'>
            { part.name }  
          </div>
          { sections }
        </div>
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
      <div className='p-3 shadow font-sans font-thin text-3xl bg-tiffany-blue text-white'>
        Emily Learns React
      </div>
      <div>
        { parts }
      </div>
    </main>
  )
}
