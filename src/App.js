import React ,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import Navbar from "./Components/Navbar";
import ItemManagement from './Components/ItemManagerment';
import CategoryManagement from './Components/CategoryManagement';
import Login from './Components/Login';
import Register from './Components/Register';
import StockManagement from './Components/StockManagement';
// import CartManagement from './Components/CartManagement';
import { CartProvider } from './Components/CartContext' ;// Import the CartProvider
import CartTotal from './Components/CartTotal';
import Checkout from './Components/Checkout';
import Dashboard from './Components/Dashboard';
import { AuthProvider } from './Authentication/AuthProvider';
// import ProtectedRoute from './Authentication/ProtectedRoute';
import { AuthContext } from './Authentication/AuthProvider';

// Import other components

const App = () => {
    const ProtectedRoute = ({ element: Element, ...rest }) => {
        const { authToken } = useContext(AuthContext);
        return authToken ? <Element {...rest} /> : <Navigate to="/login" replace />;
    };
   
    return (
        
        
        <Router>
            <AuthProvider>
            <CartProvider>
            <Navbar />
            <CartTotal />
            <Routes>
            <Route path="/items" element={<ProtectedRoute element={ItemManagement} />} />
            
            <Route path="/categories" element={<ProtectedRoute element={CategoryManagement } />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stock" element={<ProtectedRoute element={StockManagement } />} />
            <Route path="/checkout" element={<ProtectedRoute element={Checkout} />} />
            <Route path="/dashboard" element={<Dashboard/> } />
               
                {/* Add routes for other pages */}

            </Routes>
            </CartProvider>
            </AuthProvider>
        </Router>
       

    );
};

export default App;
