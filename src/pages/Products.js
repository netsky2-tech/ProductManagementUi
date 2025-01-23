import { CrudComponent } from "../components/CrudComponent";

const Products = () => {
    const fieldsProducts = [
        { name: 'name', label: 'Nombre del producto', type: 'text', required: true },
        { name: 'price', label: 'Precio', type: 'number', required: true },
        { name: 'description', label: 'Descripcion', type: 'text', required: false },
      ];

    return (
        <CrudComponent
            apiEndpoint="Products"
            catalogName="Productos"
            columns={['ID', 'Name']}
            fields={fieldsProducts}
        />
    )
}

export { Products }