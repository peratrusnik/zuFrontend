import {useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import {BsTrash} from 'react-icons/bs';
import Stars from '../../stars/Stars';
import CompareBtnDetailPageComponent from '../../productDetail/components/CompareBtnDetailPage.Component';
import {Link} from 'react-router-dom';
import { removeFromWishList } from '../../../services/user.service';
import { saveUser } from '../../../redux/user.slicer';
import { setUserToLocalStorage } from '../../../services/auth.service';
import {getFromWishList} from '../../../services/user.service';
import ModalAddToCartComponent from '../../productDetail/components/ModalAddToCart.Component';
import { addToCart } from '../../../redux/cart.slicer';

const OneProductInWishlistComponent = ({singleProduct, index,setWishListProduct})=>{

    const { user } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();

    let { userId } = useParams();

    const deleteFromWishList = () => {
		removeFromWishList({
			userId: user._id,
			product: singleProduct._id,
		})
			.then((res) => {
				dispatch(saveUser(res.data));
				setUserToLocalStorage(res.data);
                getFromWishList(userId)
			    .then((res) => setWishListProduct(res.data))
			    .catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

    return(
        <>
            <tr className='firstRow'>
                <td rowSpan={3} className='td-index'>
                    {index+1}
                </td>
                <td rowSpan={3} className='td-img'>
                    <div className="imgHolder">
                        <Link to={`/productDetails/${singleProduct._id}`}>
                            <img src={singleProduct.imgUrl} alt={singleProduct.title} className="productImg" />
                        </Link>

                    </div>
                </td>
                <td colSpan={1} className='td-title'>
                        <Link to={`/productDetails/${singleProduct._id}`} className='title-link-wishlist'>
                            {singleProduct.title}
                        </Link>
                </td>
                <td rowSpan={3} className='td-compare'>
                    <CompareBtnDetailPageComponent singleProduct={singleProduct} productIndex={index} />
                </td>
                <td rowSpan={3}>
                        <button
							className='addToCart'
							onClick={() => dispatch(addToCart(singleProduct))} 
                            type='button' 
                            data-bs-toggle="modal" 
                            data-bs-target={`#cartModal${index}`}>

							add to cart
						</button>
						<ModalAddToCartComponent

							singleProduct={singleProduct}
                            productIndex={index}
                            count={1}

						/>
                </td>
                <td rowSpan={3} className='td-trash'>
                    <div title='Remove from Wishlist' className="trashIcon-holder" onClick={()=>deleteFromWishList()}>
                        <BsTrash />
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={1} className='td-rating'>
                    <Stars 
                    rating={singleProduct.rating}
                    all={false}
                    ratingStar={singleProduct.rating}
                />
                </td>

            </tr>
            <tr>
                <td className='td-price'>${singleProduct.price}</td>

            </tr>
        </>

    )
}

export default OneProductInWishlistComponent;