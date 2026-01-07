import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        isAutoIncrementByDB: true
    },
    payment_number: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 50
        }
    },
    payment_name: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 255
        }
    },
    invoice_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.purchase_invoice",
        column: "id",
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
    payment_date: <ISchemaProperty>{
        __type: EType.date,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    payment_mode: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 50
        }
    },
    from_account_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.account",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    to_account_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.account",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    journal_id: EType.number,
    amount: <ISchemaProperty>{
        __type: EType.number,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    notes: EType.string,
    attachment: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            maxLength: 255
        }
    }
};

module.exports = { schema };