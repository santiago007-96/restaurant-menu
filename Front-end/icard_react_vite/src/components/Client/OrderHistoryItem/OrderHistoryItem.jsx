import React from 'react';
import { Image } from "semantic-ui-react";
import classNames from 'classnames';
import moment from 'moment';
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constants";
import "./OrderHistoryItem.scss";

export const OrderHistoryItem = ( order ) => {

    const { title, image } = order.order.product_data;
    
     
    return (
        <div className={ classNames("order-history-item", 
            {
                [order.order.status.toLowerCase()]: true,
            }
        ) }>
            <div className='order-history-item__time'>
                <span>
                    Pedido { moment(order.order.created_at).startOf("second").fromNow() }
                </span>
            </div>

            <div className='order-history-item__product'>
                <Image src={ image } />
                <p>{ title }</p>
            </div>

            {
                order.order.status === ORDER_STATUS.PENDING 
                ? (
                    <span>En marcha</span>
                ) : (
                    <span>Entregado</span>
                )
            }
        </div>
    )
}
