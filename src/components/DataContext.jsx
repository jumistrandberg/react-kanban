import React, {useState, useEffect, createContext} from 'react'
import { json } from 'react-router-dom';

export const DataContext = createContext({}); 
export const DataProvider = ({children}) => {
    const [cards, setCards] = useState(() => {
        const storedCards = localStorage.getItem("cards"); 
        return storedCards ? JSON.parse(storedCards) : [];
    });

    const [columns, setColumns] = useState(() => {
        const storedColumns = localStorage.getItem("columns"); 
        return storedColumns ? JSON.parse(storedColumns) : []; 
    }); 

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]); 

    useEffect(() => {
        localStorage.setItem("columns", JSON.stringify(columns));
    }, [columns]);

    useEffect(() => {
        if (!localStorage.getItem("cards")) {
            setCards((prevCards) => [...prevCards]);
        }
    }, []);

    return (
        <DataContext.Provider value = {{cards, setCards, columns, setColumns}}>
            {children}
        </DataContext.Provider>
    )
}; 

export default DataContext