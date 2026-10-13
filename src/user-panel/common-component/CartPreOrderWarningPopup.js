
import React, { useState } from 'react';
import "../../CustomPopup.css";
import API from '../../API'
import FixedOverlayLoadingSpinner from "../../FixedOverlayLoadingSpinner"

import ErrorModal from "../../ErrorModal";
const LocationCollectionPopup = ({setterFunction, okClickedFunction}) => {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSecondScreenShown,showSecondScreen]=useState(false)

    

    const [selectedLocation, setSelectedLocation] = useState(null);

  

    

    return (
        <div className='custom-modal location-collection-modal'>
            <div className='card'>
                
                    <div className='main-screen'>
                        <h1>Warning!</h1>
                        <p>Your cart includes a pre-order item. Its price is based on the product's base price but may vary on delivery day due to market fluctuations. Any price difference will be settled with an extra payment or refund. Proceed with checkout?</p>
                        
                        <div className='footer '>
                        <button type='button' className='ok-button' onClick={okClickedFunction}>Proceed</button>
                        <button type='button' className='cancel-button' onClick={()=>setterFunction(false)}>Cancel</button>

                        </div>
                    </div>
                    
                
            </div>
            <ErrorModal message={message} state={isErrorModalOpen} setterFunction={setIsErrorModalOpen} okClickedFunction={() => { window.location.reload() }} />
            {isLoading && <FixedOverlayLoadingSpinner />}

        </div>
    );
};

export default LocationCollectionPopup;

