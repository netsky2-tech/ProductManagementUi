import { CrudComponent } from "../components/CrudComponent";

const Categories = () => {

    const fieldsProducts = [
        {name: 'id', label: 'Identificador', type:'number', required: false, readOnly: true},
        { name: 'name', label: 'Nombre del producto', type: 'text', required: true, readOnly: false },
        { name: 'description', label: 'Descripcion de la categoria', type: 'text', required: false, readOnly: false },

      ];

    const columnsProduct = [
        {label: 'Identificador', key: 'id'},
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