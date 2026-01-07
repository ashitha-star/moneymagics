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
    post_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.posts",
        column: "id"
    },
    user_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.users",
        column: "id"
    },
    comment: EType.string,
    created_at: EType.date
};

module.exports = { schema };