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

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) return;
    try {
      await signInWithGoogleCredential(response.credential);
      onSuccess?.();
      navigate('/');
    } catch {
      // Sign-in errors are surfaced when the API is unreachable or rejects the token.
    }
  };

  return (
    <div className="mx-auto flex w-full justify-center">
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
