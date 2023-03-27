import {HiXCircle} from "react-icons/hi";
const ModalComparisonMsgComponent = ({showComparisonMsg,productIndex})=>{

    const checkComparisonMsg = ()=>{
        if(showComparisonMsg){
           return showComparisonMsg();
        }else{
            return 'The product has been removed from the product comparison';
        }
    }

    const checkIndex = ()=>{
		if(Number.isInteger(productIndex)){
			return `compareModal${productIndex.toString()}`;
		}
		else{
			return "compareModal";
		}
	}

    return(
        <div class="modal fade" id={checkIndex()} tabIndex="-1" aria-labelledby="compareModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content custom-comparisonContent">
                        <div class="modal-header border border-0 custom-comparisonHeader p-0">

                            <button type="button" title='Close' class="custom-comparisonBtn-close border border-0" data-bs-dismiss="modal" aria-label="Close">
                                <HiXCircle />
                            </button>
                        </div>
                        <div class="modal-body text-center">
                        {checkComparisonMsg()}
                        </div>
                    </div>
                </div>
            </div>    
    )
}

export default ModalComparisonMsgComponent;