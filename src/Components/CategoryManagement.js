import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const FormHeader = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
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

const Button = styled.button`
  background-color: #34A853;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #2c8a3f;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f4f4f4;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const EditButton = styled.button`
  background-color: #FFC107;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;

  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled.button`
  background-color: #EA4335;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #c9302c;
  }
`;

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editCategoryId,setEditCategoryId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories/viewCategory');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if(editCategoryId){
        handleSaveEdit();
    }else{
        try {
            const response = await axios.post('http://localhost:8080/api/categories/addCategory', formData);
            console.log('Item added successfully:', response.data);
            setFormData({ name: '' });
            fetchItems();
          } catch (error) {
            console.error('Error adding item:', error);
          }
    }
  };

  const handleEditItem = async (categoryId) => {
    
    try {
        setEditCategoryId(categoryId)
      const response = await axios.get(`http://localhost:8080/api/categories/viewOneCategory/${categoryId}`, formData);
      setFormData({ name: response.data.name });
      
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
        await axios.put(`http://localhost:8080/api/categories/updateCategory/${editCategoryId}`, formData);
        console.log('Item edited successfully');
        setEditCategoryId(null);
        setFormData({ item_id: '', quantity: '' });
        fetchItems();
    } catch (error) {
        console.error('Error saving edit:', error);
        // Handle error
    }
};

  const handleDeleteItem = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/deleteCategory/${categoryId}`);
      console.log('Item deleted successfully:', categoryId);
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
      <FormHeader>Create Categories</FormHeader>
      <Form onSubmit={handleAddItem}>
        <FormGroup>
          <Label>Category Name:</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormGroup>
        <Button type="submit">{editCategoryId ? 'Update Category' : 'Add Category'}</Button>
      </Form>

      <h2>Edit or Delete Categories</h2>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <Td>{category.id}</Td>
              <Td>{category.name}</Td>
              <Td>
                <EditButton onClick={() => handleEditItem(category.id)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDeleteItem(category.id)}>Delete</DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CategoryManagement;
