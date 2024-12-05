import React from 'react';
import { Image } from 'semantic-ui-react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { map } from "lodash";
import "./ListCategories.scss";

export const ListCategories = ({ categories }) => {
   const location = useLocation();
   const navigate = useNavigate();
   

    const goToCategory = (id) => {
        navigate(`${location.pathname}/${id}`);        
    };

    return (
        <div className='list-categories-client'>
            {
                map(categories, (category) => (
                    <div 
                        key={ category.id } 
                        className='list-categories-client__category'
                        onClick={() => goToCategory(category.id)}
                    >
                        <Image src={ category.image } size='small' />
                        <span>{ category.title }</span>
                    </div>
                ))
            }
        </div>
    )
}
