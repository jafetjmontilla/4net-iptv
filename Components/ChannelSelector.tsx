import { AnimatePresence, motion } from "framer-motion";
import { FC, SetStateAction, Dispatch } from "react"
import { IoClose } from "react-icons/io5";


interface props {
  showChannels: boolean
  setShowChannels: Dispatch<SetStateAction<boolean>>
}
export const ChannelSelector: FC<props> = ({ showChannels, setShowChannels }) => {
  console.log("aqui")

  return (
    <AnimatePresence >
      {showChannels &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { delay: 0, duration: 0.3 } }}
          className='h-[100vh] w-[178px] md:w-[281px] bg-yellow-500 fixed top-0 right-0 -translate-x-[54px] md:-translate-x-20 z-20 rounded-2xl'
        >
          <div onClick={() => { setShowChannels(false) }} className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500 right-0 opacity-50 absolute translate-x-12 translate-y-8 md:translate-x-14 md:translate-y-20 text-black flex justify-center items-center cursor-pointer hover:scale-110'>
            <IoClose className='w-8 h-8 text-black' />
          </div>
        </motion.div>
      }
    </AnimatePresence>



  )
}