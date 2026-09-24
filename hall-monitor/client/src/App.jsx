import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useAuth } from './context/useAuth';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Risks from './pages/Risks';
import Compliance from './pages/Compliance';
import Executive from './pages/Executive';
import SelfAssessment from './pages/SelfAssessment';
import Assessment from './pages/Assessment';
import AIGovernance from './pages/AIGovernance';
import AuditLog from './pages/AuditLog';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-slate-500">Loading...</div>
    </div>
  );
}

function getDefaultRoute() {
  return '/';
}

function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function RoleGuard({ roles, children }) {
  const { user } = useAuth();
  if (!roles.includes(user?.role)) {
    return <Navigate to={getDefaultRoute()} replace />;
  }
  return children;
}

function LoginRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to={getDefaultRoute()} replace />;

  return <Login />;
}

function DefaultRoute() {
  const { user } = useAuth();
  return <Navigate to={getDefaultRoute()} replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route element={<ProtectedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/risks" element={
              <RoleGuard roles={['platform_admin', 'district_it']}><Risks /></RoleGuard>
            } />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/self-assessment" element={
              <RoleGuard roles={['platform_admin', 'district_it']}><SelfAssessment /></RoleGuard>
            } />
            <Route path="/assessment" element={
              <RoleGuard roles={['platform_admin', 'district_it', 'superintendent']}><Assessment /></RoleGuard>
            } />
            <Route path="/ai-governance" element={<AIGovernance />} />
            <Route path="/executive" element={<Executive />} />
            <Route path="/audit-log" element={
              <RoleGuard roles={['platform_admin', 'district_it']}><AuditLog /></RoleGuard>
            } />
          </Route>
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
