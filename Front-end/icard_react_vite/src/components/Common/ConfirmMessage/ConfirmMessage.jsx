import React from 'react';
import { Confirm } from 'semantic-ui-react';

export const ConfirmMessage = ({ show, size, content, onCancel, onConfirm, cancelButton, confirmButton }) => {
    return (
        <Confirm 
            open={ show }
            content={ content}
            cancelButton={ cancelButton }
            confirmButton={ confirmButton }
            size={ size }
            onCancel={ onCancel }
            onConfirm={ onConfirm }
        />
    )
}

ConfirmMessage.defaultProps = {
    size: "tiny",
    cancelButton: "Cancelar",
    confirmButton: "Confirmar",
}