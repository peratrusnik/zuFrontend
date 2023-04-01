import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// ICONS
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {HiHeart, HiShoppingCart} from 'react-icons/hi';
import {IoMdShuffle} from 'react-icons/io';
import HeaderComponent from '../headerSection/Header.Component';
import {getSingleDetailProduct} from '../../services/product.service';
import {addToCart} from '../../redux/cart.slicer';
import Stars from '../stars/Stars.jsx';
import ModalAddToCartComponent from './components/ModalAddToCart.Component';
import ProductZoomComponent from './components/ProductZoom.Component';
import SocialNetworkLinksComponent from './components/SocialNetworkLinks.Component';
import ContainerComponent from '../../UIkit/Container.Component';
import CompareBtnDetailPageComponent from './components/CompareBtnDetailPage.Component';
import {
	addToWishList,
	removeFromWishList,
} from '../../services/user.service';
import { setUserToLocalStorage } from '../../services/auth.service';
import { saveUser } from '../../redux/user.slicer';

function ProductDetailComponent() {
    let { id } = useParams();
    const [singleProduct, setSingleProduct] = useState({});
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.userStore);
    const location = useLocation()


    useEffect(() => {
        window.scroll(0, 0)
    }, [location])

    useEffect(() => {
        getSingleDetailProduct(id).then((data) =>
            setSingleProduct(data.data[0])
        );
    }, [id]);

    function handleCount(shevron) {
        // if (shevron) {
        // 	setCount((prevState) => prevState + 1);
        // } else {
        // 	if (count > 1) {
        // 		setCount((prevState) => prevState - 1);
        // 	}
        // }

        if (count + shevron > 0) {
            setCount(count + shevron);
        }
    }

    const handleAddToCart = () => {
        singleProduct.count = count;
        dispatch(addToCart(singleProduct));
    };

    const handleWishList = () => {

        if (user) {
            addToWishList({
                userId: user._id,
                product: singleProduct._id,
            }).then((res) => {
                dispatch(saveUser(res.data));
                setUserToLocalStorage(res.data);
            });
        }

    };

    const deleteFromWishList = () => {
        removeFromWishList({
            userId: user._id,
            product: singleProduct._id,
        })
            .then((res) => {
                dispatch(saveUser(res.data));
                setUserToLocalStorage(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <ContainerComponent isFluid={false}>
                <HeaderComponent title={singleProduct?.title} />
                <div className='productDetail'>
                    <ProductZoomComponent singleProduct={singleProduct} />
                    <div className='rightProductInfo'>
                        <h2 className='title'>{singleProduct?.title}</h2>
                        <Stars
                            rating={singleProduct?.rating}
                            all={false}
                            ratingStar={singleProduct?.rating}
                        />
                        <p className='price'>${singleProduct?.price}</p>
                        <p className='desc'>{singleProduct?.description}</p>
                        <div className='quantity'>
                            <p>Quantity</p>
                            <div className='counter'>
                                <div
                                    className='shevronDown-wrapper'
                                    onClick={() => handleCount(-1)}>
                                    <FaChevronDown />
                                </div>

                                <p>{count}</p>

                                <div
                                    className='shevronUp-wrapper'
                                    onClick={() => handleCount(1)}>
                                    <FaChevronUp />
                                </div>
                            </div>
                        </div>

                        <div className='productAction'>
                        <button
							className='addToCart'
							onClick={() => handleAddToCart()} type='button' data-bs-toggle="modal" data-bs-target="#cartModal">

							<HiShoppingCart />

							add to cart
						</button>
                        <ModalAddToCartComponent
                            handleAddToCart={handleAddToCart}
                            singleProduct={singleProduct}
                            count={count}
                        />
                            
                        	{!user?.wishList?.includes(singleProduct._id) ? (
							<div className='wishlist'>
								<div className='custom-title-wishlist add-wishlist'>
									<div className='helper-triangle'></div>
									Add to Wishlist
								</div>

								<HiHeart onClick={() => {
											handleWishList();
                                    }}
                                />
                            </div>
                                
                                ) : (
                                    <div className='wishlist wishlist-remove-wrapper'>
                                        <div className='custom-title-wishlist remove-wishlist'>
                                            <div className='helper-triangle'></div>
                                            Remove From Wishlist
                                        </div>
        
                                        <HiHeart className='blank-heart'
                                            onClick={() => {
                                                deleteFromWishList();
                                            }}
                                        />
                                    </div>
                                )}
                                <CompareBtnDetailPageComponent singleProduct={singleProduct} productIndex={singleProduct._id} />
                    </div>
                    <ul className='social-network'>
                        <li>
                            <SocialNetworkLinksComponent networkName="Facebook"/>
                        </li>
                        <li>
                            <SocialNetworkLinksComponent networkName="Twitter"/>
                        </li>
                        <li>
                            <SocialNetworkLinksComponent networkName="Instagram"/>
                        </li>
                    </ul>
                </div>
                </div>
            </ContainerComponent>
        </>
    );
}

export default ProductDetailComponent;
