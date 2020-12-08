import React from "react";

const ConstraintForm = ({ handleInputChange}) => {
    return (<>
        <label>
            Allow empty wells:
              <input
                name='allow_empty_wells' type="checkbox" onChange={handleInputChange}
            />
        </label>
        <label>
            Size of empty edges:
              <input type="number" name='size_empty_edge' onChange={handleInputChange} />
        </label>
    </>
    )

}

export default ConstraintForm