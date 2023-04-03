import React, {useState, useEffect} from 'react';
import {AiFillEye} from 'react-icons/ai'

import {useDispatch, useSelector} from 'react-redux';
import { addToWishList, removeFromWishList } from '../../../services/user.service';
import { saveUser } from '../../../redux/user.slicer';
import { setUserToLocalStorage } from '../../../services/auth.service';
import { HiHeart } from 'react-icons/hi';
import { IoMdShuffle,IoIosRemoveCircle } from 'react-icons/io';
import { addForComparison, deleteFromComparison } from '../../../redux/compare.slicer';
import { toast } from 'react-toastify';
import QuickView from './QuickView';


function CartBoxOnHoverComponent({ ad }) {
    
    const { user } = useSelector((state) => state.userStore);
    const dispatch = useDispatch()
    const [isCompared, setIsCompared] = useState(false);
    const comparedProductsList = useSelector((state) => state.compareStore.comparedProducts);
    
    const [checkProduct, setCheckProduct] = useState('')


    const handleWishList = () => {
        if (user) {
            addToWishList({
                userId: user._id,
                product: ad._id,
            }).then((res) => {
                dispatch(saveUser(res.data));
                setUserToLocalStorage(res.data);
            });
            toast.success("Successfully add to wish list!")
        }
        if (!user) {
            toast.warning("You must be logged in to add product in wishlist!")            
        }
    };

    const deleteFromWishList = () => {
        removeFromWishList({
            userId: user._id,
            product: ad._id,
        })
            .then((res) => {
                dispatch(saveUser(res.data));
                setUserToLocalStorage(res.data);
            })
            .catch((err) => console.log(err));
        toast.warning('Removed from wishlist!')
    };

    useEffect(() => {
        if (comparedProductsList.length) {
            let productCompared = comparedProductsList.find((el) => {
                return el._id === ad._id;
            })
            if (productCompared) {
                setIsCompared(true);
            } else {
                setIsCompared(false);
            }
        } else {
            setIsCompared(false);
        }
    }, [ad])
   
    // console.log(checkProduct._id);
    // console.log(comparedProductsList);

    const HandleCompare = (ad) => {
        
        const handleComparison = () => {

            let comparedProductIndex = null;

            comparedProductsList.find((el, index) => {
                if (el._id === ad._id) {
                    comparedProductIndex = index;
                }
                return el._id === ad._id;
            })

            if (Number.isInteger(comparedProductIndex)) {

                setIsCompared(false);
                dispatch(deleteFromComparison(comparedProductIndex));

            } else {

                if (comparedProductsList.length < 2) {
                    setIsCompared(true);
                    dispatch(addForComparison(ad));
                }
            }
        }

        const showComparisonMsg = () => {
            if (!isCompared && comparedProductsList.length === 2) {
                return toast.info('There are already two products added for comparison')
            } else if (isCompared) {
                return toast.error('The product has been removed from the product comparison')                
            }
            else {                
                if (!isCompared) {
                    return toast.success('The product has been added to product comparison')
                }
            }        
    }        
        handleComparison()
        showComparisonMsg()   
    }
    const HandleQuickView = (ad) => {
        toast(<QuickView ad={ad} />,
            {
                autoClose: false,
                closeButton: true,
                position: toast.POSITION.TOP_CENTER
            })
    }
    
    return (
        <div className="product-hover-btn">
            <div className="product-view-wrapper">           
                <button className='product-view' onClick={()=>{HandleQuickView(ad)}} ><AiFillEye /></button>            
            </div>
            <div className="product-compare-btn">
                <button className='compare' onClick={() => { HandleCompare(ad)}}>
                    <div className="custom-title-compare">
                    Compare
                    </div>
                    {isCompared ? <IoIosRemoveCircle /> : <IoMdShuffle /> }
                    </button>
            </div>
            <div className="product-wishlist">             
                    {!user?.wishList?.includes(ad._id) ? (
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
             
                    </div>
                <div>
            </div>
        </div>
    );
}

export default CartBoxOnHoverComponent;