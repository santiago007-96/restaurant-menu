import React, { useState, useEffect } from 'react';
import { Button, Icon, Checkbox } from 'semantic-ui-react';
import { map } from "lodash";
import { TableAdmin } from "../";
import "./TableListAdmin.scss";

export const TableListAdmin = ({ tables }) => {
    const [reload, setReload] = useState(false);
    const [autoReload, setAutoReload] = useState(false);


    const onReload = () => setReload((prevState) => !prevState);

    useEffect(() => {
      if(autoReload){
        const autoReloadAction = () => {
            onReload();

            setTimeout(() => {
                autoReloadAction();
            }, 5000);
        };
        autoReloadAction();
      }
    }, [autoReload])
    
    const onCheckAutoReload = (check) => {
        if(check){
            setAutoReload(check);
        } else {
            window.location.reload();
        }
    };

    return (
        <div className='tables-list-admin'>
            <Button
                primary
                icon 
                className='tables-list-admin__reload'
                onClick={ onReload } >
                    <Icon name='refresh' />
            </Button>

            <div className='tables-list-admin__reload-toggle'>
                <span>Recargar automáticamente</span>
                <Checkbox 
                    toggle
                    checked={ autoReload }
                    onChange={(_, data) => onCheckAutoReload(data.checked)}
                />
            </div>
            {
                map(tables, (table) => (
                    <TableAdmin key={ table.number } table={ table } reload={ onReload } />
                ))
            }
        </div>
    )
}
