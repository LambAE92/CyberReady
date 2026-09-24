import { Navigate } from 'react-router-dom';

// The former CCRE/Cybersecurity Rubric evaluation and report workflow is
// retired from active use. Historical records remain in the legacy database
// tables; current cybersecurity assessment is performed in the CCRR/CEAM
// workspace exposed at /self-assessment.
export default function Assessment() {
  return <Navigate to="/self-assessment" replace />;
}
