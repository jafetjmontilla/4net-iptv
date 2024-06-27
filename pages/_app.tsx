import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import '@fontsource/manrope';
import { useEffect, useState } from 'react';
import { fetchApi, queries } from '@/utils/Fetching';
import Image from 'next/image';

export default function App({ Component, pageProps }: AppProps) {
  const [geoIngo, setGeoInfo] = useState<any>();
  const [customer, setCustomer] = useState<any>();
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
        query: queries.getGeoInfo,
        variables: {},
        type: "json"
      })
        .then((geoInfo: any) => {

          function IPtoNum(ip: string) {
            const ipNum = Number(ip.split(".").map(d => ("000" + d).substr(-3)).join(""))
            if (ipNum > 1000000000) {
              return Number(ip.split(".").map(d => ("000" + d).substr(-3)).join(""))
            }
            return 0
          }
          setGeoInfo(geoInfo)
          if (window.location.hostname !== "https://4net.plus/") {
            console.log(141001)
            setValir(true)
            setShowValir(true)
          } else {
            console.log(141002)
            const val = geoInfo.connectingIp
            //const val = "38.196.65.179"
            let min = "38.196.64.0"
            let max = "38.196.95.255"
            console.log(1410091, "min", IPtoNum(min), "val", IPtoNum(val), "max", IPtoNum(max), IPtoNum(min) < IPtoNum(val))
            if (IPtoNum(min) < IPtoNum(val) && IPtoNum(max) > IPtoNum(val)) {
              console.log(141003)
              console.log(1410030, "La IP está en el rango 0.")
              setValir(true)
            }
            min = "38.252.184.0"
            max = "38.252.187.255"
            console.log(1410091, "min", IPtoNum(min), "val", IPtoNum(val), "max", IPtoNum(max), IPtoNum(min) < IPtoNum(val))
            if (IPtoNum(min) < IPtoNum(val) && IPtoNum(max) > IPtoNum(val)) {
              console.log(141004)
              console.log(1410041, "La IP está en el rango 1.")
              setValir(true)
            }
            console.log(141005, "el dominio es", window.location.hostname)
            setShowValir(true)
          }



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
