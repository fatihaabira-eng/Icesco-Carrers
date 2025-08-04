import React, { useState } from 'react';
import { Mail, Lock, User, Briefcase, Linkedin, Eye, EyeOff } from 'lucide-react';
import icescoLogo from "@/assets/logo.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import fatihaabira from "@/assets/abira-fatiha.jpeg";


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

export default function AuthenticationPage({ onLoginSuccess }) { // Accept onLoginSuccess as a prop
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleFormSwitch = () => {
    setIsLogin(!isLogin);
    // Clear form fields on switch
    setFullName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real application, you'd send this data to your backend for authentication.
    // For now, we'll simulate a successful response and user data.

    if (isLogin) {
      console.log('Attempting to log in with:', { email, password });
      // Simulate API call success
      setTimeout(() => { // Simulate network delay
        // Only proceed with login if email and password match the demo credentials
        if (email === "fatiha.abira@gmail.com" && password === "secure123") {
          const mockUserData = {
            fullName: "Fatiha Abira", // This would come from your backend response
            email: email,
            profilePhoto: fatihaabira, // Using the imported image
            initials: "FA", // Corrected initials for Fatiha Abira
          };
          onLoginSuccess(mockUserData); // Call the callback with user data
          navigate("/"); // Redirect to home page
        } else {
          console.log("Login failed: Invalid credentials");
          // In a real app, you'd show an error message to the user (e.g., a toast notification)
        }
      }, 1000); // 1-second delay for demonstration
    } else {
      console.log('Attempting to sign up with:', { fullName, email, password });
      // Simulate API call success for signup
      setTimeout(() => { // Simulate network delay
        const mockUserData = {
          fullName: fullName, // This would come from your backend response
          email: email,
          profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face", // Or a default for new users
          initials: fullName.split(' ').map(n => n[0]).join('').toUpperCase() || 'NA',
        };
        onLoginSuccess(mockUserData); // Call the callback with new user data
        navigate("/dashboard"); // Redirect after successful signup
      }, 1000); // 1-second delay for demonstration
    }
  };
  if (email === "fatiha.abira@gmail.com" && password === "secure123") {
      const mockUserData = {
        fullName: "Fatiha Abira",
        email: email,
        profilePhoto: fatihaabira,
        initials: "FA",
      };
      localStorage.setItem('user', JSON.stringify(mockUserData)); // Add this line
      onLoginSuccess(mockUserData);
      const returnTo = location.state?.from || "/";
      navigate(returnTo);
    }
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
