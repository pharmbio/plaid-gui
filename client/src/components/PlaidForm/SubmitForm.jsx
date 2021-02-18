import FormButtons from "./FormButtons/FormButtons"
import DownloadConfigJson from "./DownloadConfigJson";


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
        <DownloadConfigJson experimentForm={experimentForm} compoundForm={compoundForm} controlForm={controlForm}></DownloadConfigJson>
        <button type="button" title="Submit" onClick={() => onClick("submit")}>  </button>
        <FormButtons
            step={3}
            onClickPrev={() => onClick("prev")}
        />

    </>)
}

export default SubmitForm;