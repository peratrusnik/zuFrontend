import HeaderComponent from "../components/headerSection/Header.Component";
import ProductCreateEditFormComponent from "../components/productCreate/productCreateForm.Component";
import ContainerComponent from "../UIkit/Container.Component";


const ProductCreateEditPageComponent = () => {
    return <>
        <ContainerComponent>
        <HeaderComponent title={"Add Product Page"}></HeaderComponent>
            <ProductCreateEditFormComponent/>
        </ContainerComponent>
    </>
}

export default ProductCreateEditPageComponent