async function accountCategoryTree(g) {

    // categories always want in response
    const categories = ['assets', 'expenses', 'income', 'liabilites'];

    const accounts = await g.sys.system.executeQuery({
        instance: 'test1',
        database: 'moneymagics_db',
        query: `
            SELECT id, name, category, parent_id, is_folder
            FROM account
            ORDER BY name
        `
    });

    // Build lookup map
    const map = {};
    accounts.forEach(a => {
        map[a.id] = { ...a }; // do NOT pre-add children
    });

    // Build parent → children hierarchy
    const roots = [];
    accounts.forEach(a => {
        if (a.parent_id && map[a.parent_id]) {
            // Add child only when needed
            if (!map[a.parent_id].children) map[a.parent_id].children = [];
            map[a.parent_id].children.push(map[a.id]);
        } else {
            roots.push(map[a.id]);
        }
    });

    // Initialize result with ALL categories (even empty)
    const result = {};
    categories.forEach(cat => {
        result[cat] = [];
    });

    // Group root accounts by category
    roots.forEach(root => {
        if (result[root.category]) {
            result[root.category].push(root);
        }
    });

    return result;
}

module.exports = accountCategoryTree;