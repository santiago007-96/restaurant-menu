import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableProductAdmin, AddEditProductForm } from '../../components/Admin';
import { BasicModal } from "../../components/Common";
import { useProduct } from "../../hooks";

export const ProductsAdmin = () => {
    const { loading, products, getProducts, deleteProduct } = useProduct();
    const [ showModal, setShowModal ] = useState(false);
    const [ titleModal, setTitleModal ] = useState(null);
    const [ contentModal, setContentModal ] = useState(null);
    const [ refetch, setRefetch ] = useState(false);

    useEffect(() => {
        getProducts();
    }, [refetch])
    
    const openCloseModal = () => setShowModal((prevState) => !prevState);
    const onRefetch = () => setRefetch((prevState) => !prevState);

    const addProduct = () => {
        setTitleModal("Nuevo producto");
        setContentModal(
            <AddEditProductForm
                onClose={ openCloseModal }
                onRefetch={ onRefetch }
            />
        );
        openCloseModal();
    };

    const updateProduct = (data) => {
        setTitleModal("Actualizar");
        setContentModal(
            <AddEditProductForm 
                onClose={ openCloseModal }
                onRefetch={ onRefetch }
                product={ data }
            />
        );
        openCloseModal();
    }

    const onDeleteProduct = async (data) => {
        const result = window.confirm(`¿Desea eliminar el producto ${data.title}?`);
        if(result){
            await deleteProduct(data.id);
        }
        onRefetch();
    }

    return(
        <>
            <HeaderPage
                title='Productos'
                btnTitle='Nuevo producto'
                btnClick={ addProduct }
            />
            {
                loading ? (
                    <Loader active inline='centered' />
                ) : (
                    <TableProductAdmin
                        products={ products } 
                        updateProduct={ updateProduct }
                        deleteProduct={ onDeleteProduct }
                    />
                )
            }

            <BasicModal
                show={ showModal }
                onClose={ openCloseModal }
                title={ titleModal}
                children={ contentModal }
            />
        </>
    )
}
