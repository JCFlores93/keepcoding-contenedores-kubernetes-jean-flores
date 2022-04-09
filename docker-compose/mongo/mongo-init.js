db.createUser({
    user: "jean",
    pwd: "123456",
    roles: [
        {
            role: "readWrite",
            db: "petsdb"
        }
    ]
})