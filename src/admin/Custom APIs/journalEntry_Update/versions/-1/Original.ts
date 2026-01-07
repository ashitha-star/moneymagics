import * as T from 'types';
import * as C from 'utils/Constants';

async function main(g: T.IAMGlobal) {
  try {
    const journalId = Number(g.req.params.id);
    const body = g.req.body;

    // 1️⃣ Fetch existing journal entry (API Maker way)
    const existingRows = await g.sys.db.fetch({
      instance: C.instance,
      database: C.db,
      table: 'public.journal_entry',
      where: { id: journalId }
    });

    const existing = existingRows?.[0];

    if (!existing) {
      throw new Error('Journal entry not found');
    }

    // 2️⃣ Block update if already submitted
    if (existing.status === 'submitted') {
      throw new Error('Submitted journal cannot be edited');
    }

    // 3️⃣ Validate journal lines
    if (!body.lines || body.lines.length < 2) {
      throw new Error('Journal entry must have at least 2 lines');
    }

    const totalDebit = body.lines.reduce(
      (s, l) => s + Number(l.debit || 0), 0
    );
    const totalCredit = body.lines.reduce(
      (s, l) => s + Number(l.credit || 0), 0
    );

    if (totalDebit !== totalCredit) {
      throw new Error('Debit and Credit must be equal');
    }

    // 4️⃣ Update journal entry (status optional)
    await g.sys.db.update({
      instance: C.instance,
      database: C.db,
      table: 'public.journal_entry',
      where: { id: journalId },
      updateData: {
        date: body.date,
        reference: body.reference,
        narration: body.narration,
        entry_type: body.entry_type,
        status: body.status ?? existing.status
      }
    });

    // 5️⃣ Delete existing journal lines
    await g.sys.db.delete({
      instance: C.instance,
      database: C.db,
      table: 'public.journal_line',
      where: { journal_id: journalId }
    });

    // 6️⃣ Insert updated lines
    await g.sys.db.saveSingleOrMultiple({
      instance: C.instance,
      database: C.db,
      table: 'public.journal_line',
      saveData: body.lines.map(l => ({
        journal_id: journalId,
        account_id: l.account_id,
        debit: Number(l.debit || 0),
        credit: Number(l.credit || 0)
      }))
    });

    return {
      success: true,
      message:
        body.status === 'submitted'
          ? 'Journal entry submitted successfully'
          : 'Journal entry updated successfully'
    };

  } catch (error) {
    g.logger.error(error);
    throw [{
      message: 'Failed to update journal entry',
      systemMessage: error.message,
      code: T.EStatusCode.INTERNAL_SERVER_ERROR
    }];
  }
}

module.exports = main;