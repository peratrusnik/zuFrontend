import {HiXCircle} from "react-icons/hi";
const ModalComparisonMsgComponent = ({showComparisonMsg, productIndex})=>{

    const checkComparisonMsg = () => {
        if (showComparisonMsg) {
           return showComparisonMsg();
        }else{
            return 'The product has been removed from the product comparison';
        }
    }

    const checkIndex = () => {
		if(Number.isInteger(productIndex)? Number.isInteger(productIndex) : productIndex){
			return `compareModal${productIndex.toString()}`;
		}
		else{
			return "compareModal";
		}
	}

    return(
        <div className="modal fade" id={checkIndex()} tabIndex="-1" aria-labelledby="compareModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-comparisonContent">
                        <div className="modal-header border border-0 custom-comparisonHeader p-0">

                            <button type="button" title='Close' className="custom-comparisonBtn-close border border-0" data-bs-dismiss="modal" aria-label="Close">
                                <HiXCircle />
                            </button>
                        </div>
                        <div className="modal-body text-center">
                        {checkComparisonMsg()}
                        </div>
                    </div>
                </div>
            </div>    
    )
}

export default ModalComparisonMsgComponent;