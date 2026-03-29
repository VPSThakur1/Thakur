import React from 'react'
import { createContext, useState, useContext } from 'react'

export const CaptainDataContext = createContext();

// export const useCaptain = () => {
//     const context = useContext(CaptainContext);

//     if(!context) {
//         throw new Error('useCaptain must be a used within a Captain Provider')
//     }

//     return context;
// };

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error , setError] = useState(null);

    // console.log("CaptainContext Rendered. Captain =", captain);
    const updateCaptain = (captainData) => {
        setCaptain(captainData.data.data);
    }

    const value = {
        captain, 
        setCaptain, 
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return(
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}


export default CaptainContext