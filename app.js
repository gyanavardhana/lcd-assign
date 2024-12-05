const express = require("express");
const app = express();
const fs = require("fs");

let data;
try {
    data = JSON.parse(fs.readFileSync("inventory.json", "utf-8"));
} catch (err) {
    console.error("Error reading inventory file:", err.message);
    data = { products: [] };
}

app.get("/api/getAllProducts", (req, res) => {
    if (data.products.length === 0) {
        res.status(404).json({ error: "No products found in inventory." });
    } else {
        res.json(data.products);
    }
});

app.get("/api/getExpiryDate/:productname", (req, res) => {
    const pname = req.params.productname;

    if (!pname) {
        return res.status(400).json({ error: "Product name is required." });
    }
    const product = data.products.find((p) => p.name.toLowerCase() === pname.toLowerCase());

    if (!product) {
        return res.status(404).json({ error: `Product '${pname}' not found.` });
    }
    if (!product.expirydate) {
        return res.status(400).json({ error: `Expiry date for product '${pname}' is not available.` });
    }

    res.json({ product: pname, expiryDate: product.expirydate });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
