import '@vidstack/react/player/styles/base.css';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay, Navigation, FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import myGif from '../public/Logotipo Animado 1.gif'
import { RxCursorArrow } from "react-icons/rx";

import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react';
import { isHLSProvider, MediaPlayer, MediaProvider, ScreenOrientationLockType, MediaCanPlayDetail, MediaCanPlayEvent, MediaProviderAdapter, MediaProviderChangeEvent, MediaPlayerInstance, Controls, VolumeSlider, MediaPlayerState, useMediaStore } from '@vidstack/react';
import { Channel } from "../utils/channels"
import { FaAngleDown, FaAngleUp, FaCompress, FaExpand, FaMinus, FaPlus, FaPowerOff } from "react-icons/fa6";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { RiHomeLine } from 'react-icons/ri';
import { PictureInPictureExitIcon, PictureInPictureIcon } from '@vidstack/react/icons';
import { UAParser } from 'ua-parser-js';
// import { ChannelSelector } from '../Components/ChannelSelector'
import { IoClose } from 'react-icons/io5';
import { fetchApi, queries } from '@/utils/Fetching';
import { Logo4plus, Mano } from "../Components/icons"

const parser = new UAParser();

interface MyScreenOrientation extends ScreenOrientation {
  lock(orientation: ScreenOrientationLockType): Promise<void>;
}

interface DataStoragePros {
  numberChannel: number
  volume: number
}

interface ScreenSize {
  w: number
  h: number
}


export default function Home(props: any) {
  const channelsList = props.results

  const [showVideo, setShowVideo] = useState<boolean>(false)
  const [channel, setChannel] = useState<Channel>(channelsList[1])
  const [showControl, setShowControl] = useState<boolean>(false);
  const [showChannels, setShowChannels] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [slideChannel, setSlideChannel] = useState<number>(0);
  const [isPc, setIsPc] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.1);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [showThumb, setShowThumb] = useState<boolean>(false);
  const [showPIP, setShowPIP] = useState<boolean>(false);
  const [eventForUser, setEventForUser] = useState<boolean>(false);
  const [waitingConfirmation, setWaitingConfirmation] = useState<boolean>(false);
  const [triggerClosePIP, setTriggerClosePIP] = useState<number | null>(null);
  const [triggerFullChange, setTriggerFullChange] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState<ScreenSize | null>(null);
  const [controlSize, setControlSize] = useState<ScreenSize>({ w: 265, h: 468 });
  const [playerState, setPlayerState] = useState<MediaPlayerState>();
  const [widthVideo, setWidthVideo] = useState<number | null>(null);
  const [heightVideo, setHeightVideo] = useState<number | null>(null);
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [platform, setPlatfomr] = useState<string | null>(null);
  const [platformOs, setPlatfomrOs] = useState<string | null>(null);
  const [platformBrowser, setPlatfomrBrowser] = useState<string | null>(null);

  const [canFullScreen, setCanFullScreen] = useState<string>("no");
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
    if (showVideo && channel && volume) {
      const dataStorage = { numberChannel: channel?.numberChannel, volume }
      localStorage.setItem("Tv", JSON.stringify(dataStorage));
    }
  }, [channel, volume])

  let player = useRef<MediaPlayerInstance>(null);
  const { canFullscreen, fullscreen } = useMediaStore(player);

  let valirTimeout: any = null

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    console.log(10001, detail)
  }

  useEffect(() => {
    const video: HTMLVideoElement | null = document.querySelector("video")
    if (video) {
      video.muted = mute
    }
  }, [mute])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseLeave);
    document.addEventListener('click', handleMouseLeave);
    document.addEventListener("keydown", (e: KeyboardEvent) => { handleKeyDown(e) });

    return () => {
      clearTimeout(valirTimeout);
      document.removeEventListener('mousemove', handleMouseLeave);
      document.removeEventListener('click', handleMouseLeave);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Subscribe to state updates.
    return player.current!.subscribe((state: MediaPlayerState) => {
      setPlayerState(state)
      if (!state.muted) {
        setVolume(state.volume)
      }
      // console.log(channel?.title)
      // console.log('is muted?', '->', state.muted);
      // console.log('is volume?', '->', state.volume);
      // console.log('is paused?', '->', state.paused);
      // console.log('is audio view?', '->', state.viewType);
      // console.log('state', '->', state.source);
    });

  }, []);


  useEffect(() => {
    let widthVideo = 1
    if (window) {
      if ((window.innerWidth * 9 / 16) < window.innerHeight) {
        widthVideo = window.innerWidth - 12
        setWidthVideo(widthVideo)
      } else {
        widthVideo = window.innerHeight * 16 / 9 - 12
        setWidthVideo(widthVideo)
      }
    }

  }, [screenSize])

  useEffect(() => {
    const isPc = navigator?.userAgentData?.platform === "Windows"
    const userAgent = navigator.userAgent;
    if (/Windows/.test(userAgent)) {
      setPlatfomrOs("Windows")
    }
    if (/Mac OS X/.test(userAgent)) {
      setPlatfomrOs("Mac")
    }
    if (/Linux/.test(userAgent)) {
      setPlatfomrOs("Linux")
    }
    if (/Android/.test(userAgent)) {
      setPlatfomrOs("Android")
    }
    if (/iOS/.test(userAgent)) {
      setPlatfomrOs("iOS")
    }

    setPlatfomr(`${navigator?.userAgentData?.platform} / mobile: ${navigator?.userAgentData?.mobile}`)
    const c = navigator?.userAgent?.split(" ")
    setPlatfomr(`${c[0].split("/")[0]} / dis: ${c[1].split(" ")[0].slice(1)}`)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setPlatfomr("mobile")
      setIsPc(false)
    } else {
      setPlatfomr("NO mobile")
      setIsPc(true)
    }

    setPlatfomrBrowser(parser.getResult().browser.name ?? null)

    window.onbeforeunload = function (e) {
      alert("algo12")
      console.log("Evento detectado: el usuario hizo clic en el botón de volver.");
      // Aquí puedes ejecutar la función que desees.
    };

    // const handlePopstate = () => {
    //   console.log('El usuario presionó el botón de volver');
    //   alert("algo13")
    //   // Aquí puedes agregar la lógica que deseas ejecutar
    // };
    const handleFullChange = (e: any) => {
      if (!document?.fullscreenElement) {
        setFullScreen(false)
        setTriggerFullChange(new Date().getTime())
      }
    };
    // window.addEventListener('popstate', handlePopstate);
    window.addEventListener('fullscreenchange', handleFullChange);
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      // window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('fullscreenchange', handleFullChange);
    };
  }, []);


  const handleKeyDown = (e: KeyboardEvent) => {
    e?.defaultPrevented
    setKeyPressed(e?.code)
  }

  const handleResize = () => {
    setScreenSize({ w: window?.innerWidth, h: window?.innerHeight })
  }

  const handleSwithOff = async () => {
    const exitChannel = { ...channel, title: "", logo: "", src: "" }
    const video: HTMLVideoElement | null = document.querySelector("video")
    if (document?.pictureInPictureElement === video) {
      setEventForUser(true)
      setTimeout(() => {
        setShowPIP(false)
      }, 1500);
      await document?.exitPictureInPicture();
    }
    if (isPc) {
      if (document?.fullscreenElement) {
        document?.exitFullscreen()
        setFullScreen(false)
      }
      setClosing(true)
      setShowControl(false)
      setShowVideo(false)
      setTimeout(() => {
        if (video) {
          video.muted = true
        }
        setChannel({ ...exitChannel })
      }, 1500);
    }
    else {
      setClosing(true)
      setTimeout(() => {
        if (document?.fullscreenElement) {
          document?.exitFullscreen();
        }
        setShowControl(false)
        setShowVideo(false)
      }, 400);
      setTimeout(() => {
        if (video) {
          video.muted = true
        }
        setChannel({ ...exitChannel })
      }, 1500);
    }
  }

  const handleFullScreen = async () => {
    const container: any | null = document.getElementById("mediaplayer")
    if (document?.fullscreenElement) {
      if (document?.fullscreenElement) {
        setFullScreen(false)
        document?.exitFullscreen();
      }
    } else {
      if (!container.hasAttribute('webkit-playsinline')) {
        const webkitPlaysinlineAttribute = document.createAttribute('webkit-playsinline');
        container.setAttributeNode(webkitPlaysinlineAttribute);
      }
      setCanFullScreen(container?.mozRequestFullScreen?.toString())
      if (container?.requestFullscreen) {
        setFullScreen(true)
        container?.requestFullscreen({ navigationUI: "hide" });
        (screen.orientation as MyScreenOrientation).lock('landscape')
          .then()
          .catch((error: any) =>
            console.log(10003, error)
          )
        const video: HTMLVideoElement | null = document.querySelector("video")
        if (document?.pictureInPictureElement === video) {
          video?.play()
          setEventForUser(true)
          setShowPIP(false)
          await document.exitPictureInPicture();
        }
      }
    }
  }

  useEffect(() => {
    let dataStorage: DataStoragePros = JSON.parse(localStorage.getItem("Tv") ?? "{}");
    if (showVideo) {
      localStorage.setItem("Tv", JSON.stringify(dataStorage));
    }
  }, [])

  useEffect(() => {
    console.log(slideChannel)
  }, [slideChannel])


  const handleSwithOn = () => {
    let dataStorage: DataStoragePros = JSON.parse(localStorage.getItem("Tv") ?? "{}");
    setClosing(false)
    setTimeout(() => {
      console.log("aqui")
      setShowVideo(true)
      const f1 = channelsList.findIndex((elem: any) => elem.numberChannel === dataStorage.numberChannel)
      setChannel(f1 > -1 ? channelsList[f1] : channelsList[0])
      setSlideChannel(f1)
      setTimeout(() => {
        const video: HTMLVideoElement | null = document.querySelector("video")
        const container: any | null = document.getElementById("mediaplayer")
        if (video) {
          video.muted = false
          setMute(false)
          video.volume = dataStorage?.volume ?? 0.2
          setVolume(dataStorage?.volume ?? 0.2)
          if (container?.requestFullscreen && !isPc) {
            container?.requestFullscreen({ navigationUI: "hide" });
            (screen.orientation as MyScreenOrientation).lock('landscape')
              .then()
              .catch((error: any) =>
                console.log(10004, error)
              )
          }
        }
      }, 500);
    }, 500)
  }

  useEffect(() => {
    if (isMounted) {
      console.log({ isPc })
      setTimeout(() => {
        // handleSwithOn()
      }, 3000);
    }
  }, [isPc, isMounted])


  const volumeChange = (value: number) => {
    if (mute) {
      setMute(false)
      return
    }
    let volumeNew = Math.floor((volume + value) * 100) / 100
    if (volumeNew < 0) volumeNew = 0
    if (volumeNew > 1) volumeNew = 1
    if (volumeNew >= 0 && volumeNew <= 1) {
      setVolume(volumeNew)
    }
  }

  const handleMouseLeave = () => {
    if (!showControl) {
      setShowControl(true);
    }
    clearTimeout(valirTimeout)
    const ID = setTimeout(() => {
      setShowControl(false);
      valirTimeout = null
    }, 3500);
    valirTimeout = ID
  };

  useEffect(() => {
    if (triggerFullChange) {
      if (platform === "mobile" && showPIP === false) {
        handleSwithOff()
      }
    }
  }, [triggerFullChange])

  useEffect(() => {
    if (triggerClosePIP) {
      //se ejectuta sino es generado por intervencion del usuario
      if (!eventForUser) {
        const video: HTMLVideoElement | null = document.querySelector("video")
        if (video) {
          setTimeout(() => {
            //click en volver a la pestaña
            if (!video?.paused) {
              if (isPc) {
                setShowPIP(false)
              }
              if (!isPc) {
                setShowPIP(false)
                setWaitingConfirmation(true)
              }
            } else {
              //cerrado en la x del pip y click en volver a la pestaña estando pausado
              handleSwithOff()
              setTimeout(() => {
                setShowPIP(false)
              }, isPc ? 1000 : 1500);
            }

          }, 200);
        }
      }
      const video: HTMLVideoElement | null = document.querySelector("video")
      if (video) {
        video.removeEventListener('leavepictureinpicture', () => { });
      }
      setEventForUser(false)
    }
  }, [triggerClosePIP])
  const handlePIP = async () => {
    const video: HTMLVideoElement | null = document.querySelector("video")
    if (video && !showPIP && video?.requestPictureInPicture) {
      setShowPIP(true)
      await video?.requestPictureInPicture();
      video.addEventListener('leavepictureinpicture', () => { setTriggerClosePIP(new Date().getTime()) });
      return
    }
    if (document?.pictureInPictureElement === video) {
      setEventForUser(true)
      await document?.exitPictureInPicture();
      if (!isPc) {
        setWaitingConfirmation(true)
      }
      setShowPIP(false)
      video?.play()
    }
  }

  const handleChannel = async (action: number) => {
    try {
      let idx = channelsList.findIndex((elem: any) => elem.numberChannel === channel?.numberChannel)
      idx = idx + action
      if (idx < 0) {
        idx = channelsList.length - 1
      }
      if (idx === channelsList.length) {
        idx = 0
      }
      setChannel(channelsList[idx])
      setSlideChannel(idx)
    } catch (error) {
      console.log(1001141, error)
    }
  }

  const handleShowChannels = async () => {
    try {
      console.log("aqui")
    } catch (error) {
      console.log(1001142, error)
    }
  }
  const loaderLazy = ({ src }: any) => {
    console.log(src)
    return src
  }

  return (
    <main
      onClick={() => {
        if (waitingConfirmation) {
          handleFullScreen()
          setWaitingConfirmation(false)
        }
        if (!showVideo) {
          handleSwithOn()
        }
      }}
      className={`bg-black flex w-screen h-screen flex-col items-center justify-center vertical-content`}    >
      {!showVideo && <div className='bg-black w-40 h-40 -translate-y-10'>
        <Image src={myGif} alt="mi gif" height={1000} width={1000} />
      </div>}
      <AnimatePresence  >
        {!showVideo && <motion.div
          key={"1"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: closing ? 1 : 0, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className='absolute w-full h-20 -right-2 md:right-0 bottom-14 md:bottom-20 scale-50 md:scale-100'
        >
          <div className='w-full h-20 flex justify-center'>
            {isPc
              ? <div className='w-full flex justify-center items-center space-x-4'>
                <RxCursorArrow className={"text-white w-16 h-16"} />
                <div className='capitalize* text-3xl flex flex-col'>
                  <span >Haz click en la pantalla </span>
                  <span >para ver la Tv</span>
                </div>
              </div>
              : <div className='w-full flex justify-center items-center space-x-4'>
                <Mano className={"text-white w-28 h-28"} />
                <div className='capitalize* text-3xl flex flex-col'>
                  <span >Pulsa la pantalla </span>
                  <span >para ver la Tv</span>
                </div>
              </div>
            }
          </div>
          {/* <div className='flex flex-col items-center '>
            <div className='items-center'>
              <div onClick={handleSwithOn} className="inline-flex cursor-pointer p-8 bg-slate-900 rounded-full hover:scale-110 hover:bg-slate-800 relative justify-center">
                <FaPowerOff className='w-20 h-20 text-white' />
                <span className='absolute bottom-0 -translate-y-2 text-white text-xl md:text-lg'>Encender</span>
              </div>
            </div>
            <Image style={{ objectFit: 'cover' }} height={40} width={300} alt={channel?.title} src={"/4netBlancoGradient.png"} />
          </div> */}
        </motion.div>}
        {showPIP && <div className='top-0 left-0 w-[100vw] h-[100vh] bg-black fixed z-10 flex justify-center text-xs md:text-sm pt-10' >
          Reproduciendo en modo pantalla en pantalla1
        </div>}

        <motion.div
          key={"2"}
          initial={false}
          animate={{
            width: !showVideo ? 0 : widthVideo ?? 0,
            transition: { delay: 0, duration: 0.4 }
          }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className='absolute'
        >
          {true && <MediaPlayer
            ref={player}
            id='mediaplayer'
            muted={!showVideo}
            autoPlay={true}
            volume={mute ? 0 : volume}
            className={`aspect-video bg-black text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4`}
            // title="Sprite Fight"
            src={[channel?.src]}
            crossOrigin={true}
            playsInline={true}
            artist=""
            title=""
            // artwork={[]}
            // album=""
            //title={channel?.title}
            onSourceChange={(e) => console.log("cambio de source src", e)}
            onProviderChange={onProviderChange}
            onError={() => { (error: any) => { console.log(545409, "error", error) } }}
            onHlsError={(error: any) => { console.log(545409, "error", error) }}
            onCanPlay={onCanPlay}>

            <MediaProvider
              onError={(error) => { console.log(545410, "error", error) }} />
            <AnimatePresence >
              {showChannels &&
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.4 } }}
                  exit={{ opacity: 0, transition: { delay: 0, duration: 0.3 } }}
                  className='h-[100vh] w-[232px] md:w-[361px] *bg-black fixed top-0 right-0 *-translate-x-[54px] *md:-translate-x-20 z-20 bg-gradient-to-l from-black'
                >
                  <div onClick={() => { setShowChannels(false) }} className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-white right-0 *opacity-50 absolute z-50 -translate-x-4 translate-y-8 md:-translate-x-8 md:translate-y-20 text-black flex justify-center items-center cursor-pointer hover:scale-110'>
                    <IoClose className='w-8 h-8 text-black' />
                  </div>
                  <div className='w-full h-14 md:h-16 lg:h-24 bg-gradient-to-b from-black absolute z-10 top-0' />
                  <div className='w-full h-14 md:h-20 lg:h-32 bg-gradient-to-t from-black absolute z-10 bottom-0' />
                  {/* 
                  Infinite loop
                  vertical
                  Slides per view
                   */}
                  <div className="w-[178px] md:w-[281px] h-[100%] relative">
                    <div className='w-[100%] h-[100%] cursor-pointer '>
                      <Swiper
                        direction={'vertical'}
                        initialSlide={slideChannel}
                        slidesPerView={screenSize
                          ? screenSize?.w < 768
                            ? screenSize.h / 110
                            : screenSize.h / 145
                          : 0
                        }
                        spaceBetween={10}
                        loop={false}
                        centeredSlides={true}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[FreeMode, Scrollbar, Mousewheel]}
                        className=""
                        freeMode={true}
                        scrollbar={true}
                        mousewheel={true}
                      >
                        <SlideTo slideChannel={slideChannel} />
                        {channelsList?.map((item: any, idx: number) => (
                          <SwiperSlide key={idx} onClick={() => {
                            setChannel(item)
                            setSlideChannel(idx)
                          }} >
                            <div className={`${channel.numberChannel === item.numberChannel ? "bg-blue-800 scale-[107%] w-full h-full hover:scale-[110%]" : "bg-slate-800 w-[95%] h-[95%] hover:scale-[105%]"} flex justify-center relative items-center p-2 mx-3 rounded-[20px] md:rounded-[32px] transition ease-in-out delay-100 duration-300 text-[13px] md:text-[15px]`}>
                              <div className='absolute left-4 md:left-5 bottom-[6px] md:bottom-[10px] text-white '>{item.title}</div>
                              <div className='absolute right-4 md:right-5 bottom-[6px] md:bottom-[10px] text-white'>{item.numberChannel}</div>
                              <div className='bg-blue-400* w-32 h-16 md:w-40 md:h-20 relative -translate-y-2'>
                                <Image
                                  loader={({ src }: any) => {
                                    try {
                                      return src
                                    } catch (error) {
                                      console.log(error)
                                    }
                                  }}
                                  fill
                                  src={item.logo}
                                  alt={item.title}
                                  objectFit="contain"
                                />
                              </div>
                            </div>
                            {/* <Category title={item?.title} route={item?.slug} /> */}
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>




                </motion.div>
              }
            </AnimatePresence>
            <div className={`${showVideo ? "fixed" : "absolute"} inset-0 z-10 flex h-full w-full flex-col justify-center items-end *-translate-x-7 md:-translate-x-20`}>
              <AnimatePresence >
                <>
                  {showControl && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.4 } }}
                    exit={{ opacity: 0.5, transition: { delay: 0.4, duration: 0.2 } }}
                  >
                    <div onClick={() => {
                      console.log("aqui", valirTimeout)
                      clearTimeout(valirTimeout)
                    }} className='fixed top-10 left-10 md:left-40 z-10 bg-black opacity-50 w-64 h-12 flex flex-col justify-center items-center rounded-3xl border-[1px]'>
                      {/* <span className='text-white font-extrabold'>{keyPressed}</span> */}
                      {/* <span className='text-white font-extrabold'>{platform}</span> */}
                      {/* <span className='text-white font-extrabold'>Os: {platformOs}</span> */}
                      {/* <span className='text-white font-extrabold'>Browser: {platformBrowser}</span> */}
                      <span className='text-white font-extrabold'>{channel?.title}</span>
                      <span className='text-white font-extrabold'>{channel?.numberChannel}</span>
                      {/* <span className='text-white font-extrabold'>volume: {volume}</span> */}
                      {/* <span className='text-white font-extrabold'>canfullScreen: {canFullScreen}</span> */}
                    </div>
                    {/* <div className='fixed right-6 bottom-6 z-10 bg-red-500 w-64 flex flex-col justify-center items-center'>
                        <span className='text-white font-extrabold'>{keyPressed}</span>
                        <span className='text-white font-extrabold'>{platform}</span>
                      </div> */}
                  </motion.div>}
                  {(!showChannels && showControl) &&
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.4 } }}
                      exit={{ opacity: 0.5, transition: { delay: 0.4, duration: 0.2 } }}
                    >
                      <div className="absolute z-10 w-[149px] lg:w-[230px] h-[300px] lg:h-[460px] flex flex-col items-center">
                        <div className='w-full h-[155px] lg:h-[239px] flex flex-col items-center'>
                          <div className='w-full flex-1 flex justify-end items-end px-4'>
                            <div onClick={() => { handleSwithOff() }} className="w-[39px] lg:w-[60px] h-[39px] lg:h-[60px] rounded-full border-[1px] bg-black opacity-50 flex justify-center items-center" >
                              <FaPowerOff className="w-5 lg:w-8 h-5 lg:h-8 hover:scale-110" />
                            </div>
                          </div>
                          <div className='opacity-50 bg-black rounded-full w-[104px] lg:w-[160px] h-[104px] lg:h-[160px] flex justify-center items-center border-[1px]'>
                            <div className='h-[26px] lg:h-10 flex-1 flex justify-center items-center'>
                              <div onClick={() => { handleChannel(-1) }} className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaAngleUp className="w-[13px] lg:w-5 h-[13px] lg:h-5" /></div>
                            </div>
                            <div className='rounded-full w-[50%] h-[100%] flex flex-col justify-center items-center' >
                              <div className='w-[26px] lg:w-10 flex-1 flex justify-center items-center'>
                                <div onClick={() => { volumeChange(0.05) }} className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaPlus className="w-[13px] lg:w-5 h-[13px] lg:h-5" /></div>
                              </div>
                              <div className='rounded-full w-[100%] h-[50%] border-[1px]' >
                                <div className='bg-white opacity-10 rounded-full w-[100%] h-[100%]' />
                              </div>
                              <div className='w-[26px] lg:w-10 flex-1 flex justify-center items-center'>
                                <div onClick={() => { volumeChange(-0.05) }} className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaMinus className="w-[13px] lg:w-5 h-[13px] lg:h-5" /></div>
                              </div>
                            </div>
                            <div className='h-[26px] lg:h-10 flex-1 flex justify-center items-center'>
                              <div onClick={() => { handleChannel(1) }} className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaAngleDown className="w-[13px] lg:w-5 h-[13px] lg:h-5" /></div>
                            </div>
                          </div>
                        </div>
                        <div className='w-[110px] lg:w-[168px] flex-1 flex flex-col'>
                          <div className='w-full h-1/2 flex'>
                            <div className='w-1/2 h-full flex justify-center items-center'>
                              <div onClick={() => { setShowChannels(true) }} className="w-[39px] lg:w-[60px] h-[39px] lg:h-[60px] rounded-full border-[1px] bg-black opacity-50 flex justify-center items-center cursor-pointer" >
                                <RiHomeLine className="w-5 lg:w-8 h-5 lg:h-8 hover:scale-110" />
                              </div>
                            </div>
                            <div className='w-1/2 h-full flex justify-center items-center'>
                              {isPc
                                ? <div onClick={() => { handleFullScreen() }} className="w-[39px] lg:w-[60px] h-[39px] lg:h-[60px] rounded-full border-[1px] bg-black opacity-50 flex justify-center items-center cursor-pointer"  >
                                  {fullScreen
                                    ? <FaCompress className="w-5 lg:w-8 h-5 lg:h-8 hover:scale-110" />
                                    : <FaExpand className="w-5 lg:w-8 h-5 lg:h-8 hover:scale-110" />}
                                </div>
                                : <div className="w-[60px] h-[60px]" />
                              }
                            </div>
                          </div>
                          <div className='w-full h-1/2 flex'>
                            <div className='w-1/2 h-full flex justify-center items-center'>
                              <div onClick={() => { setMute(!mute) }} className="w-[39px] lg:w-[60px] h-[39px] lg:h-[60px] rounded-full border-[1px] bg-black opacity-50 flex justify-center items-center cursor-pointer" >
                                {mute
                                  ? <FaVolumeMute className="w-5 lg:w-8 h-5 lg:h-8 hover:scale-110" />
                                  : <FaVolumeDown className="w-5 lg:w-8 h-5 lg:h-8 hover:scale-110" />
                                }
                              </div>
                            </div>
                            <div className='w-1/2 h-full flex justify-center items-center'>
                              <div onClick={handlePIP} className="w-[39px] lg:w-[60px] h-[39px] lg:h-[60px] rounded-full border-[1px] bg-black opacity-50 flex justify-center items-center cursor-pointer" >
                                {!showPIP ?
                                  <PictureInPictureIcon className="w-7 lg:w-11 h-7 lg:h-11 hover:scale-110" />
                                  :
                                  <PictureInPictureExitIcon className="w-5 lg:w-10 h-5 lg:h-10 hover:scale-110" />
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='w-full h-[36px] lg:h-14 flex items-center justify-center text-2xl button-0'>
                          <Logo4plus className="w-10 lg:w-16 h-10 lg:h-16 hover:scale-110" />
                        </div>
                      </div>
                      <AnimatePresence >
                        {!closing &&
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6, transition: { duration: 0.4 } }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                          >
                            <div className={`bg-black rounded-t-[50px] rounded-b-[120px]`}>
                              <div className="w-[149px] lg:w-[230px] h-[310px] lg:h-[478px] rounded-t-[50px] rounded-b-[120px] border-gray-400 border-[1px] flex flex-col" >
                                <div className='w-[42px] h-[88px] lg:h-[140px] absolute z-10 -translate-x-[44px] lg:-translate-x-[46px] translate-y-16 lg:translate-y-24'>
                                  <VolumeSlider.Root
                                    className="group relative inline-flex w-10 h-full max-h-[88px] lg:max-h-[140px] cursor-pointer touch-none select-none items-center outline-none justify-end"
                                    orientation="vertical"
                                  >
                                    <VolumeSlider.Track className="relative ring-sky-400 z-0 w-[5px] h-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px] rotate-180">
                                      <VolumeSlider.TrackFill defaultValue={0.1} className="bg-indigo-400 absolute w-full h-[var(--slider-fill)] rounded-sm will-change-[height]" />
                                    </VolumeSlider.Track>
                                    <VolumeSlider.Thumb className={`absolute bottom-[var(--slider-fill)] z-20 h-[10px] w-[10px] translate-x-1/4 translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity ${showThumb && "opacity-100"} group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[bottom]`} />
                                  </VolumeSlider.Root>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        }
                      </AnimatePresence>
                    </motion.div>
                  }
                </>
              </AnimatePresence>
            </div>
          </MediaPlayer>}
          <style>{`
      video::-webkit-media-controls {
        display: none;
      }
      video::-webkit-media-controls-start-playback-button {
        display: none;
      }
      video::-webkit-media-controls-overlay-play-button {
        display: none !important;
      }
      .swiper {
        width: 100%;
        height: 100%;
      }

      .swiper-slide {
        text-align: center;
        font-size: 18px;
        *background: #000000;

        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      `}</style>
        </motion.div>
      </AnimatePresence>
    </main >
  )
}

interface propsSlideto {
  slideChannel: number
}

const SlideTo: FC<propsSlideto> = ({ slideChannel }) => {
  const swiper = useSwiper();

  useEffect(() => {
    swiper.slideTo(slideChannel)
  }, [slideChannel, swiper])
  return <>
  </>
}

export async function getServerSideProps({ params }: any) {
  try {
    const dataProps = await fetchApi({
      query: queries.getChannel,
      variables: {
        args: { status: "prod" },
        sort: { numberChannel: 1 },
        limit: 0,
        skip: 0,
      },
      type: "json"
    })

    if (dataProps) {
      const results = dataProps.results.map((elem: any) => {
        elem.src = `https://test.4net.com.ve/hls/${elem.numberChannel}.m3u8`
        delete elem?.srcOrigin
        return elem
      })
      return {
        props: { ...dataProps, results }, // will be passed to the page component as props
      }
    } else {
      throw new Error("Data null")
    }
  } catch (error) {
    console.log(error)
    return {
      props: {},
      revalidate: 10
    }
  }
}

