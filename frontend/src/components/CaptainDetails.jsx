import React, { useContext} from 'react'
import { CaptainDataContext } from "../context/CaptainContext.jsx"

const CaptainDetails = () => {

  const { captain } = useContext(CaptainDataContext)

  return (
    <div>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-1'>
              <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIyTZVXyb90oYHRiiX6YkNUc0CnzGwWjI3Q&s" alt="" />
              <h4 className='text-lg font-semibold capitalize'>{captain?.fullName?.firstName + " " + captain?.fullName?.lastName}</h4>
            </div>
            <div>
              <h4 className='text-xl font-semibold'>₹193.20</h4> 
              <p className='text-sm text-gray-600'>Earned</p>
            </div>
          </div>

          <div className='flex mt-8 p-3 bg-gray-100 rounded-2xl justify-center gap-5 items-start'>
            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-500'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-dashboard-2-fill"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-500'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-500'>Hours Online</p>
            </div>
          </div>
    </div>
  )
}

export default CaptainDetails