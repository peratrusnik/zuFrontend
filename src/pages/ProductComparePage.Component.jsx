import HeaderComponent from "../components/headerSection/Header.Component";
import ProductListCompareComponent from "../components/productCompare/ProductListCompare.Component";
import ContainerComponent from "../UIkit/Container.Component";

const ProductComparePageComponent = ()=>{
    return(
        <>
            <ContainerComponent>
                <HeaderComponent title='Product Compare' />
                <ProductListCompareComponent />
            </ContainerComponent>
        </>
    )
}

export default ProductComparePageComponent;