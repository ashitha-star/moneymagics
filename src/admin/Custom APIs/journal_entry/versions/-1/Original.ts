import * as T from 'types';
import * as C from 'utils/Constants';

async function main(g: T.IAMGlobal) {
  try {
    const body = g.req.body;

    // 1️⃣ Validations
    if (!body.lines || body.lines.length < 2) {
      throw new Error('Journal entry must have at least 2 lines');
    }

    const totalDebit = body.lines.reduce((s, l) => s + (l.debit || 0), 0);
    const totalCredit = body.lines.reduce((s, l) => s + (l.credit || 0), 0);

    if (totalDebit !== totalCredit) {
      throw new Error('Debit and Credit must be equal');
    }

    // 2️⃣ Save journal entry
    const entryConfig = {
      instance: C.instance,
      database: C.db,
      table: 'public.journal_entry', // 🔥 HARD SAFE VALUE
      saveData: {
        date: body.date,
        reference: body.reference,
        narration: body.narration,
        entry_no: body.entry_no,
        entry_type: body.entry_type,
        status:body.status
      }
    };

    const savedEntry: any =
      await g.sys.db.saveSingleOrMultiple(entryConfig);

    const journalId = savedEntry.id;

    // 3️⃣ Save journal lines
    const lineConfig = {
      instance: C.instance,
      database: C.db,
      table: 'public.journal_line',
      saveData: body.lines.map(l => ({
        journal_id: journalId,
        account_id: l.account_id,
        debit: l.debit || 0,
        credit: l.credit || 0
      }))
    };

    await g.sys.db.saveSingleOrMultiple(lineConfig);

    return {
      success: true,
      message: 'Journal entry created successfully',
      journal_id: journalId
    };

  } catch (error) {
    g.logger.error(error);
    throw [{
      message: 'Failed to create journal entry',
      systemMessage: error.message,
      code: T.EStatusCode.INTERNAL_SERVER_ERROR
    }];
  }
}

module.exports = main;