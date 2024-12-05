import React, { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { map } from "lodash";
import { useOrder } from "../../../../hooks";
import "./PaymentProductList.scss";

export const PaymentProductList = ({ payment }) => {
    const { getOrdersByPayment } = useOrder();
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
      async function ordersByPayment() {
        const response = await getOrdersByPayment( payment.id );
        setOrders(response);
        
      }
      ordersByPayment();
    }, [])
    

    

    return (
        <div className='payment-product-list'>
            {
                map(orders, (order) => (
                    <div 
                        className='payment-product-list__product'
                        key={ order.id }
                    >
                        <div>
                            <Image 
                                src={ order.product_data.image }
                                avatar
                                size='tiny'
                            />
                            <span>{ order.product_data.title }</span>
                        </div>

                        <div>
                            { order.product_data.price } $
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
