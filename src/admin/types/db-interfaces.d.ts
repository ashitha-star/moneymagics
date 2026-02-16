export namespace test1 {
export namespace MoneyMagics {
export interface IPublicCommentLikes {
    id: number;
    comment_id?: number;
    user_id?: number;
    liked_at?: Date;
}
export type IPublicCommentLikes_P = Partial<IPublicCommentLikes>;
export type IPublicCommentLikes_S = { [Property in keyof IPublicCommentLikes_P]: 1 | -1 };
} }
export namespace test1 {
export namespace MoneyMagics {
export interface IPublicComments {
    id: number;
    post_id?: number;
    user_id?: number;
    comment?: string;
    created_at?: Date;
}
export type IPublicComments_P = Partial<IPublicComments>;
export type IPublicComments_S = { [Property in keyof IPublicComments_P]: 1 | -1 };
} }
export namespace test1 {
export namespace MoneyMagics {
export interface IPublicPosts {
    id: number;
    user_id?: number;
    title?: string;
    content?: string;
    created_at?: Date;
}
export type IPublicPosts_P = Partial<IPublicPosts>;
export type IPublicPosts_S = { [Property in keyof IPublicPosts_P]: 1 | -1 };
} }
export namespace test1 {
export namespace MoneyMagics {
export interface IPublicUsers {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    created_at?: Date;
    updated_at?: Date;
}
export type IPublicUsers_P = Partial<IPublicUsers>;
export type IPublicUsers_S = { [Property in keyof IPublicUsers_P]: 1 | -1 };
} }
export namespace test1 {
export namespace MoneyMagics {
export interface IPublicUsersBackups {
    id: number;
    name: string;
    email: string;
    password: string;
    address?: string;
    created_at?: Date;
    updated_at?: Date;
}
export type IPublicUsersBackups_P = Partial<IPublicUsersBackups>;
export type IPublicUsersBackups_S = { [Property in keyof IPublicUsersBackups_P]: 1 | -1 };
} }
export namespace test1 {
export namespace employee8_db {
export interface IPublicCommentLikes {
    id: number;
    comment_id?: number;
    user_id?: number;
    liked_at?: Date;
}
export type IPublicCommentLikes_P = Partial<IPublicCommentLikes>;
export type IPublicCommentLikes_S = { [Property in keyof IPublicCommentLikes_P]: 1 | -1 };
} }
export namespace test1 {
export namespace employee8_db {
export interface IPublicComments {
    id: number;
    post_id?: number;
    user_id?: number;
    comment?: string;
    created_at?: Date;
}
export type IPublicComments_P = Partial<IPublicComments>;
export type IPublicComments_S = { [Property in keyof IPublicComments_P]: 1 | -1 };
} }
export namespace test1 {
export namespace employee8_db {
export interface IPublicPosts {
    id: number;
    user_id?: number;
    title?: string;
    content?: string;
    created_at?: Date;
}
export type IPublicPosts_P = Partial<IPublicPosts>;
export type IPublicPosts_S = { [Property in keyof IPublicPosts_P]: 1 | -1 };
} }
export namespace test1 {
export namespace employee8_db {
export interface IPublicUsers {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    posts?: number[];
    address?: string;
    created_at?: Date;
    updated_at?: Date;
}
export type IPublicUsers_P = Partial<IPublicUsers>;
export type IPublicUsers_S = { [Property in keyof IPublicUsers_P]: 1 | -1 };
} }
export namespace test1 {
export namespace employee8_db {
export interface IPublicUsersBackups {
    id: number;
    name: string;
    email: string;
    password: string;
    address?: string;
    created_at?: Date;
    updated_at?: Date;
}
export type IPublicUsersBackups_P = Partial<IPublicUsersBackups>;
export type IPublicUsersBackups_S = { [Property in keyof IPublicUsersBackups_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicAccount {
    id?: number;
    name: string;
    category: string;
    parent_id?: number;
    is_folder?: boolean;
    children?: number[];
}
export type IPublicAccount_P = Partial<IPublicAccount>;
export type IPublicAccount_S = { [Property in keyof IPublicAccount_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicItem {
    id?: number;
    name: string;
    item_type: string;
    category: string;
    item_code: string;
    hsn_sac_code?: string;
    unit?: string;
    description?: string;
    min_order_quantity?: number;
    rate: number;
    tax: number;
    sales_account_id: number;
    purchase_account_id: number;
}
export type IPublicItem_P = Partial<IPublicItem>;
export type IPublicItem_S = { [Property in keyof IPublicItem_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicJournalEntry {
    id?: number;
    date: Date;
    reference: string;
    narration?: string;
    entry_no: string;
    entry_type: string;
    status: string;
    created_at?: Date;
    updated_at?: Date;
    lines_data?: string[];
}
export type IPublicJournalEntry_P = Partial<IPublicJournalEntry>;
export type IPublicJournalEntry_S = { [Property in keyof IPublicJournalEntry_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicJournalLine {
    id?: number;
    journal_id: number;
    account_id: number;
    debit?: number;
    credit?: number;
}
export type IPublicJournalLine_P = Partial<IPublicJournalLine>;
export type IPublicJournalLine_S = { [Property in keyof IPublicJournalLine_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicParty {
    id?: number;
    name: string;
    role: string;
    email?: string;
    phone?: string;
    address?: string;
    default_account?: number;
    currency?: string;
    gst_reg?: string;
    gstin_no?: string;
    due_amount?: number;
}
export type IPublicParty_P = Partial<IPublicParty>;
export type IPublicParty_S = { [Property in keyof IPublicParty_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicProductComposition {
    id?: number;
    product_id: number;
    raw_material_id: number;
    quantity_used: number;
}
export type IPublicProductComposition_P = Partial<IPublicProductComposition>;
export type IPublicProductComposition_S = { [Property in keyof IPublicProductComposition_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicProducts {
    id?: number;
    name: string;
    quantity: number;
    cost_price: number;
    selling_price: number;
    composition?: number[];
}
export type IPublicProducts_P = Partial<IPublicProducts>;
export type IPublicProducts_S = { [Property in keyof IPublicProducts_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicPurchaseInvoice {
    id?: number;
    invoice_number: string;
    invoice_name: string;
    supplier_id: number;
    invoice_date: Date;
    status?: string;
    total_amount: string;
    notes?: string;
    attachment?: string;
    purchase_item?: number[];
}
export type IPublicPurchaseInvoice_P = Partial<IPublicPurchaseInvoice>;
export type IPublicPurchaseInvoice_S = { [Property in keyof IPublicPurchaseInvoice_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicPurchaseItem {
    id?: number;
    invoice_id: number;
    item_id: number;
    quantity: number;
    rate: number;
    tax_percent?: number;
    amount: number;
}
export type IPublicPurchaseItem_P = Partial<IPublicPurchaseItem>;
export type IPublicPurchaseItem_S = { [Property in keyof IPublicPurchaseItem_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicPurchaseOrder {
    id?: number;
    order_no: string;
    status?: string;
    supplier_id: number;
    order_date: Date;
    net_amount: number;
    due_amount: number;
    notes?: string;
}
export type IPublicPurchaseOrder_P = Partial<IPublicPurchaseOrder>;
export type IPublicPurchaseOrder_S = { [Property in keyof IPublicPurchaseOrder_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicPurchasePayment {
    id?: number;
    payment_number: string;
    payment_name: string;
    invoice_id: number;
    supplier_id: number;
    payment_date: Date;
    payment_mode: string;
    from_account_id: number;
    to_account_id: number;
    journal_id?: number;
    amount: number;
    notes?: string;
    attachment?: string;
}
export type IPublicPurchasePayment_P = Partial<IPublicPurchasePayment>;
export type IPublicPurchasePayment_S = { [Property in keyof IPublicPurchasePayment_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicRawMaterials {
    id?: number;
    name: string;
    quantity: number;
    unit: string;
    unit_price: number;
    supplier_id: number;
    last_updated?: Date;
}
export type IPublicRawMaterials_P = Partial<IPublicRawMaterials>;
export type IPublicRawMaterials_S = { [Property in keyof IPublicRawMaterials_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicSalesInvoice {
    id?: number;
    invoice_number: string;
    invoice_name: string;
    customer_id: number;
    invoice_date: Date;
    status: string;
    quote_id?: number;
    total_amount: string;
    notes?: string;
    attachment?: string;
}
export type IPublicSalesInvoice_P = Partial<IPublicSalesInvoice>;
export type IPublicSalesInvoice_S = { [Property in keyof IPublicSalesInvoice_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicSalesItem {
    id?: number;
    quote_id?: number;
    invoice_id?: number;
    item_id: number;
    quantity: number;
    rate: string;
    tax_percent?: string;
    amount: string;
}
export type IPublicSalesItem_P = Partial<IPublicSalesItem>;
export type IPublicSalesItem_S = { [Property in keyof IPublicSalesItem_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicSalesPayment {
    id?: number;
    payment_number: string;
    payment_name: string;
    invoice_id: number;
    customer_id: number;
    payment_date: Date;
    payment_mode: string;
    from_account_id: number;
    to_account_id: number;
    amount: string;
    notes?: string;
    attachment?: string;
}
export type IPublicSalesPayment_P = Partial<IPublicSalesPayment>;
export type IPublicSalesPayment_S = { [Property in keyof IPublicSalesPayment_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicSalesQuote {
    id?: number;
    quote_number: string;
    quote_name: string;
    customer_id: number;
    quote_date: Date;
    expiry_date: Date;
    status: string;
    total_amount: string;
    notes?: string;
    attachment?: string;
    referral_id: string;
    items?: number[];
}
export type IPublicSalesQuote_P = Partial<IPublicSalesQuote>;
export type IPublicSalesQuote_S = { [Property in keyof IPublicSalesQuote_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicTaxCode {
    id?: number;
    name: string;
    tax_rates: string;
}
export type IPublicTaxCode_P = Partial<IPublicTaxCode>;
export type IPublicTaxCode_S = { [Property in keyof IPublicTaxCode_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicTimeEntry {
    id?: number;
    name: string;
    description?: string;
    customer_id: number;
    account_id?: number;
    rate_per_hour?: number;
    amount?: number;
    entry_date?: Date;
    start?: Date;
    end?: Date;
    duration_minutes?: number;
    note?: string;
    attachment?: string;
    created_at?: Date;
    updated_at?: Date;
}
export type IPublicTimeEntry_P = Partial<IPublicTimeEntry>;
export type IPublicTimeEntry_S = { [Property in keyof IPublicTimeEntry_P]: 1 | -1 };
} }
export namespace test1 {
export namespace moneymagics_db {
export interface IPublicUsers {
    id?: number;
    name: string;
    email: string;
    password: string;
    phone_number?: string;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
    userType: string;
}
export type IPublicUsers_P = Partial<IPublicUsers>;
export type IPublicUsers_S = { [Property in keyof IPublicUsers_P]: 1 | -1 };
} }