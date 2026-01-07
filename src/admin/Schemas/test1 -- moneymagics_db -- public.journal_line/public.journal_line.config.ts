import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        isAutoIncrementByDB: true
    },
    journal_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.journal_entry",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    account_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.account",
        column: "id",
        validations: <IPropertyValidation>{
            required: true
        }
    },
    debit: EType.number,
    credit: EType.number
};

module.exports = { schema };