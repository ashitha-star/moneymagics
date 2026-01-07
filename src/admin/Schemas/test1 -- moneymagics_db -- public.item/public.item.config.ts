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
    item_type: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            enum: ['PRODUCT', 'SERVICE', 'EXPENSE', 'TIME', 'MILEAGE'],
            maxLength: 20
        }
    },
    category: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            enum: ['SALES', 'PURCHASE'],
            maxLength: 20
        }
    },
    item_code: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 50
        }
    },
    hsn_sac_code: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            maxLength: 20
        }
    },
    unit: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            maxLength: 20
        }
    },
    description: EType.string,
    min_order_quantity: EType.number,
    rate: <ISchemaProperty>{
        __type: EType.number,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    tax: <ISchemaProperty>{
        __type: EType.number,
        collection: "public.tax_code",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    sales_account_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.account",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    purchase_account_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.account",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    }
};

module.exports = { schema };