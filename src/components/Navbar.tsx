import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import icescoLogo from "@/assets/logo.png";

const departments = [
  { name: "Digital Transformation", path: "/departments/digital-transformation" },
  { name: "Human Resources", path: "/departments/hr" },
  { name: "Education", path: "/departments/education" },
  { name: "Science & Technology", path: "/departments/science" },
  { name: "Culture & Heritage", path: "/departments/culture" },
  { name: "Communications", path: "/departments/communications" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "fr", name: "Français" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto container-padding">
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
              to="/about"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary border-b-2 border-primary" : "text-foreground"
              }`}
            >
              About
            </Link>
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary border-b-2 border-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/opportunities"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/opportunities") ? "text-primary border-b-2 border-primary" : "text-foreground"
              }`}
            >
              Opportunities
            </Link>

            {/* Departments Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 font-medium text-foreground hover:text-primary transition-colors">
                <span>Departments</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border shadow-lg">
                {departments.map((dept) => (
                  <DropdownMenuItem key={dept.path} asChild>
                    <Link to={dept.path} className="w-full cursor-pointer hover:bg-primary/10">
                      {dept.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 font-medium text-foreground hover:text-primary transition-colors">
                <Globe className="w-4 h-4" />
                <span>{languages.find(l => l.code === currentLang)?.name}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border shadow-lg">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code} 
                    onClick={() => setCurrentLang(lang.code)}
                    className="cursor-pointer hover:bg-primary/10"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="py-4 space-y-4">
              <Link
                to="/"
                className="block font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/opportunities"
                className="block font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Opportunities
              </Link>
              
              <div className="space-y-2">
                <p className="font-medium text-muted-foreground text-sm">Departments</p>
                {departments.map((dept) => (
                  <Link
                    key={dept.path}
                    to={dept.path}
                    className="block pl-4 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {dept.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}