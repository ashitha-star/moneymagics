import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        isAutoIncrementByDB: true
    },
    quote_number: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 50
        }
    },
    quote_name: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 255
        }
    },
    customer_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.party",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    quote_date: <ISchemaProperty>{
        __type: EType.date,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    expiry_date: <ISchemaProperty>{
        __type: EType.date,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    status: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 20
        }
    },
    total_amount: <ISchemaProperty>{
        __type: EType.string,
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