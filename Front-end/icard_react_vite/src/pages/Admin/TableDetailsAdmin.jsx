import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { forEach, size } from "lodash";
import { Loader } from 'semantic-ui-react';
import { HeaderPage, AddOrderForm } from "../../components/Admin";
import { BasicModal, ConfirmMessage, ModalConfirm } from "../../components/Common";
import { ListOrderAdmin, PaymentDetail } from "../../components/Admin/TableDetails";
import { useOrder, useTable, usePayment, useVat } from "../../hooks";
import { ORDER_STATUS } from "../../utils/constants";

export const TableDetailsAdmin = () => {
    // Para obtener el id que viene por la URL
    const { id } = useParams();
    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
    const [reloadOrders, setReloadOrders] = useState(false);
    const { table, getTable } = useTable();
    const { createPayment, getPaymentByTable } = usePayment();
    const { vat, getVat} = useVat();
    const [ paymentTableData, setPaymentTableData ] = useState(null);


    // Mensaje de confirmación
    // const [ contentMessage, setContentMessage] = useState(null);
    // const [ resultMessage, setResultMessage] = useState(null); // True = Confirm & False = Cancel
    // const [ showCreateAccount, setShowCreateAccount] = useState(false);
    // const [ cancelButton, setCancelButton ] = useState(null);
    // const [ confirmButton, setConfirmButton ] = useState(null);
    
    // Modal
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      getOrdersByTable(id, "", 'ordering=-status,created_at' );
      getVat();
    }, [id, reloadOrders])
   
    useEffect(() => {
      getTable(id);
    }, [id])
    
   useEffect(() => {
    async function paymentByTable() {
        const response = await getPaymentByTable(id);
        
        if( size(response) > 0 ) {
            setPaymentTableData(response[0]);
        } else {
            console.log("Cuenta no pedida"); 
            
        }
    }
    paymentByTable();
   }, [reloadOrders])

    
    const onReloadOrders = () => setReloadOrders((prevState) => !prevState);
    const openCloseModal = () => setShowModal((prevState) => !prevState);
    // const openCloseMessage = () => setShowMessage((prevState) => !prevState);
    // const cancelMessage = () => {
    //     setShowMessage(false);
    //     setResultMessage(false);
    //     console.log(resultMessage);
    // }
    // const confirmMessage = () => {
    //     setShowMessage(false);
    //     setResultMessage(true);
    //     console.log(resultMessage);
    // }


    const onCreatePayment = async () => {
        const result = window.confirm('¿Estas seguro de generar la cuenta de la mesa?');
        
        // setContentMessage('¿Estas seguro de generar la cuenta de la mesa?');
        // setCancelButton('NO');
        // setConfirmButton('SI');
        // console.log(showMessage);
        // openCloseMessage();
        
        
        
        // console.log(showMessage);
        // console.log(resultMessage);
        if(result){
            let subTotalPayment = 0;
            let VAT = Number(vat.vatPercentage);
            let totalPayment = 0;            
            forEach(orders, (order) => {
                if(order.status == ORDER_STATUS.DELIVERED){
                    subTotalPayment += Number(order.product_data.price);
                }

            });
            totalPayment = (subTotalPayment * VAT)/100 + subTotalPayment;
            const resultTypePayment = window.confirm('¿Pago con tarjeta pulsa ACEPTAR, con efectivo CANCELAR?');
            
            
            
            // console.log(showMessage);
            // setResultMessage(null);
            // console.log(resultMessage);
            
            // setContentMessage('¿SELECCIONE EL PAGO?');
            // setCancelButton('TARJETA');
            // setConfirmButton('EFECTIVO');
            
            // openCloseMessage();
        
            const paymentData = {
                table: id,
                subTotalPayment: subTotalPayment.toFixed(2),
                vatPercentage: vat.id,
                totalPayment: totalPayment.toFixed(2),
                paymentType: resultTypePayment ? "CARD" : "CASH",
                statusPayment: "PENDING",
            }
            
            const payment = await createPayment(paymentData);
            // Asociamos los pedidos a la cuenta creada
            // await porque se ejecutan peticiones http

            
            for await (const order of orders) { 
                await addPaymentToOrder(order.id, payment.id);
            }

            onReloadOrders();
            
        }
    }

    return (
        <>
            
            <HeaderPage 
                title={`Mesa ${table?.number || ""}`} 
                btnTitle={ paymentTableData ? "Ver detalle de cuenta" : "Añadir pedido" }
                btnClick={ openCloseModal }
                btnTitleTwo={ (!paymentTableData && size(orders) > 0 ) ? "Generar cuenta" : null}
                btnClickTwo={ onCreatePayment }
            />
            {
                loading ? (
                    <Loader active inline='centered'>
                        Cargando...
                    </Loader>
                ) : (
                    <ListOrderAdmin orders={orders} onReloadOrders={ onReloadOrders } />
                )
            }

            <BasicModal 
                show={ showModal }
                onClose={ openCloseModal }
                title='Generar pedido'
            >
                {
                    paymentTableData ? (
                        <PaymentDetail 
                            payment={ paymentTableData }
                            orders={ orders }
                            openCloseModal={ openCloseModal }
                            onReloadOrders={ onReloadOrders }
                        />
                    ) : (
                        <AddOrderForm 
                            idTable={ id } 
                            openCloseModal={ openCloseModal } 
                            onReloadOrders={ onReloadOrders } 
                        />
                        )
                }
            </BasicModal>

            {/* <ConfirmMessage 
                show={ showMessage }
                content={ contentMessage }
                cancelButton={ cancelButton }
                confirmButton={ confirmButton }
                onCancel={ cancelMessage }
                onConfirm={ confirmMessage }
            /> */}

            {/*<ModalConfirm
                title="Pagar con tarjeta o efectivo"
                show={ showTypePayment }
                onCloseText="Efectivo"
                onClose={ () => onCreatedPayment("CASH") }
                onConfirmText="Tarjeta"
                onConfirm={ () => onCreatedPayment("CARD") }
            />*/}

        </>
    )
}
