import React, { useEffect, useState, useCallback } from 'react';
import { Form, Image, Button, Dropdown, Checkbox } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone'; 
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useCategory, useProduct } from "../../../../hooks";
import { map } from "lodash";
import "./AddEditProductForm.scss";

export const AddEditProductForm = ({ onClose, onRefetch, product }) => {
    const { categories, getCategories } = useCategory();
    const [ categoriesFormat, setCategoriesFormat] = useState([]);
    const [ previewImage, setPreviewImage ] = useState(product?.image || null);
    const { loading, error, products, addProduct, updateProduct } = useProduct();


    useEffect(() => {
      getCategories();
    }, [])
    
    useEffect(() => {
      setCategoriesFormat(formatDropdownData(categories));
    }, [categories])
    
    const formik = useFormik({
        initialValues: initialValues(product),
        validationSchema: Yup.object(product ? updateValidationSchema() : newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if(product){
                    await updateProduct(product.id, formValue);
                }
                else {
                    await addProduct(formValue);
                }
                
                onRefetch();
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    });

    const onDrop = useCallback( async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue("image", file);
        setPreviewImage(URL.createObjectURL(file)); //Crea un URL con la imagen
    }, []);
   
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    });

    return (
        <Form className='add-edit-product-form' onSubmit={ formik.handleSubmit }>
            <Form.Input 
                name='title' 
                placeholder='Nombre del producto' 
                value={ formik.values.title }
                onChange={ formik.handleChange }
                error={ formik.errors.title }
            />
            <Form.Input 
                name='description' 
                placeholder='Descripción del producto' 
                value={ formik.values.description }
                onChange={ formik.handleChange }
                error={ formik.errors.description }
            />
            <Form.Input 
                type='number' 
                name='price' 
                placeholder='Precio' 
                value={ formik.values.price }
                onChange={ formik.handleChange }
                error={ formik.errors.price }
            />
            <Dropdown 
                placeholder='Categoría' 
                fluid 
                selection
                search  
                options={ categoriesFormat }
                value={ formik.values.category }
                error={ formik.errors.category }
                onChange={(_, data) => formik.setFieldValue('category', data.value)}
            />

            <div className='add-edit-product-form__active'>
                <Checkbox 
                    toggle 
                    checked={ formik.values.active }
                    onChange={ (_, data) => formik.setFieldValue('active', data.checked) }
                />
                Producto activo
            </div>

            <Button 
                type='button' 
                fluid 
                { ...getRootProps() }
                color={ formik.errors.image && "red"}
            >
                { previewImage ? "Cabiar imagen" : "Subir imagen"}
            </Button>
            <input { ...getInputProps() } />
            <Image src={ previewImage } />

            <Button 
                type='submit' 
                primary 
                fluid 
                content={ product ? "Actualizar" : "Crear" }
            />
        </Form>
    )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id,
    }));
}

function initialValues(data) {
    return {
        title: data?.title || "",
        description: data?.description || "",
        price: data?.price || "",
        image: "",
        active: data?.active ? true : false,
        category: data?.category || "",
    }
}

function newValidationSchema() {
    return {
        title: Yup.string().required(true),
        description: Yup.string(),
        price: Yup.number().required(true),
        image: Yup.string().required(true),
        active: Yup.boolean().required(true),
        category: Yup.string().required(true),
    }
}

function updateValidationSchema() {
    return {
        title: Yup.string().required(true),
        description: Yup.string(),
        price: Yup.number().required(true),
        image: Yup.string(),
        active: Yup.boolean().required(true),
        category: Yup.string().required(true),
    }
}