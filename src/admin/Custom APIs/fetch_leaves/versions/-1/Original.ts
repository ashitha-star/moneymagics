async function getLeafAccounts(g) {
    // Fetch all accounts
    const accounts = await g.sys.db.getAll({
        instance: 'test1',database: 'moneymagics_db', collection: "account",
    });

    // Build a lookup map
    const map = {};
    accounts.forEach(a => {
        map[a.id] = { ...a, children: [] };
    });

    // Build parent → children hierarchy
    accounts.forEach(a => {
        if (a.parent_id && map[a.parent_id]) {
            map[a.parent_id].children.push(map[a.id]);
        }
    });

    // Helper function to recursively collect leaves
    const result = [];

    function collectLeaves(node) {
        if (!node.children || node.children.length === 0) {
            // Leaf node, push without children property
            const { children, ...leaf } = node;
            result.push(leaf);
        } else {
            node.children.forEach(child => collectLeaves(child));
        }
    }

    // Collect leaves starting from all root nodes
    accounts.forEach(a => {
        if (!a.parent_id) {
            collectLeaves(map[a.id]);
        }
    });

    return result;
}

module.exports = getLeafAccounts;