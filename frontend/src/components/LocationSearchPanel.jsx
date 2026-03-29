import React from 'react'

const LocationSearchPanel = ({suggestions = [], setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if(activeField === 'pickup') {
            setPickup(suggestion.description)
        } else if (activeField === 'destination') {
            setDestination(suggestion.description)
        }
    }

    // const locations = [
    //     "91, Vaishali Nagar, House no 554, Bhopal",
    //     "92, Vaishali Nagar, House no 554, Bhopal",
    //     "93, Vaishali Nagar, House no 554, Bhopal",
    //     "94, Vaishali Nagar, House no 554, Bhopal"
    // ]

  return (
    /*
    <div>
        {
            locations.map(function(elem, idx){
                return (
                    <div key={idx}
                    onClick={() => {
                        props.setVehiclePanelOpen(true)
                        props.setPanelOpen(false)
                    }}
                     className='flex p-3 border-2 gap-4 border-gray-100 active:border-black my-2 rounded-xl items-center justify-start'>
                        <h2 className='bg-[#eee] h-8 flex rounded-full items-center justify-center w-16'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div> )
            })
        }
        
    </div>
    */
    <div>
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem.description}</h4>
                    </div>
                ))
            }
        </div>
  )
}

export default LocationSearchPanel