# E-Commerce API Documentation

## Table of Contents
1. [Rider API](#rider-api)
2. [Order Process](#order-process)

## Rider API

### Base URL
```
/v1/api/rider
```

### Authentication
All rider endpoints (except registration and login) require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Endpoints

#### 1. Register Rider
```http
POST /register
```

**Request Body:**
```json
{
    "name": "John Doe",
    "phoneNumber": "+1234567890",
    "address": "123 Main St, City",
    "email": "john@example.com",
    "password": "securepassword123"
}
```

**Response:**
```json
{
    "message": "Rider registered successfully",
    "rider": {
        "id": "rider_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "+1234567890"
    },
    "token": "jwt_token"
}
```

#### 2. Rider Login
```http
POST /login
```

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "securepassword123"
}
```

**Response:**
```json
{
    "message": "Login successful",
    "rider": {
        "id": "rider_id",
        "name": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "+1234567890"
    },
    "token": "jwt_token"
}
```

#### 3. Get Available Orders
```http
GET /available-orders
```

**Response:**
```json
{
    "message": "Available orders retrieved successfully",
    "orders": [
        {
            "orderId": "order_id",
            "items": [...],
            "shippingAddress": {...},
            "status": "processing"
        }
    ]
}
```

#### 4. Accept Order
```http
POST /orders/:orderId/accept
```

**Response:**
```json
{
    "message": "Order accepted successfully",
    "order": {
        "orderId": "order_id",
        "status": "assigned",
        "rider": {
            "riderId": "rider_id",
            "assignedAt": "timestamp",
            "acceptedAt": "timestamp"
        }
    }
}
```

#### 5. Confirm Delivery
```http
POST /orders/:orderId/confirm-delivery
```

**Response:**
```json
{
    "message": "Delivery confirmation updated successfully",
    "order": {
        "orderId": "order_id",
        "status": "delivered",
        "deliveryConfirmation": {
            "riderConfirmed": true,
            "userConfirmed": true,
            "confirmedAt": "timestamp"
        }
    }
}
```

#### 6. Get Current Order
```http
GET /current-order
```

**Response:**
```json
{
    "message": "Current order retrieved successfully",
    "order": {
        "orderId": "order_id",
        "items": [...],
        "shippingAddress": {...},
        "status": "in_transit"
    }
}
```

## Order Process

### Order States
1. **pending**: Initial state when order is created
2. **processing**: Order is being prepared
3. **assigned**: Order has been assigned to a rider
4. **in_transit**: Rider has picked up the order
5. **delivered**: Order has been delivered and confirmed by both parties
6. **cancelled**: Order has been cancelled

### Order Flow

1. **Order Creation**
   - User places an order
   - System creates order with status: "pending"
   - Order moves to "processing" when payment is confirmed

2. **Rider Assignment**
   - System notifies available riders
   - Rider accepts the order
   - Order status changes to "assigned"
   - Rider's availability is updated

3. **Delivery Process**
   - Rider picks up the order
   - Order status changes to "in_transit"
   - Rider delivers the order
   - Both rider and user must confirm delivery

4. **Delivery Confirmation**
   - Rider confirms delivery through `/orders/:orderId/confirm-delivery`
   - User confirms delivery through their interface
   - When both parties confirm:
     - Order status changes to "delivered"
     - Rider's delivery count is incremented
     - Rider becomes available for new orders

### Order Model Structure
```json
{
    "orderId": "string",
    "userId": "ObjectId",
    "items": [
        {
            "productId": "ObjectId",
            "quantity": "number",
            "price": "number"
        }
    ],
    "totalAmount": "number",
    "shippingAddress": {
        "street": "string",
        "city": "string",
        "state": "string",
        "country": "string",
        "zipCode": "string"
    },
    "status": "string",
    "rider": {
        "riderId": "ObjectId",
        "assignedAt": "Date",
        "acceptedAt": "Date"
    },
    "deliveryConfirmation": {
        "riderConfirmed": "boolean",
        "userConfirmed": "boolean",
        "confirmedAt": "Date"
    },
    "paymentStatus": "string",
    "createdAt": "Date",
    "updatedAt": "Date"
}
```

### Error Responses

All endpoints may return the following error responses:

```json
{
    "message": "Error message",
    "error": "Detailed error message"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error 