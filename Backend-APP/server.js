

const express = require("express")
const app = express()
const fs = require('fs')
const path = require("path");

const PORT = 8080

app.use(express.json())

const userFolder = path.join(__dirname, "users");


if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder);
}

app.get("/", (req, res) => {
    res.send("Server Started")
})


app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const userFile = path.join(userFolder, "UserInfo.txt");

    const userData = `
        Name: ${name}
        Email: ${email}
        Password: ${password}
        `;

    fs.writeFile(userFile, userData, (err) => {

        if (err) {
            return res.status(500).send("Unable to save user");
        }

        res.send("User registered successfully");
    });
});




app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const userFile = path.join(userFolder, "UserInfo.txt");

    fs.readFile(userFile, "utf8", (err, data) => {

        if (err) {
            return res.send("User file not found");
        }

        console.log(data);

        if (
            data.includes(`Email: ${email}`) &&
            data.includes(`Password: ${password}`)
        ) {
            return res.send("Login successful");
        }

        res.send("Invalid email or password");
    });

})


app.listen(PORT, () => {
    console.log("server is running")
})
