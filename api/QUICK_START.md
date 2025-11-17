# Quick Start - Choose Your Setup Method

## 🚀 Recommended: MongoDB Atlas (Easiest - 10 minutes)

**Best for:**
- Quick setup
- No local MongoDB installation needed
- Production-ready from day one
- Free tier available

**Follow this guide:** `MONGODB_ATLAS_QUICK_SETUP.md`

---

## 🏠 Alternative: Local MongoDB Replica Set

**Best for:**
- Working offline
- Privacy concerns (data stays local)
- Learning MongoDB internals

**Requirements:**
- MongoDB installed locally
- Windows PowerShell (as Administrator)

**Steps:**

1. **Run the setup script** (as Administrator):
   ```powershell
   cd "D:\Real Estate Project"
   .\start-mongodb-replica.ps1
   ```

2. **Update your `.env` file** in `api` folder:
   ```env
   DATABASE_URL=mongodb://localhost:27017/realestate?replicaSet=rs0
   JWT_SECRET_KEY=4af70767da935941e905a1dd4a055f76593243f1298b52b92ecf4594fee7303e5c7ae4ade0d5992ebebcc22d2d7bcc64e56f21c64658a4c9d5ee890f58a393a6
   NODE_ENV=development
   ```

3. **Generate Prisma Client and push schema:**
   ```bash
   cd api
   npx prisma generate
   npx prisma db push
   ```

4. **Restart your API server**

---

## ⚡ Which Should You Choose?

### Choose **MongoDB Atlas** if:
- ✅ You want the easiest setup
- ✅ You don't have MongoDB installed locally
- ✅ You want your database accessible from anywhere
- ✅ You're working on a team project
- ✅ You want automatic backups

### Choose **Local MongoDB** if:
- ✅ You need to work offline
- ✅ You have privacy/security concerns with cloud
- ✅ You already have MongoDB installed
- ✅ You're learning MongoDB configuration

---

## 🎯 My Recommendation

**Use MongoDB Atlas** - It's the modern way to develop with MongoDB. The free tier is perfect for development, and you'll avoid all the local configuration headaches. You can always switch to local MongoDB later if needed.

**Total setup time: ~10 minutes**






