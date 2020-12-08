import React from "react";

const ExperimentForm = ({handleInputChange}) => {
    return (<>
        <label>
            Plate rows: 
              <input type="number" name='num_rows' onChange={handleInputChange} />
        </label>
        <label>
            Plate columns:
              <input type="number" name='num_cols' onChange={handleInputChange} />
        </label>
        <label>
            Vertical:
              <input
                name='vertical_cell_lines' type="checkbox" onChange={handleInputChange}
            />
        </label>
        <label> 
            Horizontal:
              <input
                name='horizontal_cell_lines' type="checkbox" onChange={handleInputChange}
            />
        </label>
    </>
    )

}

export default ExperimentForm