import * as T from 'types';
import * as db from 'db-interfaces';

async function main(g: T.IAMGlobal) {

    const queries: string[] = [

        /* =======================
           1. PARTY
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS party (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            role VARCHAR(20) NOT NULL
                CHECK (role IN ('CUSTOMER', 'SUPPLIER', 'BOTH')),
            email VARCHAR(255),
            phone VARCHAR(20),
            address TEXT
        );
        `,

        /* =======================
           2. ACCOUNT CATEGORY
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS account_category (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE
        );
        `,

        /* =======================
           3. ACCOUNT
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS account (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category_id BIGINT NOT NULL,
            parent_id BIGINT,
            is_group BOOLEAN DEFAULT TRUE,

            CONSTRAINT fk_account_category
                FOREIGN KEY (category_id)
                REFERENCES account_category(id)
                ON DELETE RESTRICT,

            CONSTRAINT fk_account_parent
                FOREIGN KEY (parent_id)
                REFERENCES account(id)
                ON DELETE CASCADE
        );
        `,

        /* =======================
           4. JOURNAL ENTRY
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS journal_entry (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            date DATE NOT NULL,
            reference VARCHAR(100) NOT NULL,
            narration TEXT
        );
        `,

        /* =======================
           5. JOURNAL LINE
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS journal_line (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            journal_id BIGINT NOT NULL,
            account_id BIGINT NOT NULL,
            debit DECIMAL(12,2) DEFAULT 0,
            credit DECIMAL(12,2) DEFAULT 0,

            CONSTRAINT fk_journal_line_journal
                FOREIGN KEY (journal_id)
                REFERENCES journal_entry(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_journal_line_account
                FOREIGN KEY (account_id)
                REFERENCES account(id)
                ON DELETE RESTRICT,

            CONSTRAINT chk_journal_debit_credit
                CHECK (
                    (debit > 0 AND credit = 0)
                 OR (debit = 0 AND credit > 0)
                )
        );
        `,

        /* =======================
           6. TAX CODE
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS tax_code (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            tax_rates JSONB NOT NULL DEFAULT '{}'::jsonb
        );
        `,

        /* =======================
           7. ITEM
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS item (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            item_type VARCHAR(20) NOT NULL
                CHECK (item_type IN ('PRODUCT','SERVICE','EXPENSE','TIME','MILEAGE')),
            category VARCHAR(20) NOT NULL
                CHECK (category IN ('SALES','PURCHASE')),
            item_code VARCHAR(50) UNIQUE NOT NULL,
            hsn_sac_code VARCHAR(20),
            unit VARCHAR(20),
            description TEXT,
            min_order_quantity INT DEFAULT 1,
            rate DECIMAL(10,2) NOT NULL,
            tax_percent DECIMAL(5,2) DEFAULT 0,
            sales_account_id BIGINT NOT NULL,
            purchase_account_id BIGINT NOT NULL,

            CONSTRAINT fk_item_sales_account
                FOREIGN KEY (sales_account_id)
                REFERENCES account(id)
                ON DELETE RESTRICT,

            CONSTRAINT fk_item_purchase_account
                FOREIGN KEY (purchase_account_id)
                REFERENCES account(id)
                ON DELETE RESTRICT
        );
        `,

        /* =======================
           8. SALES QUOTE
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS sales_quote (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            quote_number VARCHAR(50) UNIQUE NOT NULL,
            quote_name VARCHAR(255) NOT NULL,
            customer_id BIGINT NOT NULL,
            quote_date DATE NOT NULL,
            expiry_date DATE NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
                CHECK (status IN ('DRAFT','SENT','ACCEPTED','REJECTED','EXPIRED')),
            total_amount DECIMAL(12,2) NOT NULL,
            notes TEXT,
            attachment VARCHAR(255),

            CONSTRAINT fk_quote_customer
                FOREIGN KEY (customer_id)
                REFERENCES party(id)
                ON DELETE CASCADE
        );
        `,

        /* =======================
           9. SALES INVOICE
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS sales_invoice (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            invoice_number VARCHAR(50) UNIQUE NOT NULL,
            invoice_name VARCHAR(255) NOT NULL,
            customer_id BIGINT NOT NULL,
            invoice_date DATE NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
                CHECK (status IN ('DRAFT','SENT','PAID','CANCELLED')),
            quote_id BIGINT UNIQUE,
            total_amount DECIMAL(12,2) NOT NULL,
            notes TEXT,
            attachment VARCHAR(255),

            CONSTRAINT fk_invoice_customer
                FOREIGN KEY (customer_id)
                REFERENCES party(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_invoice_quote
                FOREIGN KEY (quote_id)
                REFERENCES sales_quote(id)
                ON DELETE SET NULL
        );
        `,

        /* =======================
           10. SALES ITEM
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS sales_item (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            quote_id BIGINT,
            invoice_id BIGINT,
            item_id BIGINT NOT NULL,
            quantity INT NOT NULL,
            rate DECIMAL(10,2) NOT NULL,
            tax_percent DECIMAL(5,2) DEFAULT 0,
            amount DECIMAL(12,2) NOT NULL,

            CONSTRAINT fk_sales_item_quote
                FOREIGN KEY (quote_id)
                REFERENCES sales_quote(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_sales_item_invoice
                FOREIGN KEY (invoice_id)
                REFERENCES sales_invoice(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_sales_item_item
                FOREIGN KEY (item_id)
                REFERENCES item(id)
                ON DELETE RESTRICT,

            CONSTRAINT chk_sales_item_parent
                CHECK (
                    (quote_id IS NOT NULL AND invoice_id IS NULL)
                 OR (quote_id IS NULL AND invoice_id IS NOT NULL)
                )
        );
        `,

        /* =======================
           11. PURCHASE INVOICE
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS purchase_invoice (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            invoice_number VARCHAR(50) UNIQUE NOT NULL,
            invoice_name VARCHAR(255) NOT NULL,
            supplier_id BIGINT NOT NULL,
            invoice_date DATE NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
                CHECK (status IN ('DRAFT','PARTIALLY_PAID','PAID')),
            total_amount DECIMAL(12,2) NOT NULL,
            notes TEXT,
            attachment VARCHAR(255),

            CONSTRAINT fk_purchase_supplier
                FOREIGN KEY (supplier_id)
                REFERENCES party(id)
                ON DELETE CASCADE
        );
        `,

        /* =======================
           12. PURCHASE ITEM
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS purchase_item (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            invoice_id BIGINT NOT NULL,
            item_id BIGINT NOT NULL,
            quantity INT NOT NULL,
            rate DECIMAL(10,2) NOT NULL,
            tax_percent DECIMAL(5,2) DEFAULT 0,
            amount DECIMAL(12,2) NOT NULL,

            CONSTRAINT fk_purchase_item_invoice
                FOREIGN KEY (invoice_id)
                REFERENCES purchase_invoice(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_purchase_item_item
                FOREIGN KEY (item_id)
                REFERENCES item(id)
                ON DELETE RESTRICT
        );
        `,

        /* =======================
           13. PURCHASE ORDER
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS purchase_order (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            order_no VARCHAR(50) UNIQUE NOT NULL,
            status VARCHAR(30) DEFAULT 'DRAFT'
                CHECK (status IN ('DRAFT','SENT','APPROVED','CANCELLED')),
            supplier_id BIGINT NOT NULL,
            order_date DATE NOT NULL,
            net_amount DECIMAL(12,2) NOT NULL,
            due_amount DECIMAL(12,2) NOT NULL,
            notes TEXT,

            CONSTRAINT fk_purchase_order_supplier
                FOREIGN KEY (supplier_id)
                REFERENCES party(id)
                ON DELETE CASCADE
        );
        `,

        /* =======================
           14. SALES PAYMENT
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS sales_payment (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            payment_number VARCHAR(50) UNIQUE NOT NULL,
            payment_name VARCHAR(255) NOT NULL,
            invoice_id BIGINT NOT NULL,
            customer_id BIGINT NOT NULL,
            payment_date DATE NOT NULL,
            payment_mode VARCHAR(50) NOT NULL,
            from_account_id BIGINT NOT NULL,
            to_account_id BIGINT NOT NULL,
            journal_id BIGINT UNIQUE,
            amount DECIMAL(12,2) NOT NULL,
            notes TEXT,
            attachment VARCHAR(255),

            CONSTRAINT fk_sales_payment_invoice
                FOREIGN KEY (invoice_id)
                REFERENCES sales_invoice(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_sales_payment_customer
                FOREIGN KEY (customer_id)
                REFERENCES party(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_sales_payment_from_account
                FOREIGN KEY (from_account_id)
                REFERENCES account(id)
                ON DELETE RESTRICT,

            CONSTRAINT fk_sales_payment_to_account
                FOREIGN KEY (to_account_id)
                REFERENCES account(id)
                ON DELETE RESTRICT,

            CONSTRAINT fk_sales_payment_journal
                FOREIGN KEY (journal_id)
                REFERENCES journal_entry(id)
                ON DELETE SET NULL
        );
        `,

        /* =======================
           15. PURCHASE PAYMENT
        ======================= */
        `
        CREATE TABLE IF NOT EXISTS purchase_payment (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            payment_number VARCHAR(50) UNIQUE NOT NULL,
            payment_name VARCHAR(255) NOT NULL,
            invoice_id BIGINT NOT NULL,
            supplier_id BIGINT NOT NULL,
            payment_date DATE NOT NULL,
            payment_mode VARCHAR(50) NOT NULL,
            from_account_id BIGINT NOT NULL,
            to_account_id BIGINT NOT NULL,
            journal_id BIGINT UNIQUE,
            amount DECIMAL(12,2) NOT NULL,
            notes TEXT,
            attachment VARCHAR(255),

            CONSTRAINT fk_purchase_payment_invoice
                FOREIGN KEY (invoice_id)
                REFERENCES purchase_invoice(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_purchase_payment_supplier
                FOREIGN KEY (supplier_id)
                REFERENCES party(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_purchase_payment_from_account
                FOREIGN KEY (from_account_id)
                REFERENCES account(id)
                ON DELETE RESTRICT,

            CONSTRAINT fk_purchase_payment_to_account
                FOREIGN KEY (to_account_id)
                REFERENCES account(id)
                ON DELETE RESTRICT,

            CONSTRAINT fk_purchase_payment_journal
                FOREIGN KEY (journal_id)
                REFERENCES journal_entry(id)
                ON DELETE SET NULL
        );
        `
    ];

    for (const query of queries) {
        await g.sys.system.executeQuery({
            instance: 'test1',
            query
        });
    }

    return {
        success: true,
        message: 'All 15 tables created successfully'
    };
}

module.exports = main;