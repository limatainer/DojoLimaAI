import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-login-credentials':
        return 'Invalid email or password';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      default:
        return 'Failed to login. Please try again.';
    }
  };

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (!res || !res.user) {
        throw new Error('Could not complete login');
      }

      // update online status
      await projectFirestore
        .collection('users')
        .doc(res.user.uid)
        .update({ online: true });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // Only update states if component is still mounted
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      return res;
    } catch (err) {
      if (!isCancelled) {
        setError(getErrorMessage(err.code));
        setIsPending(false);
      }
      throw err; // Re-throw for component handling
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
