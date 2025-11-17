# MongoDB Atlas Quick Setup Guide

## Step-by-Step Instructions

### 1. Create MongoDB Atlas Account (2 minutes)

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with Google, GitHub, or Email (it's free!)
3. Verify your email if needed

### 2. Create a Free Cluster (3 minutes)

1. After logging in, click **"Build a Database"**
2. Choose the **FREE** option (M0 Sandbox)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you (e.g., N. Virginia, Europe, etc.)
5. Give your cluster a name (or leave default: "Cluster0")
6. Click **"Create"**
7. Wait 1-3 minutes for cluster creation

### 3. Create Database User (2 minutes)

1. You'll see a "Get started with Atlas" popup
2. Choose **"Username and Password"** for authentication
3. Create a username (e.g., `realestateuser`)
4. Create a password (click "Autogenerate Secure Password" or create your own)
   - ⚠️ **IMPORTANT**: Save this password! Copy it somewhere safe!
5. Click **"Create Database User"**

### 4. Set Network Access (1 minute)

1. On the same popup or go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development - allows `0.0.0.0/0`)
4. Click **"Confirm"**

### 5. Get Your Connection String (1 minute)

1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"** or **"Drivers"**
3. Select **"Node.js"** as the driver and version **"5.5 or later"**
4. Copy the connection string - it looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Update Your Connection String

Replace these parts in the connection string:
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add `/realestate?` before the `?retryWrites` to specify database name

**Final connection string should look like:**
```
mongodb+srv://realestateuser:yourpassword@cluster0.xxxxx.mongodb.net/realestate?retryWrites=true&w=majority
```

### 7. Update Your .env File

Update `api/.env` with your MongoDB Atlas connection string:

```env
DATABASE_URL=mongodb+srv://realestateuser:yourpassword@cluster0.xxxxx.mongodb.net/realestate?retryWrites=true&w=majority
JWT_SECRET_KEY=4af70767da935941e905a1dd4a055f76593243f1298b52b92ecf4594fee7303e5c7ae4ade0d5992ebebcc22d2d7bcc64e56f21c64658a4c9d5ee890f58a393a6
NODE_ENV=development
```

### 8. Generate Prisma Client and Push Schema

Run these commands in your `api` folder:

```bash
cd api
npx prisma generate
npx prisma db push
```

### 9. Restart Your API Server

Stop and restart your API server. Your registration should now work!

---

## Troubleshooting

### "Authentication failed"
- Check your username and password in the connection string
- Make sure you replaced `<username>` and `<password>` correctly
- Verify your database user exists in Atlas

### "IP not whitelisted"
- Go to "Network Access" in Atlas
- Make sure you've added `0.0.0.0/0` or your current IP address

### "Timeout" or "Connection refused"
- Make sure your cluster is fully deployed (check Atlas dashboard)
- Verify your connection string format is correct
- Check if `/realestate` database name is included before the `?`

---

## Why MongoDB Atlas?

✅ **No local setup** - Works immediately  
✅ **Free forever** - M0 tier for development  
✅ **Replica set ready** - Already configured  
✅ **Backed up automatically** - Your data is safe  
✅ **Access from anywhere** - Great for teams  
✅ **Easy scaling** - Upgrade when you need  

---

## Next Steps

Once set up, you can:
- Register new users ✅
- Login users ✅
- Create posts ✅
- Use all app features ✅

Your database will be accessible at: **https://cloud.mongodb.com**






