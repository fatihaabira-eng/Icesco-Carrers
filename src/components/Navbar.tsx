"use client"

import { useState } from "react"
import { Menu, ChevronDown, Globe, User, LogOut, LayoutDashboard, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6"
import icescoLogo from "@/assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const departments = [
  { name: "Digital Transformation", path: "/departments/digital-transformation" },
  { name: "Human Resources", path: "/departments/hr" },
  { name: "Education", path: "/departments/education" },
  { name: "Science & Technology", path: "/departments/science" },
  { name: "Culture & Heritage", path: "/departments/culture" },
  { name: "Communications", path: "/departments/communications" },
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

const mockUser = {
  fullName: "Fatima Zahra",
  email: "fatima.zahra@email.com",
  profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
  initials: "FZ",
}

const socialLinks = [
  { icon: FaInstagram, href: "https://www.instagram.com/icesco_en", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/icesco", label: "LinkedIn" },
  { icon: FaFacebookF, href: "https://www.facebook.com/icesco.en", label: "Facebook" },
  { icon: FaXTwitter, href: "https://twitter.com/ICESCO_En", label: "Twitter" },
]

export default function ImprovedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("en")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Use React Router's useLocation and useNavigate hooks
  const location = useLocation()
  const navigate = useNavigate()

  // Updated isActive function to use actual location
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate("/")
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate("/dashboard")
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Life in ICESCO", path: "/about" },
    { name: "Opportunities", path: "/opportunities" },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Desktop Social Links Bar */}
      <div className="hidden lg:block bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-2 space-x-4">
            <span className="text-xs text-gray-500 mr-2">Follow us:</span>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-bprimary transition-colors p-1"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={icescoLogo} 
              alt="ICESCO" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary border-b-2 border-primary" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary border-b-2 border-primary" : "text-gray-700"
              }`}
            >
              Life in ICESCO
            </Link>
            
            <Link 
              to="/opportunities" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/opportunities") ? "text-primary border-b-2 border-primary" : "text-gray-700"
              }`}
            >
              Opportunities
            </Link>
            
            {/* Departments Dropdown */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <span>Departments</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border shadow-lg">
                {departments.map((dept) => (
                  <DropdownMenuItem key={dept.path} asChild>
                    <Link to={dept.path} className="w-full cursor-pointer hover:bg-blue-50">
                      {dept.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{languages.find((l) => l.code === currentLang)?.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-xl p-1">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className="rounded-lg cursor-pointer hover:bg-blue-50 focus:bg-blue-50 px-3 py-2"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span className="text-gray-700">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-50">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    3
                  </Badge>
                </Button>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockUser.profilePhoto || "/placeholder.svg"} alt={mockUser.fullName} />
                      <AvatarFallback className="bg-blue-600 text-white text-sm">{mockUser.initials}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{mockUser.fullName}</p>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 bg-white border border-gray-200 shadow-lg rounded-xl p-2"
                  >
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{mockUser.fullName}</p>
                      <p className="text-sm text-gray-500">{mockUser.email}</p>
                    </div>
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer hover:bg-blue-50 focus:bg-blue-50 px-3 py-2 mt-2"
                      onClick={() => navigate("/dashboard")}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-gray-700">Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer hover:bg-blue-50 focus:bg-blue-50 px-3 py-2"
                      onClick={() => navigate("/profile")}
                    >
                      <User className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-gray-700">Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-lg cursor-pointer hover:bg-red-50 focus:bg-red-50 px-3 py-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                  className="text-gray-700 hover:text-white hover:bg-primary-light"
                >
                  Sign In
                </Button>
                <Button size="sm" onClick={handleLogin} className="bg-primary hover:bg-primary-dark text-white shadow-sm">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">I</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">ICESCO</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 py-6">
                    <div className="space-y-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                            isActive(item.path) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    {/* Mobile Departments */}
                    <div className="mt-6">
                      <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Departments
                      </h3>
                      <div className="space-y-1">
                        {departments.map((dept) => (
                          <Link
                            key={dept.path}
                            to={dept.path}
                            onClick={() => setIsOpen(false)}
                            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                              isActive(dept.path) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {dept.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Language Selector */}
                    <div className="mt-6">
                      <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Language
                      </h3>
                      <div className="space-y-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => setCurrentLang(lang.code)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                              currentLang === lang.code ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-center space-x-6 mb-6">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>

                    {!isAuthenticated && (
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => {
                            handleLogin()
                            setIsOpen(false)
                          }}
                        >
                          Sign In
                        </Button>
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            handleLogin()
                            setIsOpen(false)
                          }}
                        >
                          Get Started
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}