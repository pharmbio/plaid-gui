import FormButtons from "./FormButtons/FormButtons"
import DownloadResultJson from "../PlateLayout/DownloadResultJson";


const SubmitForm = ({ handleNext, handlePrev, experimentForm, compoundForm, controlForm }) => {
    const onClick = (action) => {
        if (action === "submit") {
            handleNext();
        } else if (action === "prev") {
            handlePrev();
        }
        else {

        }
    };

    return (<>
        <DownloadResultJson action={"config"} experimentForm={experimentForm} compoundForm={compoundForm} controlForm={controlForm}></DownloadResultJson>
        <button type="button" title="Submit" onClick={() => onClick("submit")}>  </button>
        <FormButtons
            step={3}
            onClickPrev={() => onClick("prev")}
        />

    </>)
}

export default SubmitForm;