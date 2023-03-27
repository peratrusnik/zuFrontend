import HeaderComponent from '../components/headerSection/Header.Component';
import WishlistProductsComponent from '../components/wishlist/WishlistProducts.Component';
import ContainerComponent from '../UIkit/Container.Component';


function WishListPageComponent() {

	return (
		<ContainerComponent>			
			<div className='wishlist-wrapper'>
				<HeaderComponent title='WishList' />
				<WishlistProductsComponent />
			</div>
		</ContainerComponent>
	);
}

export default WishListPageComponent;