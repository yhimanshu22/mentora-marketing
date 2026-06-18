import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
import { AppRoutes } from './AppRoutes';
import { getGoogleClientId, isValidGoogleClientId } from './lib/google';

const googleClientId = getGoogleClientId();

export default function App() {
  const app = (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );

  if (!isValidGoogleClientId(googleClientId)) {
    return app;
  }

  return <GoogleOAuthProvider clientId={googleClientId}>{app}</GoogleOAuthProvider>;
}
