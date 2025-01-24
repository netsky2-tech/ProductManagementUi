import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ( {children} ) => {

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Cargando...");

    const showLoading = (message = "Cargando..") => {
        setLoadingMessage(message)
        setIsLoading(true);
    }

    const hideLoading = () => {
        setIsLoading(false);
        setLoadingMessage("");
      };

    return (
        <LoadingContext.Provider value={{ 
            isLoading,
            loadingMessage, 
            showLoading,
            hideLoading
        
        }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => useContext(LoadingContext)