import React, { useState } from "react";


const ExperimentForm = () => {

    return (
        <form>
            <label>
                Plate rows:
              <input type="text" />
            </label>
            <label>
                Plate columns:
              <input type="text" />
            </label>
            <label>
                Vertical:
              <input
                    name="isGoing" type="checkbox"
                />
            </label>
            <label>
                Horizontal:
              <input
                    name="isGoing" type="checkbox"
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )

}

export default ExperimentForm