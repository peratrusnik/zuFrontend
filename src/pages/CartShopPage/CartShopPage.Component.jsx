import { Outlet } from 'react-router-dom';
import HeaderComponent from '../../components/headerSection/Header.Component';
import ContainerComponent from '../../UIkit/Container.Component';

const CartShopPageComponent = () => {
	return (
		<>
			<ContainerComponent isFluid={false}>
				<HeaderComponent title='Cart With All Products' />
				<Outlet />
			</ContainerComponent>
		</>
	);
};

export default CartShopPageComponent;
