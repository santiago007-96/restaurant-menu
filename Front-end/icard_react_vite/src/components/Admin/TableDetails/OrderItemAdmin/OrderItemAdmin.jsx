import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/dist/locale/es';
import { useOrder } from "../../../../hooks";
import { ORDER_STATUS } from "../../../../utils/constants";
import "./OrderItemAdmin.scss";

export const OrderItemAdmin = ({ order, onReloadOrders }) => {
    const { title, image } = order.product_data;
    const { checkDeliveredOrder } = useOrder();


    const onCheckDeliveredOrder = async () => {
        await checkDeliveredOrder(order.id);
        onReloadOrders();
    };

    return (
        <div className={classNames('order-item-admin', {
            [order.status.toLowerCase()]: true,
        })} 
        >
            <div className='order-item-admin__time'>
                
                <span>{ moment(order.created_at).format("HH:mm") }</span> { " - " }
                <span>{ moment(order.created_at).startOf('seconds').fromNow() }</span>
            </div>

            <div className='order-item-admin__product'>
                <Image src={ image } />
                <p>{ title }</p>
                <p className='order-item-admin__product__status'>
                    {
                        order.status.toLowerCase() === 'delivered' && 'ENTREGADO'
                    }
                </p>
            </div>

            { order.status === ORDER_STATUS.PENDING && (
                <Button 
                    primary
                    onClick={ onCheckDeliveredOrder }
                >
                    Marcar como entregado
                </Button>
                )
            }
        </div>
    )
}
