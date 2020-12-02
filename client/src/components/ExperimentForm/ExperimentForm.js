import React, { useState } from "react";

const ExperimentForm = ({formState, handleInputChange }) => {
    return (<>
        <label>
            Plate rows: 
              <input type="number" name='rows' onChange={handleInputChange} />
        </label>
        <label>
            Plate columns:
              <input type="number" name='columns' onChange={handleInputChange} />
        </label>
        <label>
            Vertical:
              <input
                name="isGoing" name='vertical' type="checkbox" onChange={handleInputChange}
            />
        </label>
        <label> 
            Horizontal:
              <input
                name="isGoing" name='horizontal' type="checkbox" onChange={handleInputChange}
            />
        </label>
    </>
    )

}

export default ExperimentForm