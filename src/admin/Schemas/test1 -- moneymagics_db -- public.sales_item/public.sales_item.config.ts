import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        isAutoIncrementByDB: true
    },
    quote_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.sales_quote",
        column: "id"
    },
    invoice_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.sales_invoice",
        column: "id"
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
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    tax_percent: EType.string,
    amount: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true
        }
    }
};

module.exports = { schema };