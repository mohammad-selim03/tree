# 🧪 Week 1 Testing Guide

**Testing Date:** November 24, 2025  
**Server:** http://localhost:3000  
**Status:** Ready to test! ✅

---

## 🎯 What We're Testing:

1. ✅ Image upload component
2. ✅ Multi-image support
3. ✅ Image preview
4. ✅ Delete functionality
5. ✅ Form submission with images
6. ✅ Database persistence
7. ✅ Image display on product pages

---

## 📋 Testing Checklist:

### **Test 1: Upload Component** (5 minutes)

**Navigate to:**
```
http://localhost:3000/seller/listings/new
```

**Steps:**
1. [ ] Scroll down to "Images" card
2. [ ] See upload area with "Click to upload (0/6)"
3. [ ] Click the upload area
4. [ ] Select 2-3 images from your computer
5. [ ] Watch upload spinner appear
6. [ ] See success toast notification
7. [ ] Verify images appear in preview grid
8. [ ] Check "Primary" badge on first image
9. [ ] Hover over image to see delete button (X)
10. [ ] Click X to delete one image
11. [ ] Verify image removed and count updated

**Expected Results:**
- ✅ Upload works smoothly
- ✅ Multiple images supported
- ✅ Preview grid shows correctly
- ✅ Delete button works
- ✅ Counter updates (e.g., "2/6")

---

### **Test 2: Form Validation** (3 minutes)

**Steps:**
1. [ ] Try submitting form WITHOUT uploading images
2. [ ] See error: "Please upload at least one image"
3. [ ] Upload 1 image
4. [ ] Try uploading same image again (should work)
5. [ ] Try uploading 7th image (should block)
6. [ ] See error: "Maximum 6 images allowed"

**Expected Results:**
- ✅ Form blocks submission without images
- ✅ Maximum 6 images enforced
- ✅ Error messages display properly

---

### **Test 3: File Validation** (3 minutes)

**Steps:**
1. [ ] Try uploading a text file (.txt)
2. [ ] See error: "Only image files are allowed"
3. [ ] Try uploading a very large image (>4MB if you have one)
4. [ ] See error: "Some files exceed 4MB size limit"

**Expected Results:**
- ✅ Only images accepted
- ✅ File size limit enforced
- ✅ Clear error messages

---

### **Test 4: Complete Listing Creation** (5 minutes)

**Fill out the form:**
- **Title:** "Beautiful Japanese Maple"
- **Scientific Name:** "Acer palmatum"
- **Category:** Ornamental
- **Description:** "A stunning Japanese Maple with vibrant red leaves perfect for any garden. This tree thrives in partial shade and adds a touch of elegance to your landscape."
- **Height:** "4-5 feet"
- **Container Size:** "5 gallon"
- **Growth Rate:** Medium
- **Sun Exposure:** Partial Shade
- **Price:** 149.99
- **Original Price:** 199.99 (optional)
- **Stock:** 5

**Upload:**
- [ ] Upload 2-3 tree/plant images

**Submit:**
1. [ ] Click "Create Listing"
2. [ ] See loading spinner
3. [ ] See success toast
4. [ ] Redirect to listings page

**Expected Results:**
- ✅ All form fields work
- ✅ Images included in submission
- ✅ Success notification appears
- ✅ Redirects after creation

---

### **Test 5: Database Verification** (2 minutes)

**Check the data was saved:**

If you can access your database:
```sql
-- Check listing was created
SELECT * FROM "Listing" ORDER BY "createdAt" DESC LIMIT 1;

-- Check images were saved
SELECT * FROM "ListingImage" ORDER BY "createdAt" DESC LIMIT 10;
```

**Expected Results:**
- ✅ Listing record created
- ✅ 2-3 ListingImage records created
- ✅ Images linked to listing (same listingId)
- ✅ Image order is correct (0, 1, 2)

---

### **Test 6: Image Display** (3 minutes)

**Navigate to:**
```
http://localhost:3000/trees
```

**Steps:**
1. [ ] Find your newly created listing
2. [ ] Verify image is showing (not emoji 🌳)
3. [ ] Check image quality (should look good)
4. [ ] If you uploaded multiple images, see "+2 more" badge
5. [ ] Hover over card - image should zoom slightly
6. [ ] Click on listing to view details

**Expected Results:**
- ✅ Real images display on product cards
- ✅ Images load properly from UploadThing
- ✅ Image count badge shows correctly
- ✅ Hover effects work smoothly

---

### **Test 7: Different Scenarios** (5 minutes)

**Scenario A: Create listing with 1 image**
1. [ ] Upload only 1 image
2. [ ] Complete and submit form
3. [ ] Verify it works
4. [ ] No "+X more" badge shows

**Scenario B: Create listing with 6 images**
1. [ ] Upload maximum 6 images
2. [ ] Try uploading 7th (should block)
3. [ ] Submit form
4. [ ] Verify all 6 images saved
5. [ ] "+5 more" badge shows

**Scenario C: Update images before submit**
1. [ ] Upload 3 images
2. [ ] Delete 1 image
3. [ ] Upload 2 more images
4. [ ] Final count should be 4
5. [ ] Submit and verify

**Expected Results:**
- ✅ All scenarios work correctly
- ✅ State management is accurate
- ✅ Database reflects final state

---

### **Test 8: Edge Cases** (3 minutes)

**Test these edge cases:**

1. [ ] Upload same image twice (should work)
2. [ ] Upload, delete all, upload again (should work)
3. [ ] Fill form, forget images, see error (should block)
4. [ ] Multiple rapid uploads (should queue properly)
5. [ ] Delete image during upload (should handle gracefully)

**Expected Results:**
- ✅ No crashes
- ✅ State stays consistent
- ✅ Error handling works

---

### **Test 9: Visual Polish** (2 minutes)

**Check the UI quality:**

1. [ ] Upload area looks professional
2. [ ] Preview grid is aligned properly
3. [ ] Images are properly sized
4. [ ] Delete button appears on hover
5. [ ] Loading spinner is centered
6. [ ] Toast notifications are readable
7. [ ] Colors match design system
8. [ ] Responsive on different screen sizes

**Expected Results:**
- ✅ Professional appearance
- ✅ Consistent styling
- ✅ Smooth animations

---

### **Test 10: Performance** (2 minutes)

**Test performance:**

1. [ ] Upload 6 large images (1-2MB each)
2. [ ] Time how long uploads take
3. [ ] Check if UI remains responsive
4. [ ] Navigate away and back
5. [ ] Verify images load quickly on product page

**Expected Results:**
- ✅ Uploads complete in reasonable time (<10s for 6 images)
- ✅ UI doesn't freeze
- ✅ Images load fast from CDN

---

## ✅ Testing Completion Checklist:

### **Critical Tests (Must Pass):**
- [ ] Can upload images
- [ ] Images save to database
- [ ] Images display on pages
- [ ] Can delete uploaded images
- [ ] Form validation works
- [ ] File validation works

### **Important Tests (Should Pass):**
- [ ] Multiple images supported
- [ ] Image order preserved
- [ ] Error messages clear
- [ ] Loading states work
- [ ] Redirects after submit

### **Nice-to-Have (Good to Pass):**
- [ ] Hover effects smooth
- [ ] Responsive design
- [ ] Performance acceptable
- [ ] Edge cases handled

---

## 🐛 Bug Reporting:

**If you find any issues:**

```markdown
### Bug Report

**Issue:** [Describe what went wrong]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected:** [What should happen]
**Actual:** [What actually happened]

**Screenshots:** [If applicable]
**Browser:** [Chrome/Firefox/Safari/Edge]
**Console Errors:** [Any errors in browser console]
```

---

## 📊 Test Results Summary:

After testing, fill this out:

```
Total Tests: 10
Passed: ___
Failed: ___
Skipped: ___

Overall Status: [PASS / NEEDS FIXES / FAIL]

Notes:
- [Any observations]
- [Performance notes]
- [Improvement ideas]
```

---

## 🎯 Success Criteria:

**Week 1 is successful if:**
- ✅ All critical tests pass
- ✅ At least 8/10 important tests pass
- ✅ No major bugs found
- ✅ Images work end-to-end

**If any critical test fails:**
- Note the issue
- We'll fix it before Week 2
- Testing ensures quality!

---

## 💡 Testing Tips:

1. **Take Screenshots:** Document your testing
2. **Use Different Images:** Try various sizes/formats
3. **Clear Browser Cache:** If images don't show
4. **Check Console:** Look for any JavaScript errors
5. **Test on Mobile:** Responsive design check
6. **Ask Questions:** If something seems wrong

---

## ⏭️ After Testing:

**If everything passes:**
→ Proceed to Week 2: Species Verification AI! 🚀

**If issues found:**
→ Report them, we'll fix together! 🔧

---

**Ready to test? Let's go!** 🧪✨

**Testing should take:** ~30-40 minutes  
**Result:** Confidence in your feature! 💪

---

**Start with Test 1 and work through the list!**

Good luck! 🌳🚀
