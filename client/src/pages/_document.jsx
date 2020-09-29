import React from 'react';

// script
const HeadScript = ({ pageScripts }) => (<>{pageScripts.map((script) => <script src={script}
                                                                                key={script}/>)}</>);

// style
const HeadStyle = ({ pageStyles }) => (
  <>
    {pageStyles.map((style) => (
      <link
        href={style}
        key={style}
        rel="stylesheet"
      />
    ))}
  </>
);

// store
const BodyStore = ({ store }) => {
  if (!store) return null;

  return (
    <script
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(store)}` }}
    />
  );
};

export default ({ App, Component, pageScripts, pageStyles, store }) => (
  <html>
  <head>
    <HeadScript pageScripts={pageScripts}/>
    <HeadStyle pageStyles={pageStyles}/>
  </head>
  <body>
  <div id="app-main">
    <App Component={Component} pageProps={store}/>
  </div>
  <BodyStore store={store}/>
  </body>
  </html>
);
