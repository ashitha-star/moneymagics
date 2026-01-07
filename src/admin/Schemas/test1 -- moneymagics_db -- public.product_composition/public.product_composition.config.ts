import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        isAutoIncrementByDB: true
    },
    product_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.products",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    raw_material_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.raw_materials",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    quantity_used: <ISchemaProperty>{
        __type: EType.number,
        validations: <IPropertyValidation>{
            required: true
        }
    }
};

module.exports = { schema };