const API_URL = 'https://localhost:7078/api'

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export const fetchItems = async (endpoint) => {
    try{

        const response = await fetch(`${API_URL}/${endpoint}`,
          {
            headers: {'Content-Type': 'application/json'}
          }
        );
        return await handleResponse(response);

    } catch (error){

        console.error("Error fetching items:", error)
        throw error;
    }
}

export const createItem = async (endpoint, newItem) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: { 'Content-Type': 'application/json' },
      });
      
      return await handleResponse(response);

    } catch (error) {

      console.error("Error creating item:", error);
      throw error;
    }
  };

  export const updateItem = async (endpoint, newItem) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(newItem),
        headers: { 'Content-Type': 'application/json' },
      });

      return await handleResponse(response);

    } catch (error) {

      console.error("Error updating item:", error);
      throw error;
    }
  };

  export const deleteItem = async (endpoint, newItem) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      return await handleResponse(response);

    } catch (error) {

      console.error("Error deleting item:", error);
      throw error;
    }
  };