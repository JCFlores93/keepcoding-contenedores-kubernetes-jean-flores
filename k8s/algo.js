db.grantRolesToUser(
    "jean",
    [
        {
            role: "readWrite",
            db: "petsdb"
        }
    ] 
    )