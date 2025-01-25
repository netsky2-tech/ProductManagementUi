import { useLoading } from "../context/LoadingContext";

const API_URL = process.env.REACT_APP_API_URL

export const useApi = () => {
  const { showLoading, hideLoading } = useLoading();

  const handleResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }

  const fetchItems = async (endpoint, loadingMessage, searchQuery) => {

    try{

        showLoading(loadingMessage);
        const url = new URL(`${API_URL}/${endpoint}`);
        if (searchQuery) {
          url.searchParams.append("name", searchQuery);
        }

        const response = await fetch(url, {
          headers: { "Content-Type": "application/json" },
        });
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


  const updateItem = async (id, endpoint, newItem, loadingMessage) => {
    try {
      showLoading(loadingMessage)
      const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
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

  const deleteItem = async (id, endpoint, loadingMessage) => {
    try {
      showLoading(loadingMessage)
      const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
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










  