import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';

type GoogleSignInButtonProps = {
  onSuccess?: () => void;
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
};

export function GoogleSignInButton({
  onSuccess,
  text = 'continue_with',
}: GoogleSignInButtonProps) {
  const { signInWithGoogleCredential } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = (response: CredentialResponse) => {
    if (!response.credential) return;
    signInWithGoogleCredential(response.credential);
    onSuccess?.();
    navigate('/');
  };

  return (
    <div className="flex justify-center [&>div]:w-full [&_iframe]:mx-auto">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => undefined}
        theme="filled_black"
        size="large"
        shape="pill"
        text={text}
        width="320"
      />
    </div>
  );
}
