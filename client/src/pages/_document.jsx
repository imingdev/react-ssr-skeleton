import React from 'react';

// script
const HeadScript = ({ pageScripts }) => (
  <>
    {pageScripts.map((script) => (
      <script
        src={script}
        key={script}
        type="text/javascript"
        defer
      />
    ))}
  </>
);

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
      type="text/javascript"
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(store)}` }}
    />
  );
};

export default ({
  App, Component, pageScripts, pageStyles, store
}) => (
  <html>
    <head>
      <HeadStyle pageStyles={pageStyles} />
    </head>
    <body>
      <div id="app-main">
        <App Component={Component} pageProps={store} />
      </div>
      <BodyStore store={store} />
      <HeadScript pageScripts={pageScripts} />
    </body>
  </html>
);
