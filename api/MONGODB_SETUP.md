# MongoDB Setup Guide

## Problem
Prisma requires MongoDB to run as a replica set for transactions. This guide provides two solutions.

---

## Solution 1: MongoDB Atlas (Recommended - Easiest)

MongoDB Atlas is a cloud database service that comes pre-configured as a replica set.

### Steps:

1. **Sign up for MongoDB Atlas** (Free tier available)
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select your preferred cloud provider and region
   - Give your cluster a name
   - Click "Create"

3. **Set up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Set up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" (or "Clusters")
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`
   
   ⚠️ **Note**: The connection string will have `<username>` and `<password>` placeholders that you need to replace with your actual credentials.

6. **Update Your .env File**
   - In `api/.env`, update `DATABASE_URL`:
   ```env
   DATABASE_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/realestate?retryWrites=true&w=majority
   JWT_SECRET_KEY=your_jwt_secret_key_here
   NODE_ENV=development
   ```
   - Replace `your_username`, `your_password`, and `your_cluster` with your actual MongoDB Atlas values
   - Add `/realestate` before the `?` to specify the database name
   - Generate a secure random string for `JWT_SECRET_KEY` (you can use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
   - ⚠️ **Never commit your `.env` file to version control**

7. **Generate Prisma Client**
   ```bash
   cd api
   npx prisma generate
   ```

8. **Push Schema to Database**
   ```bash
   npx prisma db push
   ```

9. **Restart your API server**

---

## Solution 2: Local MongoDB Replica Set

If you want to use MongoDB locally, you need to set it up as a replica set.

### Prerequisites:
- MongoDB installed locally
- MongoDB service running

### Steps:

1. **Stop your MongoDB service** (if running)

2. **Start MongoDB as a replica set**

   **On Windows (PowerShell as Administrator):**
   ```powershell
   # Stop MongoDB service
   net stop MongoDB

   # Create data directory for replica set
   mkdir C:\data\rs0 -Force

   # Start MongoDB with replica set configuration
   mongod --replSet rs0 --dbpath C:\data\rs0 --port 27017
   ```

   **On macOS/Linux:**
   ```bash
   # Stop MongoDB
   sudo systemctl stop mongod  # or: brew services stop mongodb-community

   # Create data directory
   mkdir -p /data/rs0

   # Start MongoDB with replica set
   mongod --replSet rs0 --dbpath /data/rs0 --port 27017
   ```

3. **Initialize the Replica Set**

   Open a NEW terminal window and run:
   ```bash
   mongosh
   ```

   Then in the MongoDB shell:
   ```javascript
   rs.initiate({
     _id: "rs0",
     members: [{ _id: 0, host: "localhost:27017" }]
   })
   ```

   You should see output like:
   ```json
   {
     "ok": 1,
     ...
   }
   ```

   Type `exit` to leave the MongoDB shell.

4. **Verify Replica Set Status** (optional)
   ```bash
   mongosh
   rs.status()
   exit
   ```

5. **Update Your .env File**
   ```env
   DATABASE_URL=mongodb://localhost:27017/realestate?replicaSet=rs0
   JWT_SECRET_KEY=your_jwt_secret_key_here
   NODE_ENV=development
   ```

6. **Generate Prisma Client**
   ```bash
   cd api
   npx prisma generate
   ```

7. **Push Schema to Database**
   ```bash
   npx prisma db push
   ```

8. **Restart your API server**

---

## Quick Start Script (Windows - Local MongoDB)

Create a file `start-mongodb-replica.ps1` in your project root:

```powershell
# Stop MongoDB if running
net stop MongoDB 2>$null

# Create data directory
New-Item -ItemType Directory -Force -Path "C:\data\rs0" | Out-Null

# Start MongoDB with replica set
Start-Process mongod -ArgumentList "--replSet rs0 --dbpath C:\data\rs0 --port 27017" -WindowStyle Minimized

Write-Host "Waiting for MongoDB to start..."
Start-Sleep -Seconds 5

# Initialize replica set
mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})"

Write-Host "MongoDB replica set started successfully!"
Write-Host "Connection string: mongodb://localhost:27017/realestate?replicaSet=rs0"
```

Run it:
```powershell
.\start-mongodb-replica.ps1
```

---

## Troubleshooting

### Error: "MongoServerError: not master and slaveOk=false"
- The replica set hasn't finished initializing
- Wait a few seconds and try again
- Check status with: `mongosh --eval "rs.status()"`

### Error: "Connection refused"
- MongoDB isn't running
- Make sure you started MongoDB with the replica set flag
- Check if port 27017 is already in use

### Error: "Replica set configuration is not yet initialized"
- Run the `rs.initiate()` command in mongosh
- Make sure you're connecting to the correct MongoDB instance

---

## Recommendation

**Use MongoDB Atlas for development** - it's:
- Free (M0 tier)
- Already configured as replica set
- No local setup required
- Accessible from anywhere
- Automatically backed up






