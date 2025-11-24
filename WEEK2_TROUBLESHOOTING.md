# 🔧 Week 2 Troubleshooting Guide

## 🔴 Issue: HuggingFace API Connection Failed

**Symptoms:**
- `test-ai.ts` fails with "Failed to classify species"
- Output contains HTML code (`<svg>`, `<!DOCTYPE html>`) instead of JSON

**Possible Causes:**
1. **Email Not Verified:** You MUST verify your email address on HuggingFace for the API key to work.
2. **Invalid Token:** The token might be copied incorrectly.
3. **Permissions:** The token might not have "Read" permissions.
4. **Model Loading:** The model might be "cold" (loading), but usually this returns a 503 JSON, not HTML.

**✅ Solutions:**

### 1. Verify Email
Check your email inbox for a verification link from HuggingFace. **This is the most common cause!**

### 2. Check Token Permissions
1. Go to https://huggingface.co/settings/tokens
2. Make sure your token has "Read" role (or "Fine-grained" with inference permissions).

### 3. Test with cURL (Terminal)
Run this command in your terminal (replace `YOUR_TOKEN`):

```bash
curl https://api-inference.huggingface.co/models/microsoft/resnet-50 \
  -X POST \
  -d "{\"inputs\": \"https://images.unsplash.com/photo-1511497584788-876760111969?w=600\"}" \
  -H "Authorization: Bearer hf_YOUR_TOKEN_HERE"
```

If this works, the issue is in our code. If this fails, the issue is with the account/token.

---

## 🔴 Issue: Redis Not Connecting

**Symptoms:**
- "Connection refused"
- "Redis server not found"

**Solutions:**
1. **Start Redis:**
   - Windows: Run `redis-server`
   - WSL: `sudo service redis-server start`
   - Docker: `docker start redis`

2. **Check Port:**
   - Default is 6379.
   - Check `.env.local` matches.

---

## ⏭️ Next Steps

We will proceed with setting up the **Redis Queue** and **Worker** infrastructure. You can fix the API key issue in parallel!
