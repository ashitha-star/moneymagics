import * as T from 'types';
import * as C from 'utils/Constants';

async function main(g: T.IAMGlobal) {

  const resp: any = await g.sys.db.getAll({
    instance: C.instance,
    database: C.db,
    collection: "public.journal_entry",
    options: {
      fields: ["entry_no"],
      limit: 1000,              // enough for max detection
      orderBy: [{ field: "id", order: "DESC" }]
    }
  }, true);

  const rows = resp?.data || [];

  let maxNo = 0;

  for (const r of rows) {
    if (!r.entry_no) continue;

    // remove everything except digits
    const num = parseInt(r.entry_no.replace(/\D/g, ''), 10);
    if (!isNaN(num) && num > maxNo) {
      maxNo = num;
    }
  }

  const nextNo = maxNo + 1;

  const newEntryNo =
    "JV" + String(nextNo).padStart(4, '0');

  return {
    success: true,
    entry_no: newEntryNo
  };
}

module.exports = main;