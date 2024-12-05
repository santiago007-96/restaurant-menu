import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useTable } from "../../../hooks";
import "./SelectTable.scss";

export const SelectTable = () => {
    const [tableNum, setTableNum] = useState(null);
    const [error, setError] = useState(null);
    const { isExistTable } = useTable();
    const  navigate  = useNavigate();
    
    const onSubmit = async () => {
        setError(null);
        if(!tableNum) {
            setError("No ha introducido ninguna mesa!");
        } else {
            const exist = await isExistTable(tableNum);
            if(exist) {
                navigate(`/client/${tableNum}`);
                // history.push(`/client/${tableNum}`);
            } else{
                setError("El número de la mesa no existe!");
            }
        }
    };

    return (
        <div className='select-table'>
            <div className='select-table__content'>
                <h1>Bienvenido a !Card</h1>
                <h2>Introduce tu número de mesa</h2>

                <Form onSubmit={ onSubmit }>
                    <Form.Input 
                        placeholder="Ejemplo: 1, 2, 3, 4" 
                        type='number'
                        onChange={(_, data) => setTableNum(data.value)}
                    />
                    
                    <Button primary fluid>
                        Ingresar
                    </Button>
                </Form>

                <p className='select-table__content-error'>
                    { error }
                </p>
            </div>
        </div>
    )
}
