// import { useState,useEffect } from 'react';
// import { IoMdShuffle,IoIosRemoveCircle } from 'react-icons/io';
// import { useDispatch, useSelector } from 'react-redux';
// import { addForComparison, deleteFromComparison } from '../../../redux/compare.slicer';
// import ModalComparisonMsgComponent from './ModalComparisonMsg.Component';


// const CompareBtnDetailPageComponent = ({singleProduct, productIndex})=>{

//     const [isCompared, setIsCompared] = useState(false);
//     const comparedProductsList = useSelector((state)=>state.compareStore.comparedProducts);
//     const dispatch = useDispatch();

//     useEffect(()=>{

//         if(comparedProductsList.length){

//             let productCompared = comparedProductsList.find((el)=>{
//                 return el._id === singleProduct._id;
//             })

//             if(productCompared && comparedProductsList.length <= 2){
//                 setIsCompared(true);
//             }else{
//                 setIsCompared(false);
//             }


//         }else{
//             setIsCompared(false);
//         }


//     },[singleProduct])

//     const handleComparison = ()=>{

//         let comparedProductIndex = null;

//         comparedProductsList.find((el, index)=>{
//             if(el._id === singleProduct._id){
//                 comparedProductIndex = index;
//             }

//             return el._id === singleProduct._id;
//         })

//         if(Number.isInteger(comparedProductIndex)){

//             setIsCompared(false);
//             dispatch(deleteFromComparison(comparedProductIndex));

//         }else{

//             if(comparedProductsList.length < 2){
//                 setIsCompared(true);
//                 dispatch(addForComparison(singleProduct));
//             }
//         }

//     }

//     const showComparisonMsg = ()=>{

//         if(isCompared && comparedProductsList.length <= 2){
//             return 'The product has been added to product comparison';
//         }else if(!isCompared && comparedProductsList.length === 2){
//             return 'There are already two products added for comparison'
//         }else if(!isCompared){
//             return 'The product has been removed from the product comparison'
//         }

//     }

//     return(
//         <>
// 			<button type='button' className='compare' data-bs-toggle="modal"
//                 data-bs-target={`#compareModal${productIndex}`} onClick={()=>handleComparison()}>
// 				<div className='custom-title-compare'>
// 					<div className='helper-triangle'></div>
// 						Compare
// 				</div>
//                 {isCompared ? <IoIosRemoveCircle /> : <IoMdShuffle />}

// 			</button>

//             <ModalComparisonMsgComponent showComparisonMsg={showComparisonMsg} productIndex={productIndex} />
//         </>
//     )
// }

// export default CompareBtnDetailPageComponent;


import { useState,useEffect } from 'react';
import { IoMdShuffle,IoIosRemoveCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { addForComparison, deleteFromComparison } from '../../../redux/compare.slicer';
import ModalComparisonMsgComponent from './ModalComparisonMsg.Component';


const CompareBtnDetailPageComponent = ({singleProduct})=>{

    const [isCompared, setIsCompared] = useState(false);
    const comparedProductsList = useSelector((state)=>state.compareStore.comparedProducts);
    const dispatch = useDispatch();

    useEffect(()=>{

        if(comparedProductsList.length){

            let productCompared = comparedProductsList.find((el)=>{
                return el._id === singleProduct._id;
            })

            if(productCompared){ 
                setIsCompared(true);
            }else{
                setIsCompared(false);
            }


        }else{
            setIsCompared(false);
        }


    },[singleProduct])

    const handleComparison = ()=>{

        let comparedProductIndex = null;

        comparedProductsList.find((el, index)=>{
            if(el._id === singleProduct._id){
                comparedProductIndex = index;
            }

            return el._id === singleProduct._id;
        })

        if(Number.isInteger(comparedProductIndex)){

            setIsCompared(false);
            dispatch(deleteFromComparison(comparedProductIndex));

        }else{

            if(comparedProductsList.length < 2){
                setIsCompared(true);
                dispatch(addForComparison(singleProduct));
            }
        }

    }

    const showComparisonMsg = ()=>{

        if(isCompared){ 
            return 'The product has been added to product comparison';
        }else if(!isCompared && comparedProductsList.length === 2){
            return 'There are already two products added for comparison' 
        }else if(!isCompared){
            return 'The product has been removed from the product comparison'
        }

    }

    return(
        <>
			<button type='button' className='compare' data-bs-toggle="modal" 
                data-bs-target="#compareModal" onClick={()=>handleComparison()}>
				<div className='custom-title-compare'>
					<div className='helper-triangle'></div>
						Compare
				</div>
                {isCompared ? <IoIosRemoveCircle /> : <IoMdShuffle />}

			</button>

            <ModalComparisonMsgComponent showComparisonMsg={showComparisonMsg} />        
        </>
    )
}

export default CompareBtnDetailPageComponent;