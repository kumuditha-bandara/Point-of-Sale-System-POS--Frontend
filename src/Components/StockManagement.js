import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FormWrapper = styled.div`
  margin-bottom: 20px;
`;
const FormHeader = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #EA4335;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
`;

const AddToCartButton = styled.button`
  background-color: #34A853;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const StockItemWrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StockDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StockName = styled.span`
  font-weight: bold;
`;

const StockQuantity = styled.div`
  background-color: #f5f5f5;
  color: #333;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
`;

const StockManagement = () => {
    const [stocks, setStocks] = useState([]);
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ item_id: '', quantity: '' });
    const [cartQuantities, setCartQuantities] = useState({});
    const { addItemToCart } = useContext(CartContext);
    const [editStockId, setEditStockId] = useState(null); 

    useEffect(() => {
        fetchItems();
        fetchAllItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/stocks/viewStocks');
            setStocks(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const fetchAllItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/items/retrieveItem');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching all items:', error);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (editStockId) {
            handleSaveEdit();
        }else{
            try {
                const response = await axios.post('http://localhost:8080/api/stocks/addStocks', formData);
                console.log('Item added successfully:', response.data);
                setFormData({ item_id: '', quantity: '' });
                fetchItems();
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
        
    };

    const handleEditItem = async (stockId) => {
        setEditStockId(stockId);
        try {
            const response = await axios.get(`http://localhost:8080/api/stocks/readOneStock/${stockId}`, formData);
            console.log('Item edited successfully:', response.data);
            setFormData({ item_id: response.data.item.id, quantity: response.data.quantity });
            fetchItems();
        } catch (error) {
            console.error('Error editing item:', error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:8080/api/stocks/updateStock/${editStockId}`, formData);
            console.log('Item edited successfully');
            setEditStockId(null);
            setFormData({ item_id: '', quantity: '' });
            fetchItems();
        } catch (error) {
            console.error('Error saving edit:', error);
            // Handle error
        }
    };

  

    const handleQuantityChange = (stockId, quantity) => {
        setCartQuantities({
            ...cartQuantities,
            [stockId]: quantity,
        });
    };

    const handleAddToCart = (stockId) => {
        const stockItem = stocks.find(stock => stock.id === stockId);
        const quantity = parseInt(cartQuantities[stockId], 10) || 0;

        if (stockItem && quantity > 0 && quantity <= stockItem.quantity) {
            const newItem = { ...stockItem };
            delete newItem.quantity;
            addItemToCart(newItem, quantity);
            setCartQuantities({
                ...cartQuantities,
                [stockId]: '',
            });
        } else {
            alert('Please enter a valid quantity.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <FormWrapper>
            <FormHeader>Add Stocks To System</FormHeader>
                <Form onSubmit={handleAddItem}>
                    <FormGroup>
                        <Label>Item Id:</Label>
                        <Select name="item_id" value={formData.item_id} onChange={handleChange}>
                            <option value="">Select Item</option>
                            {items.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name} - ${item.price}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Quantity:</Label>
                        <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                    </FormGroup>
                    <Button type="submit">{editStockId ? 'Edit Stock' : "Add Stock"}</Button>
                </Form>
            </FormWrapper>
            <h2>Edit or Delete Items</h2>
            <Grid>
                {stocks.map(stock => (
                    <StockItemWrapper key={stock.id}>
                        <StockDetails>
                            <div>
                                <StockName>{stock.item.name}</StockName> - 
                                <span> ${stock.item.price}</span>
                            </div>
                            <div>
                                <StockQuantity>{stock.quantity} available</StockQuantity>
                            </div>
                        </StockDetails>
                        <FormGroup>
                            <Input
                                type="number"
                                min="1"
                                max={stock.quantity}
                                value={cartQuantities[stock.id] || ''}
                                onChange={(e) => handleQuantityChange(stock.id, e.target.value)}
                                placeholder="Quantity"
                            />
                            <AddToCartButton onClick={() => handleAddToCart(stock.id)}>
                                <FaPlus /> Add to Cart
                            </AddToCartButton>
                        </FormGroup>
                        <div>
                            <Button onClick={() => handleEditItem(stock.id)}>Edit</Button>
                           
                        </div>
                    </StockItemWrapper>
                ))}
            </Grid>
        </Container>
    );
};

export default StockManagement;
