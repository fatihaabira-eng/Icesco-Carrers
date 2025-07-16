import React, { useState } from 'react';
import { Mail, Lock, User, Briefcase, Linkedin, Eye, EyeOff, Link } from 'lucide-react';
import icescoLogo from "@/assets/logo.png";
// Reusable Input Component
const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative flex items-center">
      <Icon className="absolute left-4 w-5 h-5 text-gray-400" />
      <input
        type={isPasswordVisible ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 text-gray-500 hover:text-gray-700"
        >
          {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};

// Reusable Social Login Button
const SocialButton = ({ icon: Icon, text, provider }) => (
  <button className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 border rounded-lg transition duration-300 ${
    provider === 'google' 
      ? 'border-gray-300 hover:bg-gray-100' 
      : 'bg-[#0077B5] text-white border-[#0077B5] hover:bg-[#005E90]'
  }`}>
    <Icon className="w-5 h-5" />
    <span className="font-semibold">{text}</span>
  </button>
);

export default function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSwitch = () => {
    setIsLogin(!isLogin);
    // Clear form fields on switch
    setFullName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', { email, password });
      // Handle login logic here
    } else {
      console.log('Signing up with:', { fullName, email, password });
      // Handle signup logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
              <img 
                src={icescoLogo} 
                alt="ICESCO" 
                className="mx-auto h-20 w-auto"
              />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {isLogin ? 'Welcome to ICESCO' : 'Create Your Account'}
            </h1>
            <p className="text-gray-500 mt-2">
              {isLogin ? 'Access your candidate dashboard.' : 'Join ICESCO to shape the future.'}
            </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Social Logins */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <SocialButton icon={Linkedin} text="Continue with LinkedIn" provider="linkedin" />
            <SocialButton icon={() => <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5"/>} text="Continue with Google" provider="google" />
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-200" />
            <span className="mx-4 text-sm font-medium text-gray-400">OR</span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <InputField
                icon={User}
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {isLogin && (
                <div className="text-right">
                    <a href="#" className="text-sm font-medium text-primary hover:text-secondary">
                        Forgot Password?
                    </a>
                </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-white hover:text-primary hover:border hover:border-primary focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Switch between Login and Signup */}
          <p className="text-center text-sm text-gray-600 mt-8">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={handleFormSwitch} className="font-semibold text-primary hover:text-secondary ml-1 focus:outline-none">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
        
        <p className="text-xs text-gray-400 text-center mt-8">
            By continuing, you agree to ICESCO's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
