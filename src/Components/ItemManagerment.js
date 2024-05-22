import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const FormContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const FormHeader = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #EA4335;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
`;

const TableContainer = styled.div`
  width: 100%;
  margin: 20px auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
`;

const Th = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.button`
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;

  ${(props) => props.edit && `
    background-color: #FFC107;
    &:hover {
      background-color: #e0a800;
    }
  `}

  ${(props) => props.delete && `
    background-color: #EA4335;
    &:hover {
      background-color: #c9302c;
    }
  `}
`;

const ItemManagement = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ name: '', price: 0, categoryId: '' });
    const [editItemId, setEditItemId] = useState(null); 

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/items/retrieveItem');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories/viewCategory');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (editItemId) {
            handleSaveEdit();
        } else {
            console.log("formData",formData)
            try {
                const response = await axios.post('http://localhost:8080/api/items/createItem', formData);
                console.log('Item added successfully:', response.data);
                setFormData({ name: '', price: '', categoryId: '' });
                fetchItems();
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };

    const handleEditItem = async (itemId) => {
        try {
            setEditItemId(itemId);
            const response = await axios.get(`http://localhost:8080/api/items/retrieveOneRecord/${itemId}`);
            console.log('Item retrieved successfully:', response.data);
            setFormData({ name: response.data.name, price: response.data.price, categoryId: response.data.categoryId });
        } catch (error) {
            console.error('Error editing item:', error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:8080/api/items/updateRecord/${editItemId}`, formData);
            console.log('Item edited successfully');
            setFormData({ name: '', price: '', categoryId: '' });
            setEditItemId(null);
            fetchItems();
        } catch (error) {
            console.error('Error saving edit:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/api/items/deleteRecord/${itemId}`);
            console.log('Item deleted successfully:', itemId);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <FormContainer>
                <FormHeader>Create Items</FormHeader>
                <Form onSubmit={handleAddItem}>
                    <FormGroup>
                        <Label>Name:</Label>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Price:</Label>
                        <Input type="number" name="price" value={formData.price} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Category:</Label>
                        <Select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Select>
                    </FormGroup>
                    <Button type="submit">{editItemId ? 'Save Edit' : 'Add Item'}</Button>
                </Form>
            </FormContainer>
            <h2>Edit or Delete Items</h2>
            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <Th>Name</Th>
                            <Th>Price</Th>
                            <Th>Category</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <Td>{item.name}</Td>
                                <Td>${item.price}</Td>
                                <Td>{item.categoryName}</Td> {/* Assuming the category name is included in the item data */}
                                <Td>
                                    <ActionButton edit onClick={() => handleEditItem(item.id)}>Edit</ActionButton>
                                    <ActionButton delete onClick={() => handleDeleteItem(item.id)}>Delete</ActionButton>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ItemManagement;
