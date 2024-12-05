import React, { useEffect, useState } from 'react';
import { Loader, Modal } from 'semantic-ui-react';
import { HeaderPage, TableCategoryAdmin, AddEditCategoryForm } from "../../components/Admin";
import { BasicModal } from "../../components/Common";
import { useCategory } from "../../hooks";

export const CategoriesAdmin = () => {
    const { loading, categories, getCategories, deleteCategory } = useCategory();
    const [ showModal, setShowModal ] = useState(false);
    const [ titleModal, setTitleModal ] = useState(null);
    const [ contentModal, setContentModal ] = useState(null);
    const [ refetch, setRefetch ] = useState(false);

    useEffect(() => {
      getCategories();
    }, [refetch]);
    
    const openCloseModal = () => setShowModal((prevState) => !prevState);
    const onRefetch = () => setRefetch((prevState) => !prevState);
    const addCategory = () => {
        setTitleModal("Nueva Categoría");
        setContentModal(
            <AddEditCategoryForm 
                onClose={ openCloseModal } 
                onRefetch={ onRefetch } 
            />
        )
        openCloseModal();
    };

    const updateCategory = (data) => {
        setTitleModal("Actualizar Categoría");
        setContentModal(
            <AddEditCategoryForm
                onClose={ openCloseModal } 
                onRefetch={ onRefetch } 
                category={ data }
            />
        );
        openCloseModal();
    };

    const onDeleteCategory = async (data) => {
        const result = window.confirm(`¿Desea eliminar la categoría ${data.title}?`);
        if(result) {
            try {
                await deleteCategory(data.id);
                onRefetch();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <HeaderPage 
                title='Categorías'
                btnTitle='Nueva categoría'
                btnClick={ addCategory }
            />
            {
                loading ? (
                    <Loader active inline='centered'>
                        Cargando
                    </Loader>
                ) : (
                    <TableCategoryAdmin 
                        categories={categories} 
                        updateCategory={ updateCategory }
                        deleteCategory={ onDeleteCategory }
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
