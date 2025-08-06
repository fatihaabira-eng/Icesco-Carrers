import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Youtube, 
  Twitter,
  Globe
} from "lucide-react";
import icescoLogo from "@/assets/logo-icesco.png";
// Import your background image (replace with your actual image path)
import footerBg from "@/assets/bg-footer.png";

export default function Footer() {
  return (
    <footer 
      className="bg-accent text-accent-foreground relative"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="max-w-7xl mx-auto container-padding py-8 relative z-10"></div>
      
      <div className="max-w-7xl mx-auto container-padding section-padding relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* ICESCO Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src={icescoLogo} 
                  alt="ICESCO" 
                  className="h-20 w-auto"
                />
              </Link>
            </div>
            <p className="text-sm text-accent-foreground/80 leading-relaxed">
              Empowering innovation and excellence in education, science, and culture across the Islamic world.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Rabat, Morocco</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+212 5 37 42 81 80</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>careers@icesco.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-secondary font-semibold text-lg text-accent-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  About ICESCO
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Open Roles
                </Link>
              </li>
              <li>
                <Link to="/business-units" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Business Units
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Contact HR
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Internships
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Units */}
          <div className="space-y-4">
            <h3 className="text-secondary font-semibold text-lg text-accent-foreground">Business Units</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/business-units/digital-transformation" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link to="/business-units/hr" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Human Resources
                </Link>
              </li>
              <li>
                <Link to="/business-units/education" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/business-units/science" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Science & Technology
                </Link>
              </li>
              <li>
                <Link to="/business-units/culture" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Culture & Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-secondary font-semibold text-lg text-accent-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-accent-foreground/80 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-accent-foreground/80 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-accent-foreground/80 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            
            {/* Language Toggle */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-accent-foreground">Language</p>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <div className="flex gap-2 text-sm">
                  <button className="text-primary hover:text-primary-light transition-colors">EN</button>
                  <span className="text-accent-foreground/50">|</span>
                  <button className="text-accent-foreground/80 hover:text-primary transition-colors">AR</button>
                  <span className="text-accent-foreground/50">|</span>
                  <button className="text-accent-foreground/80 hover:text-primary transition-colors">FR</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-accent-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-accent-foreground/60">
              © 2024 ICESCO. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-accent-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-accent-foreground/60 hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/cookies" className="text-accent-foreground/60 hover:text-primary transition-colors">
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}