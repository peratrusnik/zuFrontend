import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getFromWishList} from '../../services/user.service';
import OneProductInWishlistComponent from './components/oneProductInWishlist.Component';

const WishlistProductsComponent = ()=>{

    const [wishListProductList, setWishListProduct] = useState([]);

    let { userId } = useParams();

	useEffect(() => {
		getFromWishList(userId)
			.then((res) => setWishListProduct(res.data))
			.catch((err) => console.log(err));
	}, []);
    const renderWishlist = ()=>{
        let productsInWishlist = wishListProductList.map((singleProduct,index)=>{
            return (<OneProductInWishlistComponent key={index} singleProduct={singleProduct} 
                                index={index} setWishListProduct={setWishListProduct} />)
        })

        return productsInWishlist;
    }
    return(
        <>
            {wishListProductList.length > 0 ?
            (
                <div className="table-holder">

                    <table>
                        <tbody>
                         {renderWishlist()}
                        </tbody>
                    </table>
                </div>

            ) :

            (
            <div className="info-holder">
                There are no products in wishlist.
            </div>
            )
        }
        </>
    )
}

export default WishlistProductsComponent;