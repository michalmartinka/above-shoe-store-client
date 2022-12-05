import React, { useState } from 'react';
import './App.css';
import { Shoe } from './shoes/Shoe';
import ShoesPage from './shoes/ShoesPage';
import { ShopContext } from './shoes/ShopContext';


function App() {
    const [basket, setBasket] = useState(new Array<{shoe: Shoe, size: number}>())
    
    return (
        <ShopContext.Provider value={{basket, setBasket}}>
            <div className="container">
                <ShoesPage />
            </div>
        </ShopContext.Provider>
    );
}

export default App;
