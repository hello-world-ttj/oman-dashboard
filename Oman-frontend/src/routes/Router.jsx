import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import MemberPage from "../pages/Members/MemberPage";
import EventsListPage from "../pages/Events/EventsListPage";
import NewsPage from "../pages/News/NewsPage";
import AddMemberPage from "../pages/Members/AddMemberPage";
import EditEvent from "../pages/Events/EditEvent";
import LoginPage from "../pages/LoginPage";
import EditNews from "../pages/News/EditNews";
import { PrivateRoute } from "./PrivateRouter";
import ReportPage from "../pages/Report/ReportPage";
import AddReportPage from "../pages/Report/AddReportPage";
import CareerPage from "../pages/Careers/CareerPage";
import AddCareerPage from "../pages/Careers/AddCareerPage";
import ProductPage from "../pages/product/ProductPage";
import AddProductPage from "../pages/product/AddProductPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
 
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Layout>
          <DashboardPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/members",
    element: (
      <PrivateRoute>
        <Layout>
          <MemberPage />
        </Layout>
      </PrivateRoute>
    ),
  },

  {
    path: "/members/member",
    element: (
      <PrivateRoute>
        <Layout>
          <AddMemberPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <PrivateRoute>
        <Layout>
          <ProductPage />
        </Layout>
      </PrivateRoute>
    ),
  },

  {
    path: "/products/product",
    element: (
      <PrivateRoute>
        <Layout>
          <AddProductPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <PrivateRoute>
        <Layout>
          <ReportPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/reports/report",
    element: (
      <PrivateRoute>
        <Layout>
          <AddReportPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/careers",
    element: (
      <PrivateRoute>
        <Layout>
          <CareerPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/careers/career",
    element: (
      <PrivateRoute>
        <Layout>
          <AddCareerPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/list",
    element: (
      <PrivateRoute>
        <Layout>
          <EventsListPage />
        </Layout>
      </PrivateRoute>
    ),
  },

  {
    path: "/events/edit/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <EditEvent />
        </Layout>
      </PrivateRoute>
    ),
  },

  {
    path: "/news",
    element: (
      <PrivateRoute>
        <Layout>
          <NewsPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/news/edit/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <EditNews />
        </Layout>
      </PrivateRoute>
    ),
  },
]);

export default router;
