import { useAuth } from '../context/useAuth';
import AdminDashboard from './AdminDashboard';
import UnifiedAssessmentTabs from '../components/UnifiedAssessmentTabs';

// The legacy self-assessment implementation is intentionally not routed. Its
// historical database snapshots remain preserved server-side; active work now
// uses the versioned CCRR/CEAM and CAGR/CAIRE workspaces.
export default function SelfAssessment() {
  const { user, activeDistrict } = useAuth();
  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;
  if (inAdminOverview) return <AdminDashboard defaultTab="selfAssessment" />;
  return <UnifiedAssessmentTabs />;
}
