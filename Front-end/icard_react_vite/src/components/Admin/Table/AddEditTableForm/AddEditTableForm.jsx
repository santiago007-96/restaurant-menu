import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTable } from "../../../../hooks";
import "./AddEditTableForm.scss";

export const AddEditTableForm = ({ onClose, onRefetch, table }) => {
    const { addTable, updateTable } = useTable();

    const formik = useFormik({
        initialValues: initialValues(table),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if(table){
                    await updateTable(table.id, formValue);
                } else {
                    await addTable(formValue);
                }   
                
                onRefetch();
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    });
    
    return (
        <Form className='add-edit-table-form' onSubmit={ formik.handleSubmit }>
            <Form.Input
                name='number'
                type='number'
                placeholder='Número de mesa'
                value={ formik.values.number }
                onChange={ formik.handleChange }
                error={ formik.errors.number }
            />

            <Button
                type='submit'
                primary
                fluid
                content={ table ? "Actualizar" : "Crear"}
            />
        </Form>
    )
}

function initialValues(data) {
    return {
        number: data?.number || "",
    }
}

function validationSchema() {
    return {
        number: Yup.number().required(true),
    }
}