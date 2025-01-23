import React, { useState, useEffect } from 'react';

const FormModal = ({ show, onClose, onSave, initialData = {}, fields = [] }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = initialData[field.name] || '';
      return acc;
    }, {})
  );

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...initialData,
    }));
  }, [initialData]);

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
    <div className="modal fade show" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {initialData?.id ? 'Edit Record' : 'Create Record'}
            </h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name} className="mb-3">
                  <label htmlFor={field.name} className="form-label">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    className="form-control"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary">
                {initialData?.id ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FormModal };
