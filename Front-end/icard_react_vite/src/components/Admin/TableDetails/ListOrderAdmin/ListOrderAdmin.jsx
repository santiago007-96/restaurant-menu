import React from 'react';
import { map } from "lodash";
import { OrderItemAdmin } from "../";
import "./ListOrderAdmin.scss";

// Componente que renderiza la lista de pedidos
export const ListOrderAdmin = ({ orders, onReloadOrders }) => {
    
    
    return (
        <div className='list-order-admin'>
            {
                map(orders, (order) => (
                    <OrderItemAdmin 
                        key={ order.id} 
                        order={ order }
                        onReloadOrders={ onReloadOrders }
                    />
                ))
            }
        </div>
    )
}
