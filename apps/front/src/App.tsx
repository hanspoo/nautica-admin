import { BrowserRouter } from 'react-router-dom';
import { MetaApp } from './components/home/meta-app';

export function App() {
  return (
    <BrowserRouter>
      <MetaApp />
    </BrowserRouter>
  );
}
