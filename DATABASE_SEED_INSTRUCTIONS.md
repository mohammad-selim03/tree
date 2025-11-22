# 🌱 Database Seed Instructions

## Quick Start - Run the Seed

### Option 1: Using npx (Recommended)
```bash
cd packages/database
npx tsx prisma/seed.ts
```

### Option 2: Using npm script
```bash
cd packages/database
npm run db:seed
```

### Option 3: Using Prisma directly
```bash
cd packages/database
npx prisma db seed
```

---

## What Gets Created

The seed script will create:

### 1. **Seller User** 👤
- Email: `seller@treeverse.com`
- Role: SELLER
- Name: TreeVerse Demo Seller

### 2. **Seller Profile** 🏪
- Business: TreeVerse Nursery
- Verified: ✅ Yes
- Rating: 4.8 ⭐

### 3. **Species** 🌿
1. **Acer palmatum** (Japanese Maple)
2. **Picea pungens** (Blue Spruce)
3. **Prunus serrulata** (Cherry Blossom)
4. **Quercus rubra** (Red Oak)

### 4. **Listings** 🌳
1. **Japanese Maple - Red Emperor** 🍁
   - Price: $149.99
   - Category: Ornamental
   - Inventory: 12 units

2. **Blue Spruce - Premium Grade** 🌲
   - Price: $89.99
   - Category: Evergreen
   - Inventory: 8 units

3. **Cherry Blossom - Yoshino** 🌸
   - Price: $179.99
   - Category: Ornamental
   - Inventory: 6 units

4. **Red Oak - Shade Tree Giant** 🌳
   - Price: $199.99
   - Category: Shade
   - Inventory: 5 units

---

## Expected Output

When you run the seed, you should see:

```
🌱 Starting seed...
Creating seller user...
✅ Seller user created: seller@treeverse.com
Creating seller profile...
✅ Seller profile created: TreeVerse Nursery
Creating species...
✅ Species created
Creating listings...
✅ Created listing: Japanese Maple - Red Emperor
✅ Created listing: Blue Spruce - Premium Grade
✅ Created listing: Cherry Blossom - Yoshino
✅ Created listing: Red Oak - Shade Tree Giant
🎉 Seed completed successfully!

📊 Summary:
- 1 Seller user created
- 1 Seller profile created
- 4 Species created
- 4 Listings created
- 4 Images created

🚀 You can now view the trees at: http://localhost:3000/trees
```

---

## Verify the Seed Worked

### Check in Prisma Studio
```bash
cd packages/database
npm run db:studio
```

Then check:
- ✅ Users table (should have seller@treeverse.com)
- ✅ Sellers table (should have TreeVerse Nursery)
- ✅ Species table (should have 4 species)
- ✅ Listings table (should have 4 listings with status ACTIVE)
- ✅ ListingImages table (should have 4 images)

### Check on the Website
1. Navigate to: `http://localhost:3000/trees`
2. You should see 4 beautiful tree cards!

---

## Troubleshooting

### Error: "tsx not found"
**Solution:** Install tsx
```bash
npm install -g tsx
# OR
npx tsx prisma/seed.ts
```

### Error: "DATABASE_URL not found"
**Solution:** Make sure you have `.env` file in `packages/database/`
```bash
# packages/database/.env
DATABASE_URL="postgresql://user:password@localhost:5432/treeverse"
```

### Error: "Foreign key constraint failed"
**Solution:** The tables might already have data. You can either:
1. Clear the database first
2. Or the seed script will skip existing records (using `upsert`)

### Error: "Table does not exist"
**Solution:** Run migrations first
```bash
cd packages/database
npx prisma db push
```

---

## Re-running the Seed

The seed uses `upsert`, so you can safely run it multiple times:
- Existing seller user → Will be updated
- Existing species → Will be updated
- New listings → Will create duplicates (this is intentional for now)

If you want a fresh start:
```bash
# Reset the database (WARNING: Deletes all data)
cd packages/database
npx prisma migrate reset

# OR manually delete listings
DELETE FROM "ListingImage";
DELETE FROM "Listing";
```

---

## Next Steps

After seeding:
1. ✅ Visit `http://localhost:3000/trees` to see the products
2. ✅ Try the search and filters
3. ✅ Click on a product card
4. ✅ Test the beautiful UI!

---

**Created:** 2025-11-21
**Purpose:** Seed database with demo tree listings
**Status:** Ready to use ✅
