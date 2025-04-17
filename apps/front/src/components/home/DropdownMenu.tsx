import { useAuth } from 'react-oidc-context';

export function DropdownMenu() {
  const auth = useAuth();
  const email = auth.user?.profile.email || 'invalid@user.org';

  return (
    <div className="dropdown dropdown-end cursor-pointer md:mr-2">
      <div tabIndex={0} role="button">
        <div className="bg-primary rounded-full relative inline-flex items-center justify-center w-8 h-8 overflow-hidden text-white ">
          <span className="font-medium">
            {email.substring(0, 1).toUpperCase()}
          </span>
        </div>
      </div>
      <UserDropdownContent />
    </div>
  );
}
export function UserDropdownContent() {
  const auth = useAuth();
  const email = auth.user?.profile.email || 'invalid@user.org';
  const name = auth.user?.profile.name || 'Invalid User';

  return (
    <div
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow "
    >
      <div className="flex flex-col items-center">
        <div>Hello {name}</div>
        <div className="opacity-50">{email}</div>
        <button
          className="btn my-4 btn-sm"
          onClick={() => auth.signoutRedirect()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
