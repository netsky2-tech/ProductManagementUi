import { CrudComponent } from "../components/CrudComponent";

const Units = () => {

    const fieldsProducts = [
        {name: 'id', label: 'Identificador', type:'number', required: false, readOnly: true},
        { name: 'name', label: 'Nombre de la unidad de medida', type: 'text', required: true },
        { name: 'abbreviation', label: 'Abreviación de la unidad de medida', type: 'text', required: false },

      ];

    const columnsProduct = [
        {label: 'Identificador', key: 'id'},
        {label: 'Nombre', key: 'name'},
        {label: 'Abreviación', key: 'abbreviation'},
    ]

    return (
        <CrudComponent
            apiEndpoint="UnitOfMeasurement"
            catalogName="Unidades de medidas"
            columns={columnsProduct}
            fields={fieldsProducts}
        />
    )
}

export { Units }