import { useAuth } from 'react-oidc-context';
import { Routes, Route } from 'react-router-dom';
import { PleaseLogin } from '../PleaseLogin';
import { DashboardContainer } from './DashboardContainer';

export function AuthenticatedContent() {
  const auth = useAuth();

  if (!auth.isAuthenticated) return <PleaseLogin />;

  return (
    <div className="p-2 px-3 mt-6">
      <Routes>
        <Route path="/*" element={<DashboardContainer />}></Route>
        <Route
          path="/config/the-moon"
          element={<div className="text-xl font-bold">The Moon</div>}
        ></Route>
        <Route
          path="/config/humans"
          element={<div className="text-xl font-bold">Humans</div>}
        ></Route>
        <Route
          path="/config/solar-system"
          element={<div className="text-xl font-bold">The Solar System</div>}
        ></Route>
      </Routes>
    </div>
  );
}
