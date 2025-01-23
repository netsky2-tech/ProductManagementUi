import { useState, useEffect } from "react";
import { fetchItems, createItem, updateItem, deleteItem } from "../services/api";
import { FormModal } from "./FormModal";

const CrudComponent = ({ apiEndpoint, catalogName, columns, fields }) => {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null)
    const [updatedItem, setUpdatedItem] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)

    const fetchItemsData = async () => {
        const data = await fetchItems(apiEndpoint)
        setItems(data)
    }

    useEffect(() => {
        fetchItemsData();
    }, [apiEndpoint])

    const handleCreate = () => {
        setCurrentProduct(null)
        setShowModal(true)
    };

    const handleUpdate = async (product) => {
        setCurrentProduct(product)
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        const success = await deleteItem(apiEndpoint, id);
        if (success) {
          fetchItemsData()
        }
    };

    const handleSave  = async (product) => {

        if(product.productId) {
            await updateItem(apiEndpoint, product)
            fetchItemsData()
        } else {
            await createItem(product)
            fetchItemsData()
        }
        setShowModal(false)
    }

    //const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
    <div className="container mt-5">
        <h2 className="mb-4">{catalogName} CRUD</h2>
    
        {/* Filtro */}
        <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${catalogName}`}
            />
        </div>
    
        {/* Crear Nuevo Item */}
        <div className="mb-3">
            <button onClick={handleCreate} className="btn btn-primary mt-2">Add {catalogName}</button>
        </div>
    
        {/* Lista de Items */}
        <table className="table">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {editingItem === item.id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={updatedItem}
                        onChange={(e) => setUpdatedItem(e.target.value)}
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {editingItem === item.id ? (
                      <button className="btn btn-success" onClick={() => handleUpdate(item.id)}>Update</button>
                    ) : (
                      <button className="btn btn-warning" onClick={() => {
                        setEditingItem(item.id);
                        setUpdatedItem(item.name);
                      }}>Edit</button>
                    )}
                    <button className="btn btn-danger ms-2" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>

        {/*Modal for create or edit item*/}
        <FormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initialData={currentProduct || {}}
        fields={fields}
        ></FormModal>
    </div>
    );
}

export { CrudComponent }