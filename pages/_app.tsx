import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import '@fontsource/manrope';
import { useEffect, useState } from 'react';
import { fetchApi, queries } from '@/utils/Fetching';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const [valir, setValir] = useState<boolean>(false);
  const [showValir, setShowValir] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
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
          setValir(!valir)
          setShowValir(true)
        })
        .catch((err: any) => console.log(err))
    }
  }, [isMounted])

  const handleNewTabClick = () => {
    const url = "https://wa.me/584246292373?text=Hola.%20Escribo%20para%20preguntar%20por%20el%20servicio%20de%20televisión";
    window.open(url, '_blank');
  };

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
          : <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-[#f5f5f5]'>
            <div className='w-full h-full flex flex-col items-center'>
              <div className='*bg-red-100 flex md:hidden w-full h-[27%] justify-end'>
                <img src={'Ups fournet TV+ Movil Header.png'} alt="4net.plus" className='w-[23.4vw] h-[18vw] -translate-x-4 translate-y-4' />
              </div>
              <div className='*bg-green-200 w-full flex-1 flex justify-center items-center'>
                <img src={'Ups fournet TV+ pc.png'} alt="4net.plus" className='md:w-[60vw] *hidden *md:flex' />

              </div>
              <div className='*bg-blue-200 w-full md:w-[80%] h-[27%] md:h-[33%] flex justify-center items-start relative'>
                <img src={'Ups fournet TV+ Movil Footer.png'} alt="4net.plus" style={{ width: "90%", }} className='flex md:hidden' />
                <img src={'Ups fournet TV+ pc Footer.png'} alt="4net.plus" style={{ width: "100%", }} className='hidden md:flex' />
                <div onClick={() => { router.push("https://wa.me/584246292373?text=Hola.%20Escribo%20para%20preguntar%20por%20el%20servicio%20de%20televisión") }} className='w-[31vw] h-[7vw] absolute left-[7.5vw] top-0 translate-y-[20vw] flex md:hidden' />
                <div onClick={() => { handleNewTabClick() }} className='hover:border-2 hover:border-green-700 w-[13.4vw] h-[2.9vw] absolute left-[0.1vw] top-0 translate-y-[6.9vw] rounded-full cursor-pointer hidden md:flex' />
              </div>
            </div>
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

