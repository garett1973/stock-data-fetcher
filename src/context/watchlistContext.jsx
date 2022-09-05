import React, { useState, createContext, useEffect } from "react";

export const WatchlistContext = createContext();

export const WatchlistContextProvider = (props) => {
    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") || ["AAPL", "TSLA", "GOOG", "AMZN", "META", "MSFT", "TWTR"]
    );

    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList]);

    const addStock = (symbol) => {
        if (watchList.includes(symbol)) {
            return;
        }
        setWatchList([...watchList, symbol]);
    }

    const removeStock = (symbol) => {
        setWatchList(watchList.filter(stock => stock !== symbol));
    }


    return (
        <WatchlistContext.Provider value={{ watchList, addStock, removeStock }}>
            {props.children}
        </WatchlistContext.Provider>
    )
}
