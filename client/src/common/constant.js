import { Home, Box, BookOpen, Clipboard, MessageSquare, User } from 'react-feather';

export let BREADBRUMBS = {
  "about-us": { label: "About Us", to: "/about-us" },
  "cart": { label: "Cart", to: "/cart" },
  "change-password": { label: "Change password", to: "/change-password" },
  "contact-us": { label: "Contact Us", to: "/contact-us" },
  "edit": { label: "Edit profile", to: "/edit" },
  "search": { label: "Search", to: "/search" },
  "signin": { label: "Sign in", to: "/signin" },
  "signup": { label: "Sign up", to: "/signup" },
  "orders": { label: "My order", to: "/orders" },
  "forgot-password": { label: "Forgot password", to: "/forgot-password" },
  "checkout": { label: "Checkout", to: "/checkout" },
  "collection": { label: "Collection", to: "/collection" },
  "shop": { label: "Shop", to: "/shop" },
  "dashboard": { label: "Dashboard", to: "/dashboard" },
  "privacy-policy": { label: "Privacy policy", to: "/privacy-policy" },
  "wishlist": { label: "Wish List", to: "/wishlist" },
};

export const SORTING_BY_PRODUCTS = {
  sold: "sold" ,
  createdAt: "createdAt",
};

export const SORTING_OPTION = {
  "": { order: "asc", sortBy: "_id" },
  "HighToLow": { order: "desc", sortBy: "discount_price" },
  "LowToHigh": { order: "asc", sortBy: "discount_price" },
  "Newest": { order: "desc", sortBy: "_id" },
  "AscOrder": { order: "asc", sortBy: "name" },
  "DescOrder": { order: "desc", sortBy: "name" },
}

export const MENUITEMS = [
  {
      path: '/admin/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
  },
  // {
  //   title: 'Category', icon: Clipboard , type: 'sub', active: false, children: [
  //       { path: '/admin/categories/list', title: 'List Category', type: 'link' },
  //       { path: '/admin/categories/create', title: 'Create Category', type: 'link' },
  //   ]
  // },
  {
    title: 'Category', path: '/admin/categories', icon: Clipboard, type: 'link', active: false
  },
  {
    title: 'Product', path: '/admin/products', icon: Box, type: 'link', active: false
  },
  // {
  //   title: 'User', icon: User , type: 'sub', active: false, children: [
  //     { path: '/admin/users', title: 'List User', type: 'link' },
  //     { path: '/admin/users/create', title: 'Create User', type: 'link' },
  // ]
  // },
  {
    title: 'User', path: '/admin/users', icon: User, type: 'link', active: false
  },
  {
    title: 'Order', path: '/admin/orders', icon: BookOpen, type: 'link', active: false
  },
  {
    title: 'Feedback', path: '/admin/feedbacks', icon: MessageSquare, type: 'link', active: false
  }
];

export const ORDER_COLUMNS =  ["_id", "paymentResult", "status", "totalPrice", "createdAt", "updatedAt"];
export const PRODUCT_COLUMNS =  ["_id", "images", "name", "category", "discount_price", "createdAt", "updatedAt"];
export const USER_COLUMNS =  ["_id", "name", "email", "role", "createdAt", "updatedAt"];

export const ORDER_STATUSES = {
  "Not processed": "badge badge--warning",
  "Shipped": "badge badge--primary",
  "Processing": "badge badge--secondary",
  "Delivered": "badge badge--success",
  "Cancelled": "badge badge--danger",
};

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const current = new Date();
export const checkDate = current.toLocaleDateString("en-US", options).toString();
export const deliveryDate = new Date(Date.now() + 5 * 86400000)
.toLocaleDateString("en-US", options)
.toString();
