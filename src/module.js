import React from 'react';


const Module = ({ isOpen, onClose, setModuleOpen, holidayInfo, holidayName }) => {

    if (isOpen !== true) return null

    return (
        <div className={`Module ${ isOpen ? '' : 'notVis' }`}>
            <div className="moduleBody">
                <div className="moduleHeader">

                    <h2>{holidayName}</h2>
                    <button onClick={() => {setModuleOpen(false)}}>Close</button>
                </div>
                <p>{holidayInfo}</p>

            </div>
        </div>
    )
}

export default Module