import React from "react";
import {productsQuery, Product} from "./mocks";
import styles from "./products.module.css"
import {useQueryWithCache} from "../../utilities";
import DefaultProgressBar from "../DefaultProgressBar";

export default function ProductsPage() {
    const products = useQueryWithCache(productsQuery);

    if (products.loading) {
        return <DefaultProgressBar />;
    }
    if (products.error) {
        return `Error occurred: ${products.error.message}`;
    }

    const productsList = products.data as Array<Product>;

    return <div className={styles.products}>
        {
            productsList.map(product => <ProductItem product={product} key={product.id}/>)
        }
    </div>;
}

function ProductItem({product}: { product: Product }) {
    const image = product.imageUrl.length ?
        <img src={product.imageUrl} alt=""></img> :
        <div></div>;
    const types = product.types.length ? <ul>
        {product.types.map(type => <li>{type}</li>)}
    </ul> : <div></div>;

    const description = product.description.length ? <>
     <hr />
     {product.description}
    </> : <div></div>

    const volumes = product.volumes.join("; ");

    return <div>
        <h1>{product.title}</h1>
        {image}
        {types}
        {description}
        {volumes}
    </div>
}