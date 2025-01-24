import { useLoading } from "../context/LoadingContext";

const API_URL = 'https://localhost:7078/api'

export const useApi = () => {
  const { showLoading, hideLoading } = useLoading();

  const handleResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }

  const fetchItems = async (endpoint, loadingMessage) => {

    try{

        showLoading(loadingMessage);

        const response = await fetch(`${API_URL}/${endpoint}`,
          {
            headers: {'Content-Type': 'application/json'}
          }
        );
        return await handleResponse(response);

    } catch (error){

        console.error("Error fetching items:", error)
        throw error;
    } finally{

      hideLoading();
    }
  }

  const createItem = async (endpoint, newItem, loadingMessage) => {
    try {
      showLoading(loadingMessage);

      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: { 'Content-Type': 'application/json' },
      });
      
      return await handleResponse(response);

    } catch (error) {

      console.error("Error creating item:", error);
      throw error;
    } finally {
      hideLoading()
    }
  }


  const updateItem = async (endpoint, newItem, loadingMessage) => {
    try {
      showLoading(loadingMessage)
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(newItem),
        headers: { 'Content-Type': 'application/json' },
      });

      return await handleResponse(response);

    } catch (error) {

      console.error("Error actualizando item:", error);
      throw error;
    }finally{
      hideLoading()
    }
  };

  const deleteItem = async (endpoint, loadingMessage) => {
    try {
      showLoading(loadingMessage)
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      return await handleResponse(response);

    } catch (error) {

      console.error("Error eliminando item:", error);
      throw error;
    }finally {

      hideLoading()
    }
  };

  const getSelectOptions = async (endpoint, loadingMessage) => {
    try{
      showLoading(loadingMessage)
      const response = await fetch(`${API_URL}/${endpoint}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      return await handleResponse(response);
    } catch(error) {

      console.error("Error obteniendo los datos:", error)
      throw error;
    } finally {
      hideLoading()
    }
  }

  return {
    fetchItems, 
    createItem,
    updateItem,
    deleteItem,
    getSelectOptions
  }
}










  