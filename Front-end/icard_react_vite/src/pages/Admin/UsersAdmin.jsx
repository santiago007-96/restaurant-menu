import React, { useEffect, useState } from 'react';
import { HeaderPage, TableUsers, AddEditUserForm } from '../../components/Admin';
import { Loader } from 'semantic-ui-react';
import { BasicModal } from "../../components/Common";
import { useUser } from "../../hooks";

export const UsersAdmin = () => {

  const [ titleModal, setTitleModal ] = useState(false);
  const [ showModal, setShowModal ] = useState(null);
  const [ contentModal, setContentModal ] = useState(null);
  const [ refetch, setRefetch ] = useState(false);
  const { loading, users, getUsers, deleteUser } = useUser();
  

  useEffect(() => {
    getUsers();
  }, [refetch]);
  
  
  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefetch((prevState) => !prevState);
  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(<AddEditUserForm onClose={ openCloseModal } onRefetch={ onRefetch } />);
    openCloseModal();
  }

  const updateUser = (data) => {
    setTitleModal("Actualizar usuario");
    setContentModal(
      <AddEditUserForm 
        onClose={ openCloseModal } 
        onRefetch={ onRefetch } 
        data={ data }
      />
    );
    openCloseModal();
    
  }

  const onDeleteUser = async (data) => {
    const result = window.confirm(`¿Desea eliminar el usuario ${data.email}`);
    if(result){
      try {
        await deleteUser(data.id);
        onRefetch();
      } catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <>
      <HeaderPage 
        title='Usuarios'
        btnTitle='Nuevo Usuario'
        btnClick={ addUser }
      />
      {
        loading ? (
          <Loader 
            active
            inline='centered'
          >
            Cargando...
          </Loader>
        ) : (
          <TableUsers
            users={ users }
            updateUser={ updateUser }
            deleteUser= { onDeleteUser }
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
