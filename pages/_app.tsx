import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import '@fontsource/manrope';
import { useEffect, useState } from 'react';
import { fetchApi, queries } from '@/utils/Fetching';
import Image from 'next/image';

export default function App({ Component, pageProps }: AppProps) {
  const [valir, setValir] = useState<boolean>(false);
  const [showValir, setShowValir] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      fetchApi({
        query: queries.setConnet,
        variables: {},
        type: "json"
      })
        .then((valir: any) => {
          console.log(1410001, window.location.hostname)
          if (window.location.hostname === "4net.plus") {
            setValir(valir)
          } else {
            setValir(true)
          }
          setShowValir(true)
        })
        .catch((err: any) => console.log(err))
    }
  }, [isMounted])

  return (
    <>
      <Head>
        <title>4net Plus+</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="description" content="¡IPTV! Fournet." />
        <meta name="robots" content="noindex"></meta>
      </Head>
      {showValir
        ? valir
          ? <Component {...pageProps} />
          : <div className='w-full h-[100vh] flex justify-center items-center'>
            <img src={'Ups fournet TV+.png'} alt="mi gif" height={400} width={400} className='md:hidden rounded-2xl' />
            <img src={'Ups fournet TV+ pc.png'} alt="mi gif" height={1000} width={1000} className='hidden md:block rounded-2xl' />
          </div>
        : <></>
      }
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
function padStart(arg0: string, arg1: number, arg2: string) {
  throw new Error('Function not implemented.');
}

