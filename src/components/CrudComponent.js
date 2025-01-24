import { useState, useEffect } from "react";
import { fetchItems, createItem, updateItem, deleteItem } from "../services/api";
import { FormModal } from "./FormModal";

const CrudComponent = ({ apiEndpoint, catalogName, columns, fields }) => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)

    const fetchItemsData = async () => {
        const response = await fetchItems(apiEndpoint)
        setItems(response.data.items)
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

    const handleSave  = async (data) => {

        if(data.id) {
            await updateItem(apiEndpoint, data)
            await fetchItemsData()
        } else {
            await createItem(apiEndpoint,data)
            await fetchItemsData()
        }
        setShowModal(false)
    }

    //const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
    <div className="container mt-5">
        <h2 className="mb-4"> Administración de {catalogName}</h2>
    
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
            <button onClick={handleCreate} className="btn btn-primary mt-2">Crear {catalogName}</button>
        </div>
    
        {/* Lista de Items */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th key={index}>{col.label}</th>
                  ))}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length > 0 ? (
                  items.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((col, colIndex) => (
                        <td key={colIndex}>{item[col.key]}</td>
                      ))}
                      <td>
                        <button 
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleUpdate(item)}
                        > Editar
                        </button>

                        <button 
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(item)}
                        > Eliminar
                        </button>
                      </td>
                    </tr>
                  ))

                ) : (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
          </table>
        </div>

        {/*Modal para crear y  actualizar registros*/}
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