/**
 * @intro: document.
 */
import React from 'react';

// script
const HeadScript = ({ scripts }) => (<>{scripts.map((js) => <script src={js} key={js} />)}</>);

// style
const HeadStyle = ({ styles }) => (<>{styles.map((css) => <link href={css} key={css} rel="stylesheet" />)}</>);

// store
const BodyStore = ({ store }) => {
  if (!store) return null;

  return (
    <script
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${JSON.stringify(store)}`}}
    />
  );
};

export default ({
  children, store, js, css
}) => (
  <html>
    <HeadScript scripts={js} />
    <HeadStyle styles={css} />
    <body>
      <div id="app-main">{children}</div>
      <BodyStore store={store} />
    </body>
  </html>
);
