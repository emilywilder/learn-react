import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client'
import Script from 'next/script';

import index_html from './public/challenge3.html'

export default function App() {
    useEffect(() =>  {
      if (document) {
          const root = createRoot(document.getElementById('__next'))
          root.render(
              <>
                  <Script src="/manage-state-reacting-challenge3.js" />
                  <div dangerouslySetInnerHTML={{__html: index_html}} />
              </>   
          )
      }
    }, []) 
  }