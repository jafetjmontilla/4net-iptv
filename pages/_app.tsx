import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import '@fontsource/manrope';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>4net Plus+</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="description" content="¡IPTV! Fournet." />
        <meta name="robots" content="noindex"></meta>
      </Head>
      <Component {...pageProps} />
      <style jsx global>
        {`
        body {
          overflow: hidden;
          background-color: #000 !important;
          overscroll-behavior: contain;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background: #a99cbc;
          border-radius: 6px;
          height: 30%;
        }
      `}
      </style>
    </>
  )
}
