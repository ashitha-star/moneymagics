import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        isAutoIncrementByDB: true
    },
    name: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 255
        }
    },
    quantity: <ISchemaProperty>{
        __type: EType.number,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    unit: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 50
        }
    },
    unit_price: <ISchemaProperty>{
        __type: EType.number,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    supplier_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.party",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    last_updated: EType.date
};

module.exports = { schema };