const fs = require("fs")
class Supplier {
    constructor(name, contact) {
        this.name = name;
        this.contact = contact;
        this.products = new Set();
    }
    addp(productid) {
        this.products.add(productid);
    }
    display() {
        return {
            name: this.name,
            contact: this.contact,
            products: [...this.products],
        }
    }
}

class Product {
    constructor(id, name, price, expirydate, quantity, category, supplier) {
        if (!id || !name) {
            console.log("Product must have an id and a name");
            return;
        }
        this.id = id;
        this.name = name;
        this.price = price;
        this.expirydate = expirydate;
        this.quantity = quantity;
        this.category = category;
        this.supplier = supplier;
    }

    display() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            expirydate: this.expirydate,
            quantity: this.quantity,
            category: this.category,
            supplier: this.supplier,
        }
    }

}

class Category {
    constructor(name) {
        this.name = name;
        this.subcategories = new Set();
    }
    addsub(subcategory) {
        this.subcategories.add(subcategory);

    }
    display() {
        return {
            name: this.name,
            subcategories: [...this.subcategories],
        }
    }

}


class InventoryManagementSystem {
    constructor() {
        this.products = new Map();
        this.suppliers = new Map();
        this.categories = new Map();
    }

    addProduct(product) {
        if (!product || !product.name || !product.id) {
            console.log("Product must have a name and id or Invalid Product");
            return;
        }
        this.products.set(product.id, product);
        if (!this.suppliers.has(product.supplier)) {
            this.suppliers.set(product.supplier, new Supplier(product.supplier, "None"));
        }
        this.suppliers.get(product.supplier).addp(product.id);

        if (!this.categories.has(product.category)) {
            this.categories.set(product.category, new Category(product.category));
        }
        console.log(`Product "${product.name}" added succesfully!`);
        this.listProducts();
    }

    getProductInfo(productName) {
        const product = [...this.products.values()].find(
            (p) => p.name.toLowerCase() == productName.toLowerCase()
        );
        if (product) {
            console.log("Product Information: ", product.display());
            return;
        } else {
            console.log(`Product "${productName}" not found`);
            return null;
        }
    }

    listProducts() {
        console.log("Current Inventory: ");
        if (this.products.size === 0) {
            console.log("No products in the inventory");
            return;
        }
        this.products.forEach((product) => {
            console.log(`${product.name} (ID: ${product.id}) - Qty: ${product.quantity}`);
        });
    }


    exportToFile(filename) {
        const inventoryData = {
            products: [...this.products.values()].map((p) => p.display()),
            suppliers: [...this.suppliers.values()].map((s) => s.display()),
            categories: [...this.categories.values()].map((c) => c.display()),
        };
        fs.writeFileSync(filename, JSON.stringify(inventoryData, null, 4));
        console.log("Exported Inventory Data: ", JSON.stringify(inventoryData, null, 4));
    }
}


function main() {
    const ims = new InventoryManagementSystem();

    ims.addProduct(new Product("P1", "Milk", 45, "2024-06-30", 50, "Dairy", "Farmer"));
    ims.addProduct(new Product("P2", "Bread", 60, "2024-05-15", 30, "Bakery", "Baker"));
    ims.getProductInfo("Bad Milk")
    ims.exportToFile("Inventory.json");

}

main();
