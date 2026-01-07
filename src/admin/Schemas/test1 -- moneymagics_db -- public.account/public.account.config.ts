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
    category: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 255
        }
    },
    parent_id: <ISchemaProperty>{
        __type: EType.number,
        table: "public.account",
        column: "id"
    },
    is_folder: EType.boolean,
    children: <any><ISchemaProperty[]>
    [{
        __type: EType.number,
        collection: "public.account",
        s_columnVirtualLinker: "id",
        t_columnVirtualLinker: "parent_id",
        isVirtualField: true
    }], 
};

module.exports = { schema };