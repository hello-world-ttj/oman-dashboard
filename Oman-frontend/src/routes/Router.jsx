import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import MemberPage from "../pages/Members/MemberPage";
import GroupPage from "../pages/Groups/GroupPage";
import EventsListPage from "../pages/Events/EventsListPage";
import NewsPage from "../pages/News/NewsPage";
import AddMemberPage from "../pages/Members/AddMemberPage";
import EditEvent from "../pages/Events/EditEvent";
import AddGroupPage from "../pages/Groups/AddGroupPage";
import MemberView from "../pages/Members/MemberView";
import LoginPage from "../pages/LoginPage";
import EditNews from "../pages/News/EditNews";
import QRPage from "../pages/QRPage";
import { PrivateRoute } from "./PrivateRouter";
import ReportPage from "../pages/Report/ReportPage";
import AddReportPage from "../pages/Report/AddReportPage";
import CareerPage from "../pages/Careers/CareerPage";
import AddCareerPage from "../pages/Careers/AddCareerPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/user/:id",
    element: <QRPage />,
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
    path: "/members/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <MemberView />
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
          <GroupPage />
        </Layout>
      </PrivateRoute>
    ),
  },

  {
    path: "/products/product",
    element: (
      <PrivateRoute>
        <Layout>
          <AddGroupPage />
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
