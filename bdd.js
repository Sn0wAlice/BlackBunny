const fs = require("fs")
const {
    createClient
} = require('@clickhouse/client');


const client = createClient(JSON.parse(fs.readFileSync("./confs/clickhouse.json").toString()));


async function check_if_table_exists(table) {
    const query = `SHOW TABLES LIKE '${table}'`
    let data =  await client.query({
        query: query,
        format: "JSONEachRow"
    })
    return data.length > 0
}

module.exports = {
    migrate: async function(module, model) {
        // migrate JSON model -> BDD model
        
        // 1. Check if table "module" exists
        let check = await check_if_table_exists(module)
        if (check) {
            console.log(`[!] Skipping migration for ${module}, table already exists`)
            return
        }

        console.log(`[+] Migrating ${module} to BDD`)
        
    },

    injectdata: async function (module, data) {
        // map json -> bdd
        // todo
    }
}