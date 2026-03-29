import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(() => {
    if(finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])


  return (
    <div className='h-screen relative'>
        
        <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
          <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
          <Link to={'/captain-login'}  className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-xl font-bold ri-logout-box-line"></i>
          </Link>
        </div>

        <div className='h-4/5'>
            <img className='h-full w-full object-cover'
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>

        <div onClick={() => {
            setFinishRidePanel(true)
        }} className='h-1/5 p-6 flex relative items-center justify-between bg-yellow-300'>
        <h5 onClick={() => {}}
         className='p-1 text-center w-[93%] absolute top-0'><i className="text-2xl text-gray-600 ri-arrow-up-wide-line"></i></h5>
          <h4 className='text-xl font-semibold'>4 KM away</h4>
          <button className='bg-green-600 text-white font-semibold px-10 p-3 rounded-xl'>Complete Ride</button>
        </div>

        <div ref={finishRidePanelRef} className='w-full h-screen translate-y-full fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white'>
          <FinishRide setFinishRidePanel={setFinishRidePanel}/>
        </div>
       
    </div>
  )
}

export default CaptainRiding