import React from 'react';
import styles from './products.module.css';
import { setGraphQLResultFromRemote } from '../../utilities';
import DefaultProgressBar from '../DefaultProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { cacheTimeoutMillis, RootState } from '../../store';
import { productsQuery, set as setProducts } from './productsSlice';
import { Product } from './products';
import { setLoaded } from '../navigationSlice';

export default function ProductsPage() {
    const products = useSelector((state: RootState) => state.products.data);
    const areProductsLoading = useSelector(
        (state: RootState) => state.products.loading
    );
    const navItem = useSelector((state: RootState) =>
        state.navigation.items.find((item) => item.type === 'products')
    )!;
    const dispatch = useDispatch();
    const isFetchingAllowed =
        navItem.selectedAt - navItem.updatedAt > cacheTimeoutMillis;

    setGraphQLResultFromRemote<Product>(
        (result) => {
            dispatch(setProducts(result.data));
            dispatch(setLoaded('products'));
        },
        productsQuery,
        isFetchingAllowed
    );

    if (areProductsLoading) {
        return <DefaultProgressBar />;
    }

    return (
        <div className={styles.products}>
            {products.map((product) => (
                <ProductItem product={product} key={product.id} />
            ))}
        </div>
    );
}

function ProductItem({ product }: { product: Product }) {
    const image = product.imageUrl.length ? (
        <img src={product.imageUrl} alt=""></img>
    ) : (
        <div></div>
    );
    const types = product.types.length ? (
        <ul>
            {product.types.map((type) => (
                <li key={type}>{type}</li>
            ))}
        </ul>
    ) : (
        <div></div>
    );

    const description = product.description.length ? (
        <>
            <hr />
            {product.description}
        </>
    ) : (
        <div></div>
    );

    const volumes = product.volumes.join('; ');

    return (
        <div>
            <h1>{product.title}</h1>
            {image}
            {types}
            {description}
            {volumes}
        </div>
    );
}
