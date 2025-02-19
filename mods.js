const fs = require('fs');


let m = []


module.exports.mods = {
    //                     
    //   __              _ 
    //  |  |   ___ ___ _| |
    //  |  |__| . | .'| . |
    //  |_____|___|__,|___|
    //                     
    loadMods: async function() {
        const all_files = this.exploreDir("./mods")
        for (const file of all_files) {
            const mod = require(`./mods/${file}`)
            if(!mod.name || !mod.description || !mod.version || !mod.run) {
                console.log(`[!] Skipping mod: ${file}, missing required fields`)
                continue
            }   
            console.log(`[+] Loaded mod: ${mod.name}`)
            m.push({
                name: mod.name,
                description: mod.description,
                version: mod.version,
                instance: mod.run
            })
        }

        console.log(`[+] Loaded ${m.length} mods`)
    },

    //                 
    //   _____         
    //  | __  |_ _ ___ 
    //  |    -| | |   |
    //  |__|__|___|_|_|
    //                 
    route: async function(module, path) {
        let mod = m.find(m => m.name === module)
        if (!mod) {
            return {
                status: 404,
                message: "Mod not found"
            }
        }
        
        let res = await mod.instance(path)
        
        return {
            status: 200,
            ...res
        }
    },

    //                     
    //   _____ _   _ _     
    //  |  |  | |_|_| |___ 
    //  |  |  |  _| | |_ -|
    //  |_____|_| |_|_|___|
    //                     
    exploreDir(path) {
        const files = fs.readdirSync(path)
        return files.filter(file => file.endsWith(".js"))
    }
}