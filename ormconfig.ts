export = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": 5432,
    "username": "postgres",
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": false,
    "logging": true,
    "ssl": {
        "rejectUnauthorized": false
    },
    "entities": ["src/entity/*.ts"]
}