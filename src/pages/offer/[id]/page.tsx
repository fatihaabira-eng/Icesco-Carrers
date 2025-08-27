"use client"

import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Mock data - replace with actual data fetching
const mockOffer = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  posted: "2024-01-15",
  description:
    "We are looking for a talented Senior Frontend Developer to join our growing team. You will be responsible for building user-facing features and ensuring excellent user experience across our web applications.",
  salary: "$120,000 - $150,000",
  experience: "5+ years",
  requirements: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest", "Git"],
  responsibilities: [
    "Develop and maintain frontend applications using React and Next.js",
    "Collaborate with design team to implement pixel-perfect UI components",
    "Write clean, maintainable, and well-tested code",
    "Optimize applications for maximum speed and scalability",
    "Mentor junior developers and conduct code reviews",
  ],
  benefits: [
    "Health, dental, and vision insurance",
    "Flexible working hours",
    "Remote work options",
    "401(k) with company matching",
    "Professional development budget",
    "Unlimited PTO",
  ],
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{offer.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {offer.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {offer.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Posted {new Date(offer.posted).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#0b787f]" />
                  <span className="text-lg font-semibold text-[#0b787f]">{offer.salary}</span>
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
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{offer.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {offer.requirements.map((req, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-700 border border-yellow-200"
                    >
                      {req}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {offer.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#0b787f] rounded-full mt-2 flex-shrink-0" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {offer.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
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
                    <span className="text-gray-600">Experience Required</span>
                    <span className="font-medium">{offer.experience}</span>
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
