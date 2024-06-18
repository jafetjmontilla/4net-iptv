import { Mano } from '@/Components/icons';
import myGif from '../public/Logotipo Animado 2.gif'
import { Component, createRef, useEffect, useRef, useState } from 'react';
import { GiArrowCursor } from "react-icons/gi";
import { PiCursor } from "react-icons/pi";
import { RxCursorArrow } from "react-icons/rx";



export default function Animate(props) {
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const handleGifLoaded = () => {
    setHasPlayedOnce(true);
  };

  useEffect(() => {
    console.log(hasPlayedOnce)
  }, [hasPlayedOnce])

  setTimeout(() => {
    handleGifLoaded()
  }, 4000);

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='w-40 h-40'>
          {hasPlayedOnce ? null : <img src="Logotipo Animado 1.gif" alt="GIF" onLoad={handleGifLoaded} />}
        </div>
      </div>
      <div className='w-full flex justify-center items-center space-x-4'>
        <Mano className={"text-white w-28 h-28"} />
        <div className='capitalize* text-3xl flex flex-col'>
          <span >Pulsa la pantalla </span>
          <span >para ver la Tv</span>
        </div>
      </div>
      <div className='w-full flex justify-center items-center space-x-4'>
        <RxCursorArrow className={"text-white w-16 h-16"} />
        <div className='capitalize* text-3xl flex flex-col'>
          <span >Haz click en la pantalla </span>
          <span >para ver la Tv</span>
        </div>
      </div>
    </>

  );
}