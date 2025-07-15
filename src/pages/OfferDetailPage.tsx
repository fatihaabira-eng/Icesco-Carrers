import React from 'react';
import { 
  Target, 
  CheckSquare, 
  GraduationCap, 
  DollarSign, 
  Users, 
  Globe, 
  Lightbulb, 
  Award, 
  Eye,
  Mail,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';

import icescoLogo from "@/assets/logo-icesco.png";
const JobAnnouncement = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-gray-600 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <div className="">
                <div  style={{ borderRadius: '30px 0 30px 0' }} className="bg-yellow-400 text-white px-8 py-4 ml-10 rounded-lg shadow-lg transform max-w-[300px]">
                  <h2 className="text-3xl font-bold">Annonce de</h2>
                </div>
                <div style={{ borderRadius: '30px 0 30px 0' }} className="bg-teal-500 text-white px-8 py-6 rounded-lg shadow-lg transform  max-w-[400px]">
                  <h2 className="text-4xl font-bold">recrutement</h2>
                </div>
              </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-4 mb-4">
                <div className=" w-40 h-40 flex items-center justify-center">
                  <img 
                    src={icescoLogo} 
                    alt="ICESCO" 
                    className="h-12 w-auto"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Islamic World Educational, Scientific and Cultural Organization</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">
                The Islamic World Educational, Scientific and Cultural Organization<br />
                
              </h2>
              <p className="text-xl mb-2">announces the call for applications for the post of</p>
              <h3 className="text-3xl font-bold text-teal-400">(Expert in Foresight)</h3>
            </div>
            
            <div className="bg-white bg-opacity-95 p-4 rounded-lg border-4 border-yellow-400 shadow-xl">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Post No.:</span>
                  <span className="text-teal-600 font-bold">P040</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Announcement Ref.:</span>
                  <span className="text-teal-600 font-bold">FAIC_002_25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Workplace:</span>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">Permanent Headquarters of ICESCO</div>
                    <div className="text-gray-600">Rabat - Kingdom of Morocco</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Type of contract:</span>
                  <span className="text-teal-600 font-bold">Fixed-term</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Duration of contract:</span>
                  <span className="text-gray-800">One year <span className="text-teal-600 font-bold">(12 months)</span> renewable</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Recruitment open for:</span>
                  <span className="text-teal-600 font-bold">external candidates</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Deadline:</span>
                  <span className="text-gray-800 font-bold">20/05/2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Application email:</span>
                  <span className="text-teal-600 font-bold">icescoemployment@icesco.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Core Values Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-teal-600 mb-6">ICESCO<br />core<br />Values</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Solidarity</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Coexistence</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Innovation</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Leadership</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Transparency</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Section 1: Objective */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    1
                  </div>
                  <h2 className="text-2xl font-bold text-teal-600">I. Objective</h2>
                </div>
                <div className="ml-16">
                  <p className="text-gray-700 leading-relaxed">
                    Contributing to the strategic development and coordination of activities within the Center for 
                    Foresight and AI, with the objective of strengthening network development, supporting the 
                    launch of innovative initiatives, and facilitating high-level consultations. The role also aims to 
                    advance the development of studies and foresight mechanisms to anticipate major trends in 
                    ICESCO's areas of work, thereby supporting more effective planning and informed decision-making.
                  </p>
                </div>
              </div>

              {/* Section 2: Tasks */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-teal-600">II. Tasks</h2>
                </div>
                <div className="ml-16">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Supervises and monitors the projects of the center for foresight and AI and ensures the development of its network and the launch of joint initiatives.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ensures the follow-up and participates in the development carries out research and studies initiated by the center and examines best practices in relation to the field of foresight.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Develops new and innovative mechanisms in the field of foresight.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Analyzes and writes documents edited by the center</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Participate in the organization of events and training sessions for the center for foresight and AI</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Contributes to the development and updating of mechanisms and key performance indicators and strategic monitoring linked to the foresight center.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>All other tasks assigned to her / him in the area of specialization of the position.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Qualifications */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    3
                  </div>
                  <h2 className="text-2xl font-bold text-teal-600">III. Qualifications and Competencies</h2>
                </div>
                <div className="ml-16 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Academic Qualifications:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Master's degree in strategic foresight or another specialty suitable for the position's tasks and missions.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Preferred certifications:</h4>
                    <ul className="space-y-1 text-gray-700 ml-4">
                      <li>• Project Management Certification (PMP, PRINCE2) – an asset.</li>
                      <li>• Strategic Foresight Certification (e.g., Certificate in Strategic Foresight)</li>
                      <li>• Public Policy Analysis or Competitive Intelligence Certification – an asset.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Skills and Competencies:</h4>
                    <p className="text-gray-700 mb-2">At least 10 years of professional experience in one of the following areas:</p>
                    <ul className="space-y-1 text-gray-700 ml-4">
                      <li>• AI Strategic management.</li>
                      <li>• Management / Marketing / International relations.</li>
                    </ul>
                    <ul className="space-y-2 text-gray-700 mt-3">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>A professional experience of at least 3 years in an international organization or a multinational.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Proven experience in strategic foresight.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Expertise in foresight methodologies.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Core Competencies */}
              <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-teal-600 mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  Core competencies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span><strong>Strategic Thinking</strong> – analyzing complex issues and developing long-term solutions.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span><strong>Problem-Solving</strong> – proposing innovative and effective solutions.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span><strong>Results-Oriented Approach</strong> – Endeavor to achieve impactful outcomes aligned with ICESCO's strategic goals.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span><strong>Collaboration and Teamwork</strong> – Strong ability to work across different sectors and disciplines.</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span>Strong skills in research and trend analysis related to future scenarios.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span>Ability to design and implement monitoring mechanisms and evaluate public policies.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span>Advanced project management skills, including coordination, monitoring, and evaluation.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span>Ability to develop the center's network.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Salary */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    4
                  </div>
                  <h2 className="text-2xl font-bold text-teal-600">IV. Salary, allowances and benefits</h2>
                </div>
                <div className="ml-16">
                  <p className="text-gray-700 leading-relaxed">
                    In case of recruitment, the candidate will benefit from the salary and bonuses and 
                    privileges set forth in ICESCO Personnel Regulations.
                  </p>
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-teal-500 text-white p-6 rounded-lg">
                <p className="text-sm leading-relaxed">
                  The processing of applications is subject to the abovementioned criteria and may also 
                  include tests or evaluations in addition to a job interview.<br /><br />
                  ICESCO uses communication technologies in the evaluation process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAnnouncement;