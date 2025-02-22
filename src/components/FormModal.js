import React, { useState, useEffect } from 'react';
import { useApi } from '../services/api';

const FormModal = ({ show, onClose, onSave, initialData = {}, fields = [] }) => {

  const [formData, setFormData] = useState({});
  const [selectOptions, setSelectOptions] = useState({})
  const { getSelectOptions } = useApi()

  useEffect(() => {
    if (initialData) {
      setFormData(
        fields.reduce((acc, field) => {
          acc[field.name] = initialData[field.name] || "";
          return acc;
        }, {})
      );
    }
  }, [initialData, fields]);


  const [selectsLoaded, setSelectsLoaded] = useState(false);

  useEffect(() => {
    if (selectsLoaded) return;

    const fetchSelectData = async () => {
      const optionsData = {};
      for (const field of fields) {
        if (field.type === "select" && field.apiEndpoint) {
          try {
            const response = await getSelectOptions(field.apiEndpoint);
            const data = response.data;
            optionsData[field.name] = data;
          } catch (error) {
            console.error(`Error obteniendo los datos de ${field.name}: `, error);
          }
        }
      }
      setSelectOptions(optionsData);
      setSelectsLoaded(true);
    };

    fetchSelectData();
  }, [fields, getSelectOptions, selectsLoaded]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleClose = () => {
    onClose();
    setFormData(fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {}));
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} aria-labelledby="crudModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="title-modal">
              {initialData?.id ? 'Actualizar registro' : 'Crear registro'}
            </h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name} className="mb-3">
                  <label htmlFor={field.name} className="form-label">{field.label}</label>
                  {field.type === "select" ? (
                    <select
                    id={field.name}
                    name={field.name}
                    className="form-select"
                    required={field.required}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    >
                      <option value="">Selecciona {field.label}</option>
                      {selectOptions[field.name]?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                      <input
                        type={field.type || 'text'}
                        className="form-control"
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        readOnly={field.readOnly || false}
                      />
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-primary">
                {initialData?.id ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FormModal };
