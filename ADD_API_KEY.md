# 🔑 Add Your HuggingFace API Key

**File:** `apps/web/.env.local` ✅ (Created!)

---

## 📝 **Instructions:**

### **Step 1: Open the file**

In VS Code or your editor:
```
apps/web/.env.local
```

### **Step 2: Add these lines**

Copy and paste this, then **replace `YOUR_API_KEY_HERE` with your actual HuggingFace token:**

```env
# HuggingFace AI (Species Verification)
HUGGING_FACE_API_KEY=YOUR_API_KEY_HERE

# Redis (Background Jobs)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# UploadThing (if you have these from Week 1)
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### **Step 3: Save the file**

Press `Ctrl+S` or `Cmd+S`

---

## ✅ **Example:**

Your `.env.local` should look like this:

```env
# HuggingFace AI (Species Verification)
HUGGING_FACE_API_KEY=hf_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890

# Redis (Background Jobs)  
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**⚠️ IMPORTANT:**
- Replace `hf_AbCdEf...` with YOUR actual token
- Keep this file secret (it's in .gitignore)
- Never commit API keys to git

---

## 🔒 **Security:**

✅ `.env.local` is automatically ignored by git  
✅ Your API key is safe  
✅ Won't be committed to repository

---

## ⏭️ **After Adding Your Key:**

Let me know when you've:
1. ✅ Opened `apps/web/.env.local`
2. ✅ Pasted the code above
3. ✅ Replaced `YOUR_API_KEY_HERE` with your real token
4. ✅ Saved the file

**Then I'll:**
1. Install Redis
2. Install Node dependencies
3. Test the HuggingFace API
4. Start building AI features!

---

**📍 You are here:** Adding API key  
**⏭️ Next:** Redis + Dependencies + AI! 🚀
