import { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { useRouter } from "./hooks/useRouter";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import LibraryPage from "./pages/LibraryPage";
import BookDetailPage from "./pages/BookDetailPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/layout/Layout";
import Toast from "./components/ui/Toast";

function AppContent() {
  const { user } = useApp();
  const { route, navigate } = useRouter();
  const [authView, setAuthView] = useState("login");

  if (!user) {
    return authView === "login"
      ? <LoginPage onSwitch={() => setAuthView("register")} />
      : <RegisterPage onSwitch={() => setAuthView("login")} />;
  }

  let page;
  if (route === "/" || route === "/dashboard") page = <DashboardPage />;
  else if (route === "/library") page = <LibraryPage navigate={navigate} />;
  else if (route.startsWith("/book/")) page = <BookDetailPage id={route.replace("/book/", "")} navigate={navigate} />;
  else if (route === "/profile") page = <ProfilePage />;
  else page = <DashboardPage />;

  return (
    <Layout route={route} navigate={navigate}>
      {page}
    </Layout>
  );
}

function ToastLayer() {
  const { toasts } = useApp();
  return <Toast toasts={toasts} />;
}

function DarkModeSync() {
  const { darkMode } = useApp();
  useEffect(() => {
    document.body.className = darkMode ? "" : "light";
  }, [darkMode]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <DarkModeSync />
      <AppContent />
      <ToastLayer />
    </AppProvider>
  );
}
