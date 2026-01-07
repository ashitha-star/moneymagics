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
    comment_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.comments",
        column: "id"
    },
    user_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.users",
        column: "id"
    },
    liked_at: EType.date
};

module.exports = { schema };