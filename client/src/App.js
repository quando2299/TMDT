import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./assets/scss/style.scss";
import AdminHeader from "./components/Admin/AdminHeader/AdminHeader";
import AdminSidebar from "./components/Admin/AdminSidebar/AdminSidebar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AdminRoute from "./components/HOC/AdminRoute";
import AdminPublicRoute from "./components/HOC/AdminPublicRoute";
import PrivateRoute from "./components/HOC/PrivateRoute";
import PublicRoute from "./components/HOC/PublicRoute";
import AboutUs from "./pages/AboutUs/AboutUs";
import AdminCategory from "./pages/Admin/AdminCategory/AdminCategory";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminFeedback from "./pages/Admin/AdminFeedback/AdminFeedback";
import AdminFeedbackDetail from "./pages/Admin/AdminFeedbackDetail/AdminFeedbackDetail";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminOrder from "./pages/Admin/AdminOrder/AdminOrder";
import AdminOrderDetail from "./pages/Admin/AdminOrderDetail/AdminOrderDetail";
import AdminProduct from "./pages/Admin/AdminProduct/AdminProduct";
import AdminProductCreate from "./pages/Admin/AdminProduct/AdminProductCreate";
import AdminProductDetail from "./pages/Admin/AdminProduct/AdminProductDetail";
import AdminProductUpdate from "./pages/Admin/AdminProduct/AdminProductUpdate";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import ChangePassword from "./pages/Authenticate/ChangePassword";
import Edit from "./pages/Authenticate/Edit";
import Signin from "./pages/Authenticate/Signin";
import Signup from "./pages/Authenticate/Signup";
import Checkout from "./pages/Checkout/Checkout";
// import Collection from "./pages/Collection/Collection";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/HomePage/HomePage";
import NotFound from "./pages/NotFound/NotFound";
import Order from "./pages/Order/Order";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Search from "./pages/Search/Search";
import Shop from "./pages/Shop/Shop";
import ShoppingCart from "./pages/Shoppingcart/ShoppingCart";
import WishList from "./pages/WishList/WishList";
import { isUserLoggedIn } from "./redux/auth/auth.actions";

const App = ({ location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
  });

  return (
    <React.Fragment>
      {location.pathname.includes("/admin") ? (
        <Switch>
          <AdminPublicRoute
            exact
            path={`${process.env.PUBLIC_URL}/admin`}
            component={AdminLogin}
          />
          <div className="page-wrapper">
            <AdminHeader />
            <div className="page-body-wrapper">
              <AdminSidebar />
              <div className="page-body">
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/dashboard`}
                  component={AdminDashboard}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/categories`}
                  component={AdminCategory}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/feedbacks`}
                  component={AdminFeedback}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/feedback-detail/:contactId`}
                  component={AdminFeedbackDetail}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/orders`}
                  component={AdminOrder}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/order-detail/:orderId`}
                  component={AdminOrderDetail}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/products`}
                  component={AdminProduct}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/products/create`}
                  component={AdminProductCreate}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/product-detail/:slug`}
                  component={AdminProductDetail}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/product/:slug`}
                  component={AdminProductUpdate}
                />
                <AdminRoute
                  exact
                  path={`${process.env.PUBLIC_URL}/admin/users`}
                  component={AdminUser}
                />
              </div>
            </div>
          </div>
        </Switch>
      ) : (
        <>
          <Header />
          <Switch>
            <PublicRoute
              restricted={false}
              path="/"
              exact
              component={HomePage}
            />
            <PublicRoute
              restricted={true}
              path="/signin"
              exact
              component={Signin}
            />
            <PublicRoute
              restricted={true}
              path="/signup"
              exact
              component={Signup}
            />
            <PublicRoute
              restricted={false}
              path="/about-us"
              exact
              component={AboutUs}
            />
            <PublicRoute
              restricted={false}
              path="/contact-us"
              exact
              component={Contact}
            />
            {/* <PublicRoute
              restricted={false}
              path="/collection"
              exact
              component={Collection}
            /> */}
            <PublicRoute
              restricted={false}
              path="/order-detail/:orderId"
              exact
              component={OrderDetail}
            />
            <PublicRoute
              restricted={false}
              path="/order-success"
              exact
              component={OrderSuccess}
            />
            <PublicRoute
              restricted={false}
              path="/product/:slug"
              exact
              component={ProductDetail}
            />
            <PublicRoute
              restricted={false}
              path="/search"
              exact
              component={Search}
            />
            <PublicRoute
              restricted={false}
              path="/shop"
              exact
              component={Shop}
            />
            <PublicRoute
              restricted={false}
              path="/cart"
              exact
              component={ShoppingCart}
            />
            <PublicRoute
              restricted={false}
              path="/wishlist"
              exact
              component={WishList}
            />
            <PublicRoute
              restricted={false}
              path="/checkout"
              exact
              component={Checkout}
            />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/orders" exact component={Order} />
            <PrivateRoute path="/edit" exact component={Edit} />
            <PrivateRoute
              path="/change-password"
              exact
              component={ChangePassword}
            />
            <PublicRoute restricted={false} path="*" component={NotFound} />
          </Switch>
          <Footer />
        </>
      )}
    </React.Fragment>
  );
};

export default withRouter(App);
