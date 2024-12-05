import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client";

export const Products = () => {
    const { tableNumber, idCategory } = useParams();
    const { loading, products, getProductsByCategory } = useProduct();
    
    useEffect(() => {
      getProductsByCategory(idCategory);
    }, [idCategory])
    
    
    return (
        <div>
            <Link to={`/client/${tableNumber}`}>
                Volver a categorías
            </Link>
            <p>Mesa: { tableNumber }</p>
            {
                loading ? (<p>Cargando...</p>)
                : (
                    <ListProducts products={ products } />
                )
            }
        </div>
    )
}
