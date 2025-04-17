import { useAuth } from 'react-oidc-context';

export function DashboardContainer() {
  const auth = useAuth();

  return <div>Welcome {auth.user?.profile.name} !!</div>;
}
