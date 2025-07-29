import { MapPin, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom"; // ✅ Add this import

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  urgent?: boolean;
  description: string;
  skills: string[];
}

export default function JobCard({
  title,
  department,
  location,
  type,
  experience,
  urgent = false,
  description,
  skills,
}: JobCardProps) {
  return (
    <Card className="card-hover group cursor-pointer bg-card border-border flex flex-col justify-between h-full">
  <CardHeader className="pb-4">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-primary font-medium">{department}</p>
      </div>
      {urgent && (
        <Badge className="bg-secondary text-secondary-foreground">
          Urgent
        </Badge>
      )}
    </div>

    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        <span>{type}</span>
      </div>
      <div className="flex items-center gap-1">
        <BookOpen className="w-4 h-4" />
        <span>{experience}</span>
      </div>
    </div>
  </CardHeader>

  <CardContent className="flex flex-col flex-1 justify-between space-y-4">
    {/* Fixed height area for description and skills */}
    <div className="flex-1 space-y-4">
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
        {description}
      </p>

      <div className="space-y-2">
        <p className="text-sm font-medium text-card-foreground">Key Skills:</p>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>
      </div>
    </div>

    {/* Footer fixed at bottom */}
    <div className="flex justify-between items-center pt-4">
      <Link to="/details">
        <Button size="sm" className="bg-primary hover:bg-primary-dark text-primary-foreground">
          View Details
        </Button>
      </Link>
    </div>
  </CardContent>
</Card>

  );
}
