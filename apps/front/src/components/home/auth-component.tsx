// src/App.jsx

import { useAuth } from 'react-oidc-context';
import { UserDropdown } from './user-dropdown';

export function AuthComponent() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>;
    case 'signoutRedirect':
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div className="text-slate-400 text-xs mr-2">Loading...</div>;
  }

  if (auth.error) {
    return (
      <div className="flex flex-col items-center">
        <div className="mb-4 text-xs">Oops... {auth.error.message}</div>
        <a href="/" className="btn btn-sm btn-primary ">
          Continuar
        </a>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return <UserDropdown />;
  }

  return (
    <button
      className="btn btn-primary btn-sm mr-2"
      onClick={() => void auth.signinRedirect()}
    >
      Log in
    </button>
  );
}
