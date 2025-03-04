const fs = require("fs")


module.exports.start = function() {
    // all starting function
    
    // 1. File and directory
    if (!fs.existsSync("confs")) {
        console.log(`[*] Creating confs directory`)
        fs.mkdirSync("confs")
        console.log(`[*] Confs directory created`)
    }
    
    
    if (!fs.existsSync("mods")) {
        console.log(`[*] Creating mods directory`)
        fs.mkdirSync("mods")
        console.log(`[*] Mods directory created`)
        console.log(fs.readFileSync('./utils/mods.art', 'utf-8'))
        process.exit(0)
    }

    
}