import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddToCartComponent from "../productDetail/components/ModalAddToCart.Component";
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { addToCart } from '../../redux/cart.slicer';
import Stars from '../stars/Stars';
import { Link } from 'react-router-dom';
import { deleteFromComparison } from '../../redux/compare.slicer';
import ModalComparisonMsgComponent from '../productDetail/components/ModalComparisonMsg.Component';

const ProductListCompareComponent = ()=>{
    const comparedProductsList = useSelector((state)=>state.compareStore.comparedProducts);
    const dispatch = useDispatch();

    const iconRow = ()=>{
        let iconCells = comparedProductsList.map((el,index)=>{
            return (

                    <td key={index} className='icon-cell'>
                    <div className="icon-remove-holder">
                        <button type='button' className='removeComparisonBtn' 
                                data-bs-toggle="modal" 
                                data-bs-target={`#compareModal${index}`} 
                                onClick={()=>dispatch(deleteFromComparison(index))}>
                        <IoIosRemoveCircleOutline title='Remove' />
                        </button>
                        <ModalComparisonMsgComponent productIndex={index} />

                    </div>
                    </td>
            )
        })

        return iconCells;
    }

    const featureRows = ()=>{

        let productImg = comparedProductsList.map((el,index)=>{
            return(

                <td key={index}>
                    <Link to={'/productDetails/'+el._id} className="productImg-holder">
                        <img src={el.imgUrl} alt={el.title} />
                    </Link>
                </td>)})
        let productTitle = comparedProductsList.map((el,index)=>{
            return(

                <td key={index} className="title-holder">
                    {el.title}
                </td>
                )})

        let productPrice = comparedProductsList.map((el,index)=>{
            return(

                <td key={index} className="price">
                    ${el.price}
                </td>        
                )})


        let productDescription = comparedProductsList.map((el,index)=>{
            return(

                <td key={index} className="description">
                    {el.description}
                </td>      
                )})



        let addBtns = comparedProductsList.map((el,index)=>{
            return(

                <td key={index} className="td-btn">
                    <div className="action-addToCart text-center">
                        <button className='addToCart'
                            onClick={() => dispatch(addToCart(el))} type='button' 
                            data-bs-toggle="modal" data-bs-target={`#cartModal${index}`}>
                            add to cart</button>


                    </div>

                    <ModalAddToCartComponent singleProduct={el} productIndex={index} count={1} />
                </td>

            )
        })

        return (
            <>
                <tr>{productImg}</tr>
                <tr>{productTitle}</tr>
                <tr>{productPrice}</tr>
                <tr>{productDescription}</tr>
                <tr>{addBtns}</tr>
            </>
        )
    }

    const ratingRow = ()=>{
        let ratingCells = comparedProductsList.map((el,index)=>{
            return (
                <td key={index} className="td-rating">

                    <Stars 
                        rating={el.rating}
						all={false}
						ratingStar={el.rating}
                    />

                </td>
            )
        })

        return ratingCells;
    }
    return(
        <>
            <div className="comparisonWrapper">
            {
                comparedProductsList.length ? 
                   ( <table className='tableComparison'>
                    <tbody>
                        <tr>
                            <th rowSpan={6} className="th-features">Features</th>
                            {iconRow()}
                        </tr>
                        {featureRows()}
                        <tr>
                            <th>Rating</th>
                            {ratingRow()}
                        </tr>
                    </tbody>
                    </table>
                   )
                :
                        'There are no products selected for comparison.'
                }

            </div>
        </>
    )
}

export default ProductListCompareComponent;