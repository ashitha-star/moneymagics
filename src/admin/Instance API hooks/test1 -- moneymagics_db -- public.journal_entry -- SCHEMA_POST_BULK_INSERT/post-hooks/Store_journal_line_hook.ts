import * as T from 'types';
import * as db from 'db-interfaces';

async function main(g /** @type {T.IAMGlobal} */) {

    // 1️⃣ Saved journal entry result
    const journalEntry = g.req.output;

    // 2️⃣ Lines from frontend request
    const lines = g.req.body.lines;

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
        return journalEntry; // no lines, just return
    }

    // 3️⃣ Prepare journal_line rows
    const journalLines = lines.map(line => ({
        journal_id: journalEntry.id,   // 🔑 link to entry
        account_id: line.account_id,
        debit: line.debit || 0,
        credit: line.credit || 0
    }));

    // 4️⃣ Insert multiple lines at once
    await db.public__journal_line.bulkInsert(journalLines);

    // 5️⃣ Return original response
    return journalEntry;
}

module.exports = main;