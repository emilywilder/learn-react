import Link from 'next/link'

interface AppItem {
  name: string,
  location: string
}

const APPS: AppItem[] = [
  { name: 'Tic-Tac-Toe', location: '/ttt' }
]

function AppItem( app: AppItem ) {
  return (
      <Link href={app.location}>{app.name}</Link>
  )
}

export default function Home() {
  const appList = APPS.map((app, count) => {
    return (
      <li key={count}>
        <AppItem name={app.name} location={app.location} />
      </li>
    )
  })
  
  return (
    <main>
      <h1>Emily's Learn-react repo</h1>
      <ol>
        {appList}
      </ol>
    </main>
  )
}
