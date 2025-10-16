import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { LogInIcon, UserIcon, LockIcon, EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      
      // Check user role and redirect accordingly
      if (result.user && result.user.role === 'admin') {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      // Error handled in store
      console.error("Login error:", error);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1500')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80"></div>

      {/* Login Card */}
      <div className="relative z-10 card w-full max-w-md bg-base-100 shadow-2xl animate-fade-in-up">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-base-content/70">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input input-bordered w-full pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full btn-lg"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <LogInIcon className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="divider">OR</div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-base-content/70">
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary font-semibold">
                Register here
              </Link>
            </p>
          </div>

          {/* Demo Credentials (Optional - Remove in production) */}
          <div className="mt-4 p-4 bg-base-200 rounded-lg text-xs">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>Customer: customer@example.com / password123</p>
            <p>Admin: admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
