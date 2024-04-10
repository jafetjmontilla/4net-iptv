import '@vidstack/react/player/styles/base.css';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import { isHLSProvider, MediaPlayer, MediaProvider, ScreenOrientationLockType, MediaCanPlayDetail, MediaCanPlayEvent, MediaProviderAdapter, MediaProviderChangeEvent, MediaPlayerInstance, Controls } from '@vidstack/react';
import { Channel, channelsList } from "../utils/channels"
import { FaAngleDown, FaAngleUp, FaCompress, FaExpand, FaMinus, FaPlus, FaPowerOff } from "react-icons/fa6";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { RiHomeLine } from 'react-icons/ri';
import { VolumeSli } from '../Components/VolumeSli';

interface MyScreenOrientation extends ScreenOrientation {
  lock(orientation: ScreenOrientationLockType): Promise<void>;
}

export default function Home() {
  const [showVideo, setShowVideo] = useState<boolean>(false)
  const [channel, setChannel] = useState<Channel>(channelsList[1])
  const [showControl, setShowControl] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [isPc, setIsPc] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  let player = useRef<MediaPlayerInstance>(null);

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

    return () => {
      clearTimeout(valirTimeout);
      document.removeEventListener('mousemove', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Subscribe to state updates.
    const video = document.querySelector("video")
    return player.current!.subscribe((state: any) => {
      console.log(channel.title)
      console.log('is muted?', '->', state.muted);
      console.log('is paused?', '->', state.paused);
      console.log('is audio view?', '->', state.viewType);
    });
  }, []);

  useEffect(() => {
    const isPc = navigator?.userAgentData?.platform === "Windows"
    setIsPc(isPc)
    // const handlePopstate = () => {
    //   console.log('El usuario presionó el botón de volver');
    //   alert("algo1")
    //   // Aquí puedes agregar la lógica que deseas ejecutar
    // };
    const handleFullChange = (e: any) => {
      if (!document?.fullscreenElement) {
        setFullScreen(false)
      }
    };
    // window.addEventListener('popstate', handlePopstate);
    window.addEventListener('fullscreenchange', handleFullChange);
    return () => {
      // window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('fullscreenchange', handleFullChange);
    };
  }, []);

  const handleSwithOff = async () => {
    if (isPc) {
      if (document?.fullscreenElement) {
        document?.exitFullscreen()
        setFullScreen(false)
      }
      setClosing(true)
      setShowControl(false)
      setShowVideo(false)
      setTimeout(() => {
        const video: HTMLVideoElement | null = document.querySelector("video")
        if (video) {
          video.muted = true
        }
        setChannel({ id: 0, title: "", logo: "", src: "" })
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
        const video: HTMLVideoElement | null = document.querySelector("video")
        if (video) {
          video.muted = true
        }
        setChannel({ id: 0, title: "", logo: "", src: "" })
      }, 1500);
    }
  }

  const handleFullScreen = () => {
    const container: any | null = document.getElementById("mediaplayer")
    if (document?.fullscreenElement) {
      if (document?.fullscreenElement) {
        setFullScreen(false)
        document?.exitFullscreen();
      }
    } else {
      if (container?.requestFullscreen) {
        setFullScreen(true)
        container?.requestFullscreen({ navigationUI: "hide" });
        (screen.orientation as MyScreenOrientation).lock('landscape')
          .then()
          .catch((error: any) =>
            console.log(10004, error)
          )
      }
    }
  }

  useEffect(() => {
    console.log({ closing })
  }, [closing])

  const handleSwithOn = () => {
    setClosing(false)
    setTimeout(() => {
      setShowVideo(true)
      setChannel(channelsList[12])
      setTimeout(() => {
        const video: HTMLVideoElement | null = document.querySelector("video")
        const container: any | null = document.getElementById("mediaplayer")
        if (video) {
          video.muted = false
          video.volume = 0.5
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

  return (
    <main className={`bg-black flex min-h-screen flex-col items-center justify-center vertical-content`}    >
      <AnimatePresence  >
        {!showVideo && <motion.div
          key={"1"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: closing ? 1 : 0, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className='absolute right-10 bottom-10'
        >
          <div className='flex flex-col items-center'>
            <div className='items-center'>
              <div onClick={handleSwithOn} className="inline-flex cursor-pointer p-8 bg-slate-900 rounded-full hover:scale-110 hover:bg-slate-800">
                <FaPowerOff className='w-20 h-20 text-white ' />
              </div>
            </div>
            <Image style={{ objectFit: 'cover' }} height={40} width={300} alt={channel.title} src={"/4netBlancoGradient.png"} />
          </div>
        </motion.div>}
        <motion.div
          key={"2"}
          initial={false}
          animate={{
            width: !showVideo ? 0 : "100%",
            transition: { delay: 0.5, duration: 0.4 }
          }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className='absolute'
        >
          <MediaPlayer
            ref={player}
            id='mediaplayer'
            muted={true}
            autoPlay={true}
            className={`aspect-video bg-black text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4`}
            // title="Sprite Fight"
            src={[{ src: channel.src }]}
            crossOrigin={true}
            playsInline={true}
            title={channel.title}
            onProviderChange={onProviderChange}
            onCanPlay={onCanPlay}
          >
            <MediaProvider />
            <div className={`absolute inset-0 z-10 flex h-full w-full flex-col justify-center items-end -translate-x-7 md:-translate-x-20`}>
              <AnimatePresence >
                {showControl &&
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8, transition: { duration: 0.4 } }}
                    exit={{ opacity: 0.5, transition: { delay: 0.4, duration: 0.2 } }}
                  >
                    <AnimatePresence >
                      {!closing &&
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8, transition: { duration: 0.4 } }}
                          exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        >
                          <div className={`bg-black p-2 rounded-3xl *opacity-80 scale-[65%] md:scale-100`}>
                            <div className="w-[265px] h-[478px] rounded-3xl border-white border-8 flex flex-col" >
                              <div className="w-full h-[85%] flex">
                                <div className="w-1/3 h-full flex flex-col items-center justify-between py-8">
                                  <div onClick={() => { handleSwithOff() }} className="w-[60px] h-[60px]  rounded-full border-4 border-white flex justify-center items-center cursor-pointer" ><FaPowerOff className="w-8 h-8 hover:scale-110" /></div>

                                  <div className="w-[56px] md:w-[52px] h-[138px]  rounded-full border-4 border-white flex flex-col justify-center items-center relative" >
                                    <div className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaPlus className="w-6 h-6" /></div>
                                    <div className="w-full h-1/3 flex justify-center items-center text-lg">Vol</div>
                                    <div className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaMinus className="w-6 h-6" /></div>
                                  </div>
                                  <div onClick={() => { setMute(!mute) }} className="w-[60px] h-[60px]  rounded-full border-4 border-white flex justify-center items-center cursor-pointer" >
                                    {mute
                                      ? <FaVolumeMute className="w-8 h-8 hover:scale-110" />
                                      : <FaVolumeDown className="w-8 h-8 hover:scale-110" />
                                    }
                                  </div>
                                </div>
                                <div className="w-1/3 h-full flex justify-center items-center">
                                  <div className="w-[60px] h-[60px]  rounded-full border-4 border-white flex justify-center items-center cursor-pointer" ><RiHomeLine className="w-8 h-8 hover:scale-110" /></div>
                                </div>
                                <div className="w-1/3 h-full flex flex-col items-center justify-between py-8">
                                  {isPc
                                    ? <div onClick={() => { handleFullScreen() }} className="w-[60px] h-[60px]  rounded-full border-4 border-white flex justify-center items-center cursor-pointer"  >
                                      {fullScreen
                                        ? <FaCompress className="w-8 h-8 hover:scale-110" />
                                        : <FaExpand className="w-8 h-8 hover:scale-110" />}
                                    </div>
                                    : <div className="w-[60px] h-[60px]" />
                                  }

                                  <div className="w-[56px] md:w-[52px] h-[138px]  rounded-full border-4 border-white flex flex-col justify-center items-center" >
                                    <div className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaAngleUp className="w-6 h-6" /></div>
                                    <div className="w-full h-1/3 flex justify-center items-center text-lg">Ch</div>
                                    <div className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaAngleDown className="w-6 h-6" /></div>
                                  </div>
                                  <div className="w-[60px] h-[60px]  rounded-full border-4 border-white flex justify-center items-center cursor-pointer" >
                                    <div className='w-9 h-6 rounded-[4px] border-[3px] border-white flex justify-end items-end p-[2px] hover:scale-110'>
                                      <div className='bg-white w-4 h-2.5 rounded-[2px] border-white' />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='w-full flex-1 flex items-center justify-center pb-6'>
                                <Image style={{ objectFit: 'cover' }} height={10} width={75} alt={channel.title} src={"/4netBlancoGradient.png"} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      }
                    </AnimatePresence>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </MediaPlayer>
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
      `}</style>
        </motion.div>
      </AnimatePresence>
    </main >
  )
}
