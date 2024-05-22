import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import styled from 'styled-components';

// Styled components for styling
const InvoiceContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 5px;
`;

const CompanyInfo = styled.div`
  margin-bottom: 20px;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const ItemTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const TotalAmount = styled.div`
  font-weight: bold;
  text-align: right;
`;

const Checkout = ({ navigateHome }) => {
    const { cart, clearCart } = useContext(CartContext); 
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        handleCheckout();
    }, []);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);
       
        try {
            const response = await axios.post('http://localhost:8080/api/checkout/invoice', cart);
            setInvoice(response.data);
            clearCart();
        } catch (error) {
            console.error('Checkout failed:', error);
            setError('An error occurred during checkout. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <InvoiceContainer>
            {!invoice ? (
                <div>
                    <Header>
                        <Title>Invoice</Title>
                    </Header>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                </div>
            ) : (
                <div>
                    <Header>
                        <Title>Invoice</Title>
                    </Header>
                    <CompanyInfo>
                        <p>ABC Company</p>
                        <p>123 Street, City</p>
                        <p>Phone: 123-456-7890</p>
                    </CompanyInfo>
                    <Details>
                        <ItemTable>
                            <thead>
                                <tr>
                                    <TableHeader>Product Name</TableHeader>
                                    <TableHeader>Price per Item</TableHeader>
                                    <TableHeader>Quantity</TableHeader>
                                    <TableHeader>Total Price</TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.item.name}</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${item.price * item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </tbody>
                        </ItemTable>
                        <TotalAmount>Total Amount: ${invoice.totalAmount}</TotalAmount>
                    </Details>
                    <button onClick={navigateHome}>Cancel</button>
                </div>
            )}
        </InvoiceContainer>
    );
};

export default Checkout;
