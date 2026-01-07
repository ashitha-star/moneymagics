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
    description: EType.string,
    customer_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.party",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    account_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.account",
        column: "id"
    },
    rate_per_hour: EType.number,
    amount: EType.number,
    entry_date: EType.date,
    start: EType.date,
    end: EType.date,
    duration_minutes: EType.number,
    note: EType.string,
    attachment: EType.string,
    created_at: EType.date,
    updated_at: EType.date
};

module.exports = { schema };