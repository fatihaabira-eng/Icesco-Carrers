"use client"

import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  Star,
  Briefcase,
  Building2,
  FileText,
  GraduationCap,
  Award,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Mock data - replace with actual data fetching
const mockOffer = {
  id: "1",
  jobTitle: "Senior Frontend Developer",
  businessUnit: "Technology",
  location: "Rabat, Morocco",
  contractType: "Full-time",
  status: "Published",
  priority: "Active Search",
  positionsNeeded: 2,
  closingDate: "2024-03-15",
  publishedDate: "2024-01-15",
  expectedJoiningDate: "2024-04-01",
  jobDescription:
    "We are looking for a talented Senior Frontend Developer to join our growing team. You will be responsible for building user-facing features and ensuring excellent user experience across our web applications. This role requires strong technical skills and the ability to work collaboratively in a fast-paced environment.",
  tasks: [
    "Develop and maintain frontend applications using React and Next.js",
    "Collaborate with design team to implement pixel-perfect UI components",
    "Write clean, maintainable, and well-tested code",
    "Optimize applications for maximum speed and scalability",
    "Mentor junior developers and conduct code reviews",
  ],
  skills: [
    "React.js",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "GraphQL",
    "Jest",
    "Git",
    "JavaScript",
    "HTML5",
    "CSS3",
  ],
  academicQualifications:
    "Bachelor's degree in Computer Science, Software Engineering, or related field. Master's degree preferred but not required.",
  preferredCertifications:
    "AWS Certified Developer, Google Cloud Professional, React Developer Certification, or equivalent industry certifications.",
  salaryBenefits:
    "Competitive salary range: 25,000-35,000 MAD per month. Comprehensive health insurance, dental and vision coverage. Annual performance bonus. Professional development budget of 10,000 MAD. Flexible working hours and remote work options.",
  candidates: [
    { id: "1", name: "John Doe", stage: "applied" },
    { id: "2", name: "Jane Smith", stage: "screening" },
    { id: "3", name: "Mike Johnson", stage: "interview" },
    { id: "4", name: "Sarah Wilson", stage: "offer" },
  ],
}

const stages = [
  { id: "applied", title: "Applied", color: "bg-gray-100 text-gray-700" },
  { id: "screening", title: "Screening", color: "bg-blue-100 text-blue-700" },
  { id: "interview", title: "Interview", color: "bg-yellow-100 text-yellow-700" },
  { id: "technical", title: "Technical", color: "bg-purple-100 text-purple-700" },
  { id: "offer", title: "Offer", color: "bg-green-100 text-green-700" },
  { id: "hired", title: "Hired", color: "bg-emerald-100 text-emerald-700" },
]

export default function OfferDetailsPage() {
  const params = useParams()
  const navigate = useNavigate()
  const offerId = params.id

  // In a real app, you would fetch the offer data based on the ID
  const offer = mockOffer

  const totalCandidates = offer.candidates.length
  const candidatesByStage = stages.map((stage) => ({
    ...stage,
    count: offer.candidates.filter((c) => c.stage === stage.id).length,
  }))

  const progressPercentage =
    totalCandidates > 0
      ? (offer.candidates.filter((c) => ["offer", "hired"].includes(c.stage)).length / totalCandidates) * 100
      : 0

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Immediate Need":
        return "bg-red-100 text-red-700 border-red-200"
      case "Active Search":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "Opportunistic Hire":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700 border-green-200"
      case "Draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Archived":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Offers
          </Button>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{offer.jobTitle}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {offer.businessUnit}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {offer.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {offer.contractType}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Published {new Date(offer.publishedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                  <Badge className={getPriorityColor(offer.priority)}>{offer.priority}</Badge>
                  {offer.positionsNeeded > 1 && (
                    <Badge variant="outline">{offer.positionsNeeded} positions needed</Badge>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-[#0b787f] hover:bg-[#0a6b72] text-white">
                  <Users className="h-4 w-4 mr-2" />
                  View Candidates ({totalCandidates})
                </Button>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Edit Offer
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{offer.jobDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Tasks to be Performed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {offer.tasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#0b787f] rounded-full mt-2 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {offer.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700 border border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{offer.academicQualifications}</p>
              </CardContent>
            </Card>


           
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Business Unit</span>
                    <span className="font-medium">{offer.businessUnit}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Positions Needed</span>
                    <span className="font-medium">{offer.positionsNeeded}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Closing Date</span>
                    <span className="font-medium">{new Date(offer.closingDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Expected Joining</span>
                    <span className="font-medium">{new Date(offer.expectedJoiningDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Candidates</span>
                    <span className="font-medium">{totalCandidates}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Hiring Progress</span>
                    <span className="font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Candidate Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle>Candidate Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidatesByStage.map((stage) => (
                    <div key={stage.id} className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${stage.color}`}>{stage.title}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{stage.count}</span>
                        <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0b787f] transition-all duration-300"
                            style={{
                              width: totalCandidates > 0 ? `${(stage.count / totalCandidates) * 100}%` : "0%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
