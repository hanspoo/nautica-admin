import { useAuth } from 'react-oidc-context';
import { Navbar } from './navbar';

import { Authenticated } from './Authenticated';
import { Unauthenticated } from './Unauthenticated';
import { Footer } from '../public/footer';

export function App() {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Authenticated />;
  }

  return (
    <div className="flex flex-col w-full max-w-[1280px] m-auto min-h-screen justify-between ">
      <div>
        <Navbar loginSection={auth.isAuthenticated} />
        <Unauthenticated />
      </div>
      <Footer />
    </div>
  );
}
