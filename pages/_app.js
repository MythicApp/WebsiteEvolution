import Head from 'next/head';
import Footer from '@/components/common/Footer';
import Header from '@/components//common/Header';
import Site from '@/components/common/Site';
import '@/styles/globals.css';
import config from '@/data/config';

function App({ Component, pageProps, router }) {
  const { pathname, asPath } = router ?? {};
  const defaultPageData = config.pages['/'];
  const pageData = config.pages[pathname] ?? config.pages['/'];
  const isDefault = defaultPageData === pageData;
  const title = isDefault
    ? `${config.title} | The best way to play Windows® games on Mac.`
    : `${pageData.title} | ${config.title}`;
  const { description } = pageData;
  const { host } = config;

  return (
    <Site>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="description" content={description} />
        <meta property="og:url" content={`${host}${asPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${host}/social-preview.jpg`} />
      </Head>
      <Layout pathname={pathname}>
        <Component {...pageProps} />
      </Layout>
    </Site>
  );
}

const Layout = ({ children, pathname }) => {
  if (pathname === '/sparkle/[tag]') {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default App;
