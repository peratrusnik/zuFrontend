import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleCartComponent from './components/SingleCart.Component';
import { clearCart } from '../../redux/cart.slicer';
import { Link, redirect } from 'react-router-dom';

function CartComponent() {
	const { cart, totalCount, totalPrice } = useSelector(
		(state) => state.cartStore
	);
	const dispatch = useDispatch()

	const handleClearCart = () => {
		dispatch(clearCart())
	}

	return (
		<div className='singleCart'>
			<div className='singleCart-Left'>
				<div className='singleCart-Left-Header'>
					<h3>Product</h3>
					<div className='singleCart-Left-Header-Info'>
						<p>Price</p>
						<p>Quantity</p>
						<p>Subtotal</p>
					</div>
				</div>
				{cart.map((el, index) => {
					return (
						<>
							<SingleCartComponent
								item={el}
								key={index}
								index={index}
							/>
							<hr />
						</>
					);
				})}
			</div>
			<div className='singleCart-Right mb-5'>
				<div className='cartHeader'>
					<h3>Cart Total</h3>
				</div>
				<div className='forPay'>
					<h3>Total for pay:</h3>
					<p>${totalPrice}</p>
				</div>
				<div className="clearWrapper m-2 d-flex justify-content-end">
					<button className='btn btn-danger' onClick={() => { if (window.confirm(`Are you sure want to delete all products from cart?`)) { handleClearCart() } }}>Clear cart</button>
				</div>
			</div>
		</div>
	);
}

export default CartComponent;
