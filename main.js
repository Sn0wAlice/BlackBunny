const fs = require("fs")
const express = require('express');
const app = express();

const { start } = require("./utils/start")
const { mods } = require("./mods")
// Print the ASCII art


// middleware
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.get('/mods/*', async (req, res) => {
    // show full path
    console.log(`[GET] ${req.path}`)
    let module = req.path.split("/")[2]
    let path = req.path.replace(`/mods/${module}/`, "")

    let exec = await mods.route(module, `/${path}`)

    res.json({
        "mod": mods,
        "path": path,
        "sub": exec
    })
})

async function main() {
    console.log(fs.readFileSync("./utils/ascii.art").toString())
    start()

    // Load all the mods
    await mods.loadMods()

    // Start the server
    app.listen(3000, "0.0.0.0", () => {
        console.log(`\n[+] Server is running on http://0.0.0.0:3000`);
    });
}

main()