import React, { useEffect } from 'react';
import { useCategory } from "../../hooks";
import { ListCategories } from "../../components/Client";

export const Categories = () => {
    const { loading, categories, getCategories } = useCategory();
    
    useEffect(() => {
      getCategories();
    }, [])
    
    
    return (
        <div>
            <h3>Categorías</h3>
            {
                loading ? 
                (<p>Cargando...</p>) 
                : (
                    <ListCategories categories={ categories } />
                )
            }
            
        </div>
    )
}
