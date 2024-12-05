import React, { useState, useEffect } from 'react';
import { Label } from 'semantic-ui-react';
import { size } from "lodash";
import classNames from 'classnames';
import { Link } from "react-router-dom";
import { getOrdersByTableApi } from "../../../../api/order";
import { ORDER_STATUS } from "../../../../utils/constants";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";
import { usePayment } from "../../../../hooks";
import "./TableAdmin.scss";

export const TableAdmin = ({ table, reload }) => {

  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);
  const { getPaymentByTable } = usePayment();

  useEffect(() => {
    async function getOrdersTable() {
      const response = await getOrdersByTableApi(
          table.id, 
          ORDER_STATUS.PENDING
      );
      setOrders(response);
      
    }

    getOrdersTable();
  }, [reload])
  
  useEffect(() => {
    async function getOrdersTable() {
      const response = await getOrdersByTableApi(
          table.id, 
          ORDER_STATUS.DELIVERED
      );

      if(size(response) > 0){
        setTableBusy(response);
      } else {
        setTableBusy(false);
      }
    }

    getOrdersTable();
  }, [reload])

  useEffect(() => {
    async function paymentByTable() {
      const response = await getPaymentByTable(table.id);
      if( size(response) > 0) {
        setPendingPayment(true);
      } else {
        setPendingPayment(false);
      }
      
    }

    paymentByTable();
  }, [reload])
  

  return (
    <Link className='table-admin' to={`/admin/table/${table.id}`} >
      {
        size(orders) > 0 ? (
          <Label circular color='orange'>
            { size(orders) }
          </Label>
        ) : null
      }
      {
        pendingPayment && (
          <Label circular color='orange'>
            Cuenta
          </Label>
        )
      }
        <IcTable className={ classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
          "pending-payment": pendingPayment,
        })} />
        <p>Mesa { table.number }</p>
    </Link>
  )  
    
    
}
