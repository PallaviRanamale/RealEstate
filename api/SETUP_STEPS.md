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
   DATABASE_URL="mongodb+srv://pallaviranamale_db_user:w50av11D0hujHBDn@realestateuser.n5bt5qd.mongodb.net/realestate?retryWrites=true&w=majority"
   JWT_SECRET_KEY=4af70767da935941e905a1dd4a055f76593243f1298b52b92ecf4594fee7303e5c7ae4ade0d5992ebebcc22d2d7bcc64e56f21c64658a4c9d5ee890f58a393a6
   NODE_ENV=development
   ```

3. **Verify Prisma connection:**
   ```bash
   cd api
   npx prisma db pull
   ```
   This should show your database connection is working.






