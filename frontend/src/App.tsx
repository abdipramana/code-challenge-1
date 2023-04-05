import {Link} from 'react-router-dom';
import React,{lazy, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Spinner from './components/Spinner';
import {Route, Routes} from 'react-router-dom';

//Note that by default LINCD apps are set up with support for SCSS (sass) and CSS Modules
//So any .scss file needs to be imported by itself
import './App.scss';
//and then the .scss.json file needs to be imported to access the class names (this file will be automatically generated)
import style from './App.scss.json';

//In React 18 you can use 'lazy' to import pages only when you need them.
//This will cause webpack to create multiple bundles, and the right one is automatically loaded
const Home = lazy(() => import('./pages/Home' /* webpackPrefetch: true */));

declare var window;
export default function App({
  assets = typeof window !== 'undefined' ? window['assetManifest'] : {},
  //on the frontend data will not be set yet, but it will be present in the initial HTML as a script tag with JSON-LD inside, with the ID: lincd_data
  //so here we read that back to the data variable, so that the rendering (of that same <script> tag) will be identical as the backend
  data = typeof document !== 'undefined' ? document.getElementById('lincd_data')?.innerText : null,
}) {
    return (
    <Html assets={assets} data={data} title="here - LINCD App">
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary FallbackComponent={Error}>
          <Content />
        </ErrorBoundary>
      </Suspense>
    </Html>
  );
}

function Content() {
  return (
    <Layout>
      <div className={style.content}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <Home />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Layout>
  );
}

function Error({error}) {
  return (
    <div className={style.error}>
      <h1>Application Error</h1>
      <pre>{error.stack}</pre>
    </div>
  );
}

function Layout({children}) {
  return (
    <main className={style.main}>
      <Header />
      {children}
    </main>
  );
}

function Header() {
  return (
    <header className={style.header}>
    </header>
  );
}

function Html({assets, data, children, title}) {
  return (
    <html lang="en">
      {globalThis.document?.head ? (
        <head dangerouslySetInnerHTML={{__html: document.head.innerHTML}} />
      ) : (
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href={assets['main.css']} />
          {assets['tailwind-cdn'] && <script src={assets['tailwind-cdn']}></script>}
          <title>{title}</title>
          <script id='lincd_data' type='application/ld+json' dangerouslySetInnerHTML={{__html: data}} />
        </head>
      )}
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`,
          }}
        />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assets)};`,
          }}
        />
      </body>
    </html>
  );
}
