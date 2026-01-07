import { ISchemaType, EType, ISchemaProperty, IPropertyValidation } from 'types';
import * as T from 'types';

let schema: ISchemaType = {
    id: <ISchemaProperty>{
        __type: EType.number,
        isPrimaryKey: true,
        isAutoIncrementByDB: true
    },
    date: <ISchemaProperty>{
        __type: EType.date,
        validations: <IPropertyValidation>{
            required: true
        }
    },
    reference: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 100
        }
    },
    narration: EType.string,
    entry_no: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 50
        }
    },
    entry_type: <ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 20
        }
    },
    status:<ISchemaProperty>{
        __type: EType.string,
        validations: <IPropertyValidation>{
            required: true,
            maxLength: 20
        }
    },
    created_at: EType.date,
    updated_at: EType.date,
     lines_data: <any><ISchemaProperty[]>
    [{
        __type: EType.string,
        collection: "public.journal_line",
        s_columnVirtualLinker: "id",
        t_columnVirtualLinker: "journal_id",
        isVirtualField: true
    }], 
};

module.exports = { schema };