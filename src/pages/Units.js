import { CrudComponent } from "../components/CrudComponent";

const Units = () => {

    const fieldsProducts = [
        { name: 'name', label: 'Nombre de la unidad de medida', type: 'text', required: true },
        { name: 'abbreviation', label: 'Abreviación de la unidad de medida', type: 'text', required: false },

      ];

    const columnsProduct = [
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