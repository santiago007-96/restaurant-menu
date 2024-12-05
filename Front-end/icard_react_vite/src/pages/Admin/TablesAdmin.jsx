import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { toast } from "react-toastify";
import { HeaderPage, TableTablesAdmin, AddEditTableForm } from "../../components/Admin";
import { BasicModal } from "../../components/Common";
import { useTable } from "../../hooks";

export const TablesAdmin = () => {
    const { loading, error, tables, getTables, deleteTable } = useTable();
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
      getTables();
    }, [refetch])
    
    const openCloseModal = () => setShowModal((prevState) => !prevState);
    const onRefetch = () => setRefetch((prevState) => !prevState);
    
    const addTable = () => {
        setTitleModal("Crear mesa");
        setContentModal(
            <AddEditTableForm 
                onClose={ openCloseModal }
                onRefetch={ onRefetch }
            />
        );
        openCloseModal();
    }
    
    
    const updateTable = (data) => {
        setTitleModal("Actualizar mesa");
        setContentModal(
            <AddEditTableForm 
                onClose={ openCloseModal }
                onRefetch={ onRefetch }
                table={ data }
            />
        );
        openCloseModal();
       
    }

    const onDeleteTable = async (data) => {
        const result = window.confirm(`¿Desea eliminar la mesa ${data.number}?`);
        if(result){
            await deleteTable(data.id);
        }
        onRefetch();
    }
    return (
        <>
            <HeaderPage 
                title='Mesas'
                btnTitle='Crear nueva mesa'
                btnClick={ addTable }
            />
            {
                loading ? (
                    <Loader active inline='centered' >
                        Cargando
                    </Loader>
                ) : (
                    <TableTablesAdmin
                        tables={ tables } 
                        updateTable={ updateTable }
                        deleteTable={ onDeleteTable }
                    />
                )
            }

            <BasicModal 
                show={ showModal }
                onClose={ openCloseModal }
                title={ titleModal }
                children={ contentModal }
            />
        </>
    )
}
