# Inventory Management System API Documentation 

## 1. Products API Endpoints

### 1.1 Get Products List
- **Endpoint**: `GET /api/getAllProducts`
- **Description**: Retrieve all products in the inventory

#### Request
```http
GET /api/getAllProducts
Content-Type: application/json
```

#### Response
```json
[
    {
        "id": "P1",
        "name": "Milk",
        "price": 45,
        "expirydate": "2024-06-30",
        "quantity": 50,
        "category": "Dairy",
        "supplier": "Farmer"
    },
    {
        "id": "P2",
        "name": "Bread",
        "price": 60,
        "expirydate": "2024-05-15",
        "quantity": 30,
        "category": "Bakery",
        "supplier": "Baker"
    }
]
```

### 1.2 Get Product Expiry Information
- **Endpoint**: `GET /api/getExpiryDate/:productname`
- **Description**: Retrieve expiry information for a specific product

#### Request
```http
GET /api/getExpiryDate/Milk
Content-Type: application/json
```

#### Response
```json
{
    "product": "Milk",
    "expiryDate": "2024-06-30"
}
```



