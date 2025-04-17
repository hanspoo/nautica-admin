import { AuthComponent } from './auth-component';
import logo from '../images/logo.png';

export function Navbar({ loginSection = true }: { loginSection?: boolean }) {
  return (
    <div className="navbar mt-1 flex justify-between w-full 400 mb-6">
      <div>
        <a
          href={loginSection ? '/admin' : '/'}
          className="btn btn-ghost text-xl"
        >
          <img alt="Logo" src={logo} className="h-8" />
          <span className="text-2xl font-light">
            {import.meta.env.VITE_APP_NAME}
          </span>
        </a>
      </div>
      {loginSection && (
        <div>
          <AuthComponent />
        </div>
      )}
    </div>
  );
}
