import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    user_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.users",
        column: "id"
    },
    title: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            maxLength: 200
        }
    },
    content: EType.string,
    created_at: EType.date
};

module.exports = { schema };