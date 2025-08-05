import { ArrowRight, Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundImage?: string;
  showVideo?: boolean;
  showSearch?: boolean;
  searchKeyword?: string;
  onSearchChange?: (value: string) => void;
  selectedDepartment?: string;
  onDepartmentChange?: (value: string) => void;
  background?: {
    type: "image" | "video";
    src: string;
  };
}

export default function HeroSection({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  backgroundImage,
  showVideo = false,
  showSearch = false,
  searchKeyword = "",
  onSearchChange,
  selectedDepartment = "",
  onDepartmentChange,
  background
}: HeroSectionProps) {
  return (
  <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-hero">
      {background.type=="video" ? (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src={background.src}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : background.type=="image"  ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${background.src})` }}
        />
      ) : null}

      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:50px_50px]" />
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto container-padding">
      <div className="flex flex-col items-center justify-center text-center min-h-[60vh] space-y-8">
        {/* Left Side - Content */}
        <div className="mt-12 space-y-8 text-center">
          <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>

          <p className="text-xl font-title md:text-2xl text-white/90 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start items-center justify-center">
            {secondaryButtonText && (<Button
                onClick={onPrimaryClick}
                size="lg"
                className="btn-hero group bg-[#ecc42d] font-title"
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
          )}
            {secondaryButtonText && (
              <Button
                variant="outline"
                size="lg"
                onClick={onSecondaryClick}
                className="border-white text-white font-title hover:bg-white hover:text-accent bg-transparent"
              >
                {showVideo && <Play className="mr-2 w-5 h-5" />}
                {secondaryButtonText}
              </Button>
            )}
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 space-y-4">
              <h3 className="text-white font-semibold font-title text-lg">Find Your Perfect Role</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                  <Input
                    placeholder="Search by role, skills, keywords..."
                    value={searchKeyword}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:bg-white/20"
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
                  <SelectTrigger className="sm:w-48 bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Business Units</SelectItem> {/* Changed from "" to "all" */}
                    <SelectItem value="Digital Transformation">Digital Transformation</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Science & Technology">Science & Technology</SelectItem>
                    <SelectItem value="Culture & Heritage">Culture & Heritage</SelectItem>
                    <SelectItem value="Communications">Communications</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Visual Space */}
        <div className="hidden lg:block">
          {/* This space can be used for additional visual elements */}
        </div>
      </div>
    </div>

    {/* Floating Elements */}
    <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse" />
    <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse animation-delay-1000" />
    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-bounce animation-delay-2000" />
  </section>
);

}