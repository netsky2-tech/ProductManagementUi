import { CrudComponent } from "../components/CrudComponent";

const Categories = () => {

    const fieldsProducts = [
        { name: 'name', label: 'Nombre del producto', type: 'text', required: true },
        { name: 'description', label: 'Descripcion de la categoria', type: 'text', required: false },

      ];

    const columnsProduct = [
        {label: 'Nombre', key: 'name'},
        {label: 'Descripcion', key: 'description'},
    ]

    return (
        <CrudComponent
            apiEndpoint="Categories"
            catalogName="Categorias"
            columns={columnsProduct}
            fields={fieldsProducts}
        />
    )
}

export { Categories }