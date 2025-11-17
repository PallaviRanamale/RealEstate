# Setup Steps After MongoDB Atlas Connection

## ✅ Step 1: Stop Your API Server
Press `Ctrl+C` in the terminal where your API server is running.

## ✅ Step 2: Regenerate Prisma Client
Open a new terminal in your project folder and run:

```bash
cd api
npx prisma generate
```

## ✅ Step 3: Push Schema to Database
```bash
npx prisma db push
```

This will create all the tables/collections in your MongoDB Atlas database.

## ✅ Step 4: Restart Your API Server
```bash
npm run dev
```

Or if using VS Code, use the "API Server (Port 8800)" debug configuration.

---

## Your Connection String is Already Configured! ✅

Your `.env` file has been updated with:
- MongoDB Atlas connection string
- Database name: `realestate`
- Replica set parameters included

---

## Test Registration

After completing the steps above:
1. Go to http://localhost:5173/register
2. Try registering a new user
3. It should work now! ✅

---

## If You Still Get Errors

1. **Check MongoDB Atlas:**
   - Go to https://cloud.mongodb.com
   - Verify your cluster is running (should show green status)
   - Check Network Access - make sure `0.0.0.0/0` is allowed

2. **Check your .env file:**
   ```env
   DATABASE_URL="mongodb+srv://your_username:your_password@your_cluster.mongodb.net/realestate?retryWrites=true&w=majority"
   JWT_SECRET_KEY=your_jwt_secret_key_here
   NODE_ENV=development
   ```
   
   ⚠️ **Important**: Replace `your_username`, `your_password`, and `your_cluster` with your actual MongoDB Atlas credentials.

3. **Verify Prisma connection:**
   ```bash
   cd api
   npx prisma db pull
   ```
   This should show your database connection is working.






