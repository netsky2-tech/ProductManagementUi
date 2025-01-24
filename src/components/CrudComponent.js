import { useState, useEffect } from "react";
import { useApi } from "../services/api";
import { FormModal } from "./FormModal";
import { ToastNotifications } from "./ToastNotifications";

const CrudComponent = ({ apiEndpoint, catalogName, columns, fields }) => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [currentRow, setCurrentRow] = useState(null)
    const [message, setMessage] = useState("")
    const { fetchItems, createItem, updateItem, deleteItem } = useApi()
    const [isUpdate, setIsUpdate] = useState(false)

    const fetchItemsData = async () => {
        const response = await fetchItems(apiEndpoint)
        setItems(response.data.items)
    }
    

    useEffect(() => {
      setTimeout(() => setShowNotification(false), 5000);
    }, [showNotification])

    useEffect(() => {
        fetchItemsData();
    }, [])

    const handleCreate = () => {
        setCurrentRow(null)
        setShowModal(true)
    };

    const handleUpdate = async (data) => {
        setIsUpdate(true)
        setCurrentRow(data)
        setShowModal(true)
    }

    const handleDelete = async (item) => {
        const success = await deleteItem(item.id, apiEndpoint, "Elimando registro..");
        if (success) {
          setMessage(success.message)
          setShowNotification(true)
          fetchItemsData()
        }
    };

    const handleSave  = async (data) => {
        if(isUpdate) {
          console.log(data)
            const result = await updateItem(data.id, apiEndpoint, data, "Actualizando registro..")
            setMessage(result.message)
            setShowNotification(true)
            await fetchItemsData()
            setIsUpdate(false)
        } else {
            const result = await createItem(apiEndpoint,data)
            setMessage(result.message)
            setShowNotification(true)
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
        initialData={currentRow || {}}
        fields={fields}
        ></FormModal>

        {/*Notificaciones */}
        <ToastNotifications
        title="Notificacion"
        message={message}
        show={showNotification}
        />

    </div>
    );
}

export { CrudComponent }