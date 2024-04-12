import '@vidstack/react/player/styles/base.css';
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { isHLSProvider, MediaPlayer, MediaProvider, ScreenOrientationLockType, MediaCanPlayDetail, MediaCanPlayEvent, MediaProviderAdapter, MediaProviderChangeEvent, MediaPlayerInstance, Controls, VolumeSlider } from '@vidstack/react';
import { Channel, channelsList } from "../utils/channels"
import { FaAngleDown, FaAngleUp, FaCompress, FaExpand, FaMinus, FaPlus, FaPowerOff } from "react-icons/fa6";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { RiHomeLine } from 'react-icons/ri';
import { PictureInPictureExitIcon, PictureInPictureIcon } from '@vidstack/react/icons';


interface MyScreenOrientation extends ScreenOrientation {
  lock(orientation: ScreenOrientationLockType): Promise<void>;
}

interface dataStoragePros {
  numberChannel: number
  volume: number
}

export default function Home() {
  const [showVideo, setShowVideo] = useState<boolean>(false)
  const [channel, setChannel] = useState<Channel>(channelsList[1])
  const [showControl, setShowControl] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [isPc, setIsPc] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.1);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [showThumb, setShowThumb] = useState<boolean>(false);
  const [showPIP, setShowPIP] = useState<boolean>(false);
  const [eventForUser, setEventForUser] = useState<boolean>(false);
  const [waitingConfirmation, setWaitingConfirmation] = useState<boolean>(false);
  const [triggerClosePIP, setTriggerClosePIP] = useState<number | null>(null);

  useEffect(() => {
    if (showVideo && channel && volume) {
      const dataStorage = { numberChannel: channel.numberChannel, volume }
      console.log("**************", volume)
      localStorage.setItem("Tv", JSON.stringify(dataStorage));
    }
  }, [channel, volume])

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
    document.addEventListener('click', handleMouseLeave);

    return () => {
      clearTimeout(valirTimeout);
      document.removeEventListener('mousemove', handleMouseLeave);
      document.removeEventListener('click', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Subscribe to state updates.
    return player.current!.subscribe((state: any) => {
      console.log(channel?.title)
      console.log('is volume?', '->', state.volume);
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
    const exitChannel = { ...channel, title: "", logo: "", src: "" }
    const video: HTMLVideoElement | null = document.querySelector("video")
    if (document.pictureInPictureElement === video) {
      setEventForUser(true)
      setTimeout(() => {
        setShowPIP(false)
      }, 1500);
      await document.exitPictureInPicture();
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
      if (container?.requestFullscreen) {
        setFullScreen(true)
        container?.requestFullscreen({ navigationUI: "hide" });
        (screen.orientation as MyScreenOrientation).lock('landscape')
          .then()
          .catch((error: any) =>
            console.log(10004, error)
          )
        const video: HTMLVideoElement | null = document.querySelector("video")
        if (document.pictureInPictureElement === video) {
          video?.play()
          setEventForUser(true)
          setShowPIP(false)
          await document.exitPictureInPicture();
        }
      }
    }
  }

  useEffect(() => {
    let dataStorage: dataStoragePros = JSON.parse(localStorage.getItem("Tv") ?? "{}");
    if (showVideo) {
      localStorage.setItem("Tv", JSON.stringify(dataStorage));
    }
  }, [])

  const handleSwithOn = () => {
    let dataStorage: dataStoragePros = JSON.parse(localStorage.getItem("Tv") ?? "{}");
    setClosing(false)
    setTimeout(() => {
      setShowVideo(true)
      const f1 = channelsList.findIndex(elem => elem.numberChannel === dataStorage?.numberChannel ?? 101)
      setChannel(channelsList[f1])
      setTimeout(() => {
        const video: HTMLVideoElement | null = document.querySelector("video")
        const container: any | null = document.getElementById("mediaplayer")
        if (video) {
          video.muted = false
          video.volume = dataStorage?.volume ?? 0.1
          setVolume(video.volume)
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

  const volumeChange = (value: number) => {
    const video: HTMLVideoElement | null = document.querySelector("video")
    if (video) {
      let volumeNew = video.volume + value
      if (volumeNew < 0) volumeNew = 0
      if (volumeNew > 1) volumeNew = 1
      if (volumeNew >= 0 && volumeNew <= 1) {
        video.volume = volumeNew
        setVolume(video.volume)
      }
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
    if (triggerClosePIP) {
      //se ejectuta sino es generado por intervencion del usuario
      if (!eventForUser) {
        const video: HTMLVideoElement | null = document.querySelector("video")
        if (video) {
          setTimeout(() => {
            //click en volver a la pestaña
            if (!video.paused) {
              if (isPc) {
                setShowPIP(false)
              }
              if (!isPc) {
                setShowPIP(false)
                setWaitingConfirmation(true)
                console.log("primero pausar y despues haciendo click en el div: darle play quitar div superpuesto, y espandir a pantalla completa ")
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
    if (video && !showPIP) {
      setShowPIP(true)
      await video.requestPictureInPicture();
      video.addEventListener('leavepictureinpicture', () => { setTriggerClosePIP(new Date().getTime()) });
      return
    }
    if (document.pictureInPictureElement === video) {
      setEventForUser(true)
      await document.exitPictureInPicture();
      if (!isPc) {
        setWaitingConfirmation(true)
      }
      setShowPIP(false)
      video?.play()
    }
  }

  const handleChannel = async (action: number) => {
    let idx = channelsList.findIndex(elem => elem.numberChannel === channel?.numberChannel)
    idx = idx + action
    if (idx === 0) {
      idx = channelsList.length - 1
    }
    if (idx === channelsList.length) {
      idx = 1
    }
    console.log(100014, { idx })
    setChannel(channelsList[idx])
  }

  return (
    <main
      onClick={() => {
        waitingConfirmation && handleFullScreen()
        setWaitingConfirmation(false)
      }}
      className={`bg-black flex min-h-screen flex-col items-center justify-center vertical-content`}    >
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
            <Image style={{ objectFit: 'cover' }} height={40} width={300} alt={channel?.title} src={"/4netBlancoGradient.png"} />
          </div>
        </motion.div>}
        {showPIP && <div className='top-0 left-0 w-[100vw] h-[100vh] bg-black fixed z-10 flex justify-center text-xs md:text-sm pt-10' >
          Reproduciendo en modo pantalla en pantalla
        </div>}

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
            muted={!showVideo}
            autoPlay={true}
            volume={0.1}
            className={`aspect-video bg-black text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4`}
            // title="Sprite Fight"
            src={[{ src: channel?.src }]}
            crossOrigin={true}
            playsInline={true}
            title={channel?.title}
            onProviderChange={onProviderChange}
            onCanPlay={onCanPlay}>
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

                                  <div
                                    onMouseEnter={() => setShowThumb(true)}
                                    onMouseLeave={() => setShowThumb(false)}
                                    className="w-[56px] md:w-[52px] h-[138px]  rounded-full border-4 border-white flex flex-col justify-center items-center relative" >
                                    <div className='w-[10px] h-[90px] absolute -translate-x-[66px]'>
                                      <VolumeSlider.Root
                                        className="group relative *my-[7.5px] inline-flex w-10 h-full max-h-[90px] cursor-pointer touch-none select-none items-center outline-none *aria-hidden:hidden justify-end"
                                        orientation="vertical"
                                      >
                                        <VolumeSlider.Track className="relative ring-sky-400 z-0 w-[5px] h-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px] rotate-180">
                                          <VolumeSlider.TrackFill defaultValue={0.1} className="bg-indigo-400 absolute w-full h-[var(--slider-fill)] rounded-sm will-change-[height]" />
                                        </VolumeSlider.Track>
                                        <VolumeSlider.Thumb className={`absolute bottom-[var(--slider-fill)] z-20 h-[10px] w-[10px] translate-x-1/4 translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity ${showThumb && "opacity-100"} group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[bottom]`} />
                                      </VolumeSlider.Root>
                                    </div>
                                    <div onClick={() => { volumeChange(0.05) }} className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaPlus className="w-6 h-6" /></div>
                                    <div className="w-full h-1/3 flex justify-center items-center text-lg">Vol</div>
                                    <div onClick={() => { volumeChange(-0.05) }} className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaMinus className="w-6 h-6" /></div>
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
                                    <div onClick={() => { handleChannel(-1) }} className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaAngleUp className="w-6 h-6" /></div>
                                    <div className="w-full h-1/3 flex justify-center items-center text-lg">Ch</div>
                                    <div onClick={() => { handleChannel(1) }} className="w-full h-1/3 flex justify-center items-center cursor-pointer hover:scale-110"><FaAngleDown className="w-6 h-6" /></div>
                                  </div>
                                  <div onClick={handlePIP} className="w-[60px] h-[60px]  rounded-full border-4 border-white flex justify-center items-center cursor-pointer" >
                                    {!showPIP ?
                                      <PictureInPictureIcon className="w-11 h-11 hover:scale-110" />
                                      :
                                      <PictureInPictureExitIcon className="w-10 h-10 hover:scale-110" />
                                    }
                                    {/* <div className='w-9 h-6 rounded-[4px] border-[3px] border-white flex justify-end items-end p-[2px] hover:scale-110'>
                                      <div className='bg-white w-4 h-2.5 rounded-[2px] border-white' />
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className='w-full flex-1 flex items-center justify-center pb-6'>
                                <Image style={{ objectFit: 'cover' }} height={10} width={75} alt={channel?.title} src={"/4netBlancoGradient.png"} />
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
