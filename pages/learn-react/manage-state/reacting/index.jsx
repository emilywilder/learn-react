import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client'
import Script from 'next/script';

import index_html from './public/index.html'

export default function App() {
  useEffect(() =>  {
    if (document) {
        const root = createRoot(document.getElementById('__next'))
        root.render(
            <>
                <Script src="/script.js" />
                <div dangerouslySetInnerHTML={{__html: index_html}} />
            </>   
        )
    }
  }, [])
  
}