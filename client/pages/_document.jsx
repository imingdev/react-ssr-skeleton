/**
 * @intro: document.
 */
import React from 'react'

export default ({children, state, js, css}) => {
  return (
    <html>
    <head dangerouslySetInnerHTML={{__html: js.concat(css).map(row=>{
        if(/\.js$/.test(row))return `<script src="${row}"></script>`
        return `<link href="${row}" rel=stylesheet>`
      }).join('')}}>
    </head>
    <body>
    <div id="app-main">{children}</div>
    <script dangerouslySetInnerHTML={{__html: `window.__STATE__INIT__=${JSON.stringify(state)}`}}>
    </script>
    </body>
    </html>
  )
}
