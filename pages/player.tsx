import '@vidstack/react/player/styles/base.css';
import { useEffect, useRef } from 'react';

import {
  Controls,
  // isHLSProvider,
  MediaPlayer,
  MediaProvider,
  ScreenOrientationLockType,
  // Poster,
  // Track,
  // type MediaCanPlayDetail,
  // type MediaCanPlayEvent,
  // type MediaPlayerInstance,
  // type MediaProviderAdapter,
  // type MediaProviderChangeEvent,
} from '@vidstack/react';
import { useRouter } from 'next/router';



interface MyScreenOrientation extends ScreenOrientation {
  lock(orientation: ScreenOrientationLockType): Promise<void>;
}

export default function Player() {
  const router = useRouter()
  // let player = useRef<MediaPlayerInstance>(null);

  // useEffect(() => {
  //   // Subscribe to state updates.
  //   const video = document.querySelector("video")
  //   return player.current!.subscribe((state) => {
  //     console.log(10004, video)

  //     console.log('is muted?', '->', state.muted);
  //     console.log('is paused?', '->', state.paused);
  //     console.log('is audio view?', '->', state.viewType);
  //   });
  // }, []);



  // function onProviderChange(
  //   provider: MediaProviderAdapter | null,
  //   nativeEvent: MediaProviderChangeEvent,
  // ) {
  //   // We can configure provider's here.
  //   if (isHLSProvider(provider)) {
  //     provider.config = {};
  //   }
  // }


  // // We can listen for the `can-play` event to be notified when the player is ready.
  // function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
  //   console.log(10001, detail)
  //   // ...
  // }

  useEffect(() => {
    const handlePopstate = () => {
      console.log('El usuario presionó el botón de volver');
      alert("algo1")
      // Aquí puedes agregar la lógica que deseas ejecutar
    };
    const handleFull = (e: any) => {
      if (!document.fullscreenElement) {
        //router.push("/")
      }
      // Aquí puedes agregar la lógica que deseas ejecutar
    };
    // Agrega el evento al cargar el componente
    window.addEventListener('popstate', handlePopstate);
    window.addEventListener('fullscreenchange', handleFull);
    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('fullscreenchange', handleFull);
    };
  }, []);

  return (
    <div className='w-[400] bg-red'>
      <button className='w-10 h-4 bg-green-300 text-white' type='button' onClick={() => {
        const video: HTMLVideoElement | null = document.querySelector("video")
        const container: any | null = document.getElementById("mediaplayer")
        if (video) {
          console.log(4441114, video)

          video.muted = !video.muted
          video.volume = 0.5
          console.log(video?.volume)
          container.requestFullscreen()

          // if (video.requestFullscreen) {
          //   video.requestFullscreen({ navigationUI: "hide" });
          //   // (screen.orientation as MyScreenOrientation).lock('landscape')
          //   //   .then()
          //   //   .catch((error: any) =>
          //   //     console.log(10004, error)
          //   //   )
          // }
        }
      }}>sound</button>
      <div className=' w-[400px]'>
        <MediaPlayer
          id='mediaplayer'
          muted={true}
          autoPlay={true}
          className="aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
          // title="Sprite Fight"
          src={[{ src: 'https://airtek.tv/livestream/ANTV.m3u8', type: "video/mp4" }]}
          crossOrigin={true}
          playsInline={true}

        >
          <MediaProvider>
          </MediaProvider>
          <Controls.Root className={`absolute inset-0 z-10 flex h-full w-full flex-col justify-center items-center`}>
            <Controls.Group>
              <div className="w-10 h-10 bg-red-500 " />
            </Controls.Group>

          </Controls.Root>
        </MediaPlayer>
      </div>
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
    </div>
  );
}
