import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        isAutoIncrementByDB: true
    },
    invoice_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.purchase_invoice",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    item_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.item",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    quantity: <ISchemaProperty>{
        __type: EType.number,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    rate: <ISchemaProperty>{
        __type: EType.number,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    tax_percent: EType.number,
    amount: <ISchemaProperty>{
        __type: EType.number,
        validations: <IPropertyValidation>{
            required: true
        }
    }
};

module.exports = { schema };