// Login.jsx
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { toast } from 'react-hot-toast'; // Add toast for notifications

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const { login, error, isPending } = useLogin();

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const result = await login(email, password);
      if (result && result.user) {
        toast.success('Successfully logged in!');
      }
    } catch (err) {
      toast.error(err.message);
      setFormErrors({}); // Clear form errors on API error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          required
          type="email"
          autoComplete="username"
          className={`input ${formErrors.email ? 'input-error' : ''}`}
          onChange={(e) => {
            setEmail(e.target.value);
            setFormErrors((prev) => ({ ...prev, email: '' }));
          }}
          value={email}
        />
        {formErrors.email && (
          <span className="error-message">{formErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          required
          type="password"
          autoComplete="current-password"
          className={`input ${formErrors.password ? 'input-error' : ''}`}
          onChange={(e) => {
            setPassword(e.target.value);
            setFormErrors((prev) => ({ ...prev, password: '' }));
          }}
          value={password}
        />
        {formErrors.password && (
          <span className="error-message">{formErrors.password}</span>
        )}
      </div>

      <button
        className={`btn ${isPending ? 'loading' : ''}`}
        disabled={isPending}
      >
        {isPending ? 'Logging in...' : 'Log in'}
      </button>

      {error && <div className="error-container">{error}</div>}
    </form>
  );
}
