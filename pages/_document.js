import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body className="dark:bg-teal-600">
          <Main />
          <NextScript />
          {/* If JS is not enabled, load CSS at last */}
          <noscript dangerouslySetInnerHTML={{ __html: `<link rel="stylesheet" href="/fonts/inter-var.woff2" />` }} />
        </body>
      </Html>
    )
  }
}
