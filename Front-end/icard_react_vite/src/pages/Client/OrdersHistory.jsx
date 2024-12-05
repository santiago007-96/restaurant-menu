import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react'; 
import { useParams } from "react-router-dom";
import { map, size, forEach } from "lodash";
import { OrderHistoryItem } from "../../components/Client";
import { ModalConfirm } from "../../components/Common";
import { useOrder, useTable, useVat, usePayment } from "../../hooks";
import { ORDER_STATUS } from "../../utils/constants";



export const OrdersHistory = () => {

    const [ idTable, setIdTable ] = useState(null);
    const [ showTypePayment, setShowTypePayment ] = useState(false);
    const [ isRequestAccount, setIsRequestAccount ] = useState(false);
    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();
    const { vat, getVat } = useVat();
    const { createPayment, getPaymentByTable } = usePayment();
    

    useEffect(() => {
        (async () => {
            const table = await getTableByNumber(tableNumber);
            const idTableTemp = table[0].id;
            setIdTable(idTableTemp);

            getOrdersByTable(idTableTemp, "", "ordering=-status, -created_at");
            getVat();

        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            if (idTable) {
                const response = await getPaymentByTable(idTable);
                setIsRequestAccount(response);
            }
        })();
    }, [idTable]);
    

    const onCreatedPayment = async (paymentType) => {
        setShowTypePayment(false);
        
        let subTotalPayment = 0;
        let totalPayment = 0;
        let VAT = Number(vat.vatPercentage);

        forEach(orders, (order) => {
            subTotalPayment += Number(order.product_data.price)
        })
        
        totalPayment = (subTotalPayment * VAT)/100 + subTotalPayment;

        const paymentData = {
            table: idTable,
            subTotalPayment,
            totalPayment: totalPayment.toFixed(2),
            paymentType,
            statusPayment: ORDER_STATUS.PENDING
        };
        
        const payment = await createPayment(paymentData);
        console.log("payment creado: ",payment);
        
        for await (const order of orders) {
            await addPaymentToOrder(order.id, payment.id);
        }
        
        window.location.reload();
        
    }

    return (
        <div>
            <h1>Historial de pedidos</h1>
            {
                loading ? (
                    <p>Cargando...</p>
                ) : (
                    <>
                    {
                        size(orders) > 0 && (
                            <Button primary fluid onClick={ () => size(isRequestAccount) === 0 && setShowTypePayment(true) } >
                                {
                                    size(isRequestAccount) > 0 ? (
                                        "La cuenta ya está pedida"
                                    ) : (
                                        "Pedir cuenta"
                                    )
                                }
                            </Button>
                        )
                    }
                    {
                        map(orders, (order) => (
                            <OrderHistoryItem key={ order.id } order={ order } />
                        ))
                    }
                    </>
                )
            }

            <ModalConfirm
                title="Pagar con tarjeta o efectivo"
                show={ showTypePayment }
                onCloseText="Efectivo"
                onClose={ () => onCreatedPayment("CASH") }
                onConfirmText="Tarjeta"
                onConfirm={ () => onCreatedPayment("CARD") }
            />
        </div>
    )
}
