import { useAuth } from 'react-oidc-context';

export function PleaseLogin() {
  const auth = useAuth();
  return (
    <div>
      <div className="hero min-h-[640px]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">Login to the system</h1>
            <p className="py-6">
              Click to start a new sessión in{' '}
              {import.meta.env.VITE_APP_NAME || 'AppName'}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => void auth.signinRedirect()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
