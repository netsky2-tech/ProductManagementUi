import { CrudComponent } from "../components/CrudComponent";

const Products = () => {

    const fieldsProducts = [
        { name: 'name', label: 'Nombre del producto', type: 'text', required: true },
        { name: 'price', label: 'Precio', type: 'number', required: true },
        { name: 'categoryId', label: 'Categoria', type: 'select', required: true, apiEndpoint:'Categories/options' },
        { name: 'unitOfMeasurementId', label: 'Unidad de medida', type: 'select', required: true },
      ];

    const columnsProduct = [
        {label: 'Nombre', key: 'name'},
        {label: 'Precio', key:'price'},
        {label: 'Categoria', key: 'categoryName'},
        {label: 'Unidad de medida', key: 'unitOfMeasurementName'}
    ]

    return (
        <CrudComponent
            apiEndpoint="Products"
            catalogName="Productos"
            columns={columnsProduct}
            fields={fieldsProducts}
        />
    )
}

export { Products }