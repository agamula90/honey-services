import React from "react";
import {productsQuery, Product} from "./mocks";
import styles from "./products.module.css";
import {useGraphQLQuery} from "../../utilities";
import DefaultProgressBar from "../DefaultProgressBar";

export default function ProductsPage() {
    const products = useGraphQLQuery<Product>(productsQuery);

    if (products.loading) {
        return <DefaultProgressBar />;
    }
    if (products.error) {
        return `Error occurred: ${products.error}`;
    }
    if (!products.data) {
        return "Products not found";
    }

    return <div className={styles.products}>
        {
            products.data.map(product => <ProductItem product={product} key={product.id}/>)
        }
    </div>;
}

function ProductItem({product}: { product: Product }) {
    const image = product.imageUrl.length ?
        <img src={product.imageUrl} alt=""></img> :
        <div></div>;
    const types = product.types.length ? <ul>
        {product.types.map(type => <li key={type}>{type}</li>)}
    </ul> : <div></div>;

    const description = product.description.length ? <>
     <hr />
     {product.description}
    </> : <div></div>;

    const volumes = product.volumes.join("; ");

    return <div>
        <h1>{product.title}</h1>
        {image}
        {types}
        {description}
        {volumes}
    </div>;
}