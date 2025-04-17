import { useAuth } from 'react-oidc-context';
import { useRef } from 'react';

import { Bars4Icon, HomeIcon } from '@heroicons/react/24/solid';
import { UserDropdown } from './user-dropdown';

import { AuthenticatedContent } from './AuthenticatedContent';
import logo from '../images/logo.png';

import { Link } from 'react-router-dom';

export function Authenticated() {
  const auth = useAuth();
  const drawer = useRef<HTMLInputElement>(null);

  if (!auth) {
    return <p>Ha ocurrido un error 1541</p>;
  }

  const closeDrawer = () => {
    if (drawer && drawer.current) {
      drawer.current.click();
    }
  };

  return (
    <div className="drawer md:drawer-open p-0 min-h-dvh z-50">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        ref={drawer}
      />
      <div className="drawer-content ">
        <div className="flex flex-col">
          <div className="flex items-center justify-between  mt-3 ml-3">
            <div className="flex items-center md:opacity-0 ">
              <a href="/admin" className="text-lg">
                <img alt="Logo" src={logo} className="h-8 mr-2" />
              </a>
              <span className="text-2xl font-light">
                {import.meta.env.VITE_APP_NAME || 'AppName'}
              </span>
            </div>

            <div className="flex items-center mr-2">
              <UserDropdown />
              <label
                htmlFor="my-drawer-2"
                className="drawer-button md:hidden   flex items-end justify-end"
              >
                <Bars4Icon className="w-6 cursor-pointer ml-2" />
              </label>
            </div>
          </div>

          <AuthenticatedContent />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <ul className="menu bg-base-200 min-h-full w-64">
          <li>
            <div className="flex items-center mb-4">
              <a href="/admin" className="text-lg">
                <img alt="Logo" src={logo} className="h-8 mr-0" />
              </a>
              <span className="text-2xl font-light">
                {import.meta.env.VITE_APP_NAME || 'AppName'}
              </span>
            </div>
          </li>
          <li onClick={closeDrawer}>
            <Link to="/" className="flex">
              <HomeIcon className="h-4" />
              Home
            </Link>
          </li>

          <li>
            <details open>
              <summary>Configuration</summary>
              <ul onClick={closeDrawer}>
                <li>
                  <Link to="/config/the-moon">The Moon</Link>
                </li>
                <li>
                  <Link to="/config/humans">Humans</Link>
                </li>
                <li>
                  <Link to="/config/solar-system">Solar System</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
