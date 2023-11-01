import React from "react";
import {getProducts, Product} from "./mocks";
import styles from "./products.module.css"

export default function ProductsPage() {
    const products = getProducts();
    return <div className={styles.products}>
        {
            products.map(product => <ProductItem product={product} key={product.id}/>)
        }
    </div>;
}

function ProductItem({product}: { product: Product }) {
    const image = product.image.length ?
        <img src={product.image} alt=""></img> :
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