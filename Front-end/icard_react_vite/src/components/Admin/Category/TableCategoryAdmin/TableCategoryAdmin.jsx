import React from 'react';
import { Table, Image, Button, Icon, Tab } from 'semantic-ui-react';
import { map } from "lodash";
import "./TableCategoryAdmin.scss";

export const TableCategoryAdmin = ({ categories, updateCategory, deleteCategory }) => {
    

    return (
        <Table className='table-category-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Imagen</Table.HeaderCell>
                    <Table.HeaderCell>Categoría</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    map(categories, (category, index) => (
                        <Table.Row key={ index }>
                            <Table.Cell width={2}>
                                <Image src={ category.image } />
                            </Table.Cell>
                            <Table.Cell>{ category.title }</Table.Cell>

                            <Action 
                                category={ category } 
                                updateCategory={ updateCategory } 
                                deleteCategory={ deleteCategory }
                            />

                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    )
}

function Action({ category, updateCategory, deleteCategory }) {
    return (
        <Table.Cell textAlign='right'>
            <Button 
                icon 
                onClick={() => updateCategory(category)}
            >
                <Icon name='edit' />
            </Button> 
            <Button 
                icon 
                negative
                onClick={() => deleteCategory(category)}
            >
                <Icon name='close' />
            </Button> 
        </Table.Cell>
    )
}