# 🎯 Phase 2 Implementation Checklist

## 📦 Step 1: Seller Dashboard Infrastructure

### 1.1 Dashboard Layout (`app/(dashboard)/seller/layout.tsx`)
- [x] Create dashboard shell component
- [x] Implement responsive Sidebar navigation
- [x] Create Dashboard Header (User menu, notifications)
- [x] Define dashboard routes and navigation structure

### 1.2 Dashboard Components
- [x] `Sidebar` component with active states
- [x] `DashboardHeader` component
- [x] `StatCard` component for metrics
- [x] `RecentOrders` table component
- [x] `RevenueChart` component (using Recharts)

### 1.3 Dashboard Overview (`app/(dashboard)/seller/dashboard/page.tsx`)
- [x] Fetch and display key metrics (Total Sales, Orders, Revenue)
- [x] Display sales chart visualization
- [x] Show recent activity feed

---

## 📝 Step 2: Listing Management (Seller)

### 2.1 Listings Page (`app/(dashboard)/seller/listings/page.tsx`)
- [x] Data table for listings (Image, Title, Price, Stock, Status)
- [x] Search and Filter functionality
- [x] Status toggle (Active/Draft/Archived)
- [x] Delete/Archive actions
- [x] "Create New" button

### 2.2 Create/Edit Listing Flow (`app/(dashboard)/seller/listings/[action]/page.tsx`)
- [x] Multi-step form or long scrolling form
- [x] **Basic Info**: Title, Scientific Name, Description, Category
- [x] **Pricing & Inventory**: Price, Original Price, Stock
- [x] **Details**: Height, Container Size, Growth Rate, Sun Exposure
- [x] **Images**: Image upload (mock for now) with preview
- [x] **Validation**: Zod schema for product data

---

## 🌲 Step 3: Public Product Catalog

### 3.1 Main Catalog Page (`app/(marketing)/trees/page.tsx`)
- [x] Grid layout of products
- [x] Sidebar filters (Category, Price Range, Height, Care Level)
- [x] Sorting options (Newest, Price: Low-High, etc.)
- [x] Pagination or Infinite Scroll
- [x] Empty state handling

### 3.2 Search Functionality
- [x] Global search bar implementation
- [x] Debounced search input
- [x] Search results page

---

## 👤 Step 4: User Profile & Orders

### 4.1 Profile Settings (`app/(dashboard)/profile/page.tsx`)
- [x] Edit profile form (Name, Email, Avatar)
- [x] Change password
- [x] Address book management

### 4.2 Order History (`app/(dashboard)/orders/page.tsx`)
- [x] List of past orders
- [x] Order status badges (Processing, Shipped, Delivered)
- [x] Order details view

---

## 🛠️ Technical Tasks
- [x] Install `recharts` for dashboard charts
- [x] Create `useSeller` hooks for dashboard data
- [x] Create `useProducts` hooks for catalog filtering
- [x] Implement `uploadthing` or similar for image uploads (optional/mock)
