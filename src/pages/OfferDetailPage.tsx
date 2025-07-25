import React, { useEffect, useRef } from "react";
import { Handshake, Users, Lightbulb, Flag, Layers, Target, ListChecks, GraduationCap, DollarSign } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";// Assuming you have a Button component
import one from "@/imgs/one.png"; 
import two from "@/imgs/two.png"; 
import thre from "@/imgs/thre.png"; 
import four from "@/imgs/four.png"; 
import annonce from "@/imgs/annonce-ang.png"; 
import sis from "@/imgs/sis.png"; 
import map1 from "@/imgs/map1.png"; 
import val from "@/imgs/val.png"; 
import { useNavigate } from "react-router-dom";

interface HexagonIconProps {
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

function HexagonIcon({ icon, className, iconClassName }: HexagonIconProps) {
  return (
    <div className={`relative w-20 h-20 flex items-center justify-center ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 115.47"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M50,0 L100,28.8675 V86.6025 L50,115.47 L0,86.6025 V28.8675 Z" />
      </svg>
      <div className={`relative z-10 ${iconClassName}`}>{icon}</div>
    </div>
  );
}

export default function JobDetailPage() {
  const mainRef = useRef(null);
  const valuesRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animation for the entire page sections
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }

    // GSAP staggered animation for ICESCO values
    if (valuesRef.current) {
      gsap.fromTo(
        gsap.utils.toArray(".value-item"),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 w-full h-full z-0">
    <img
      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
      alt="Hero Background"
      className="w-full h-full object-cover object-center opacity-60"
    />
    <div className="absolute inset-0 bg-gray bg-opacity-80" />
  </div>

  {/* Foreground Content */}
  <div className="relative z-10 h-full w-full px-4 md:px-6">
    <div className="container mx-auto h-full flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* Left: Logo */}
      <img
        src={annonce}
        alt="Annonce"
        className="w-[220px] md:w-[280px] lg:w-[350px] max-h-[150px] object-contain"
      />

      {/* Right: Card + Button */}
      <div className="flex flex-col items-end justify-center h-full max-w-[360px] w-full text-sm">
        <img
          src={sis}
          alt="World Map"
          className="w-[220px] md:w-[290px] h-[110px] object-contain mb-3"
        />

        {/* Info Card */}
        <div className="bg-white/30 font-title backdrop-blur-md border border-white/50 px-4 py-4 rounded-lg shadow-lg text-gray-700 space-y-2 w-full">
          <h2 className="text-lg font-semibold text-[#f5c402] mb-2">Post Informations</h2>
          <p className="text-white"><span className="font-medium">Reference:</span> ICESCO-JOB-2024-001</p>
          <p className="text-white"><span className="font-medium">Publication DATE:</span> 15th July 2025</p>
          <p className="text-white"><span className="font-medium">Closig Date:</span> 15th August 2025</p>
          <p className="text-white"><span className="font-medium">Place:</span> Rabat, Morocco</p>
          <p className="text-white"><span className="font-medium">Type:</span> Fixed-term contract</p>
        </div>

        {/* Apply Button */}
        <Button
          onClick={() => navigate("/steps")}
          className="bg-[#008080] hover:bg-[#008080]/90 text-white mt-4 w-full"
        >
          Apply Now
        </Button>

      </div>
    </div>
  </div>
</section>


    {/* Main Content - 3 Columns */}
    <section className="container mx-auto px-28 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* Column 1: Map Image, ICESCO Values Title, and Values */}
      <div className="lg:col-span-1 relative flex flex-col items-center lg:items-start" ref={valuesRef}>
        {/* Map Image */}
        <div className="w-full mb-8">
          <img
            src={map1} // Standard <img> tag
            width={400}
            height={250}
            alt="World Map"
            className="w-full h-auto object-cover"
          />
        </div>

          {/* Title for ICESCO Values */}
          <h2 className="text-3xl font-bold font-sans text-[#008080] mb-8 text-center lg:text-left">
          ICESCO's core values
          </h2>

        {/* ICESCO Values List */}
        <img
            src={val} // Standard <img> tag
            width={400}
            height={250}
            alt="World Map"
            className="w-full h-[550px] object-cover"
          />
      </div>

      {/* Column 2: Job Objective, Tasks, Qualifications */}
      <div className="lg:col-span-1 space-y-8 font-title">
        {/* I. Objectif du poste */}
        <div>
        <div className="flex items-start gap-4">
        <img
            src={one}// Standard <img> tag
           
            alt="World Map"
            className="w-[60px] h-[60px] object-cover"
          />
          <div>
              <h3 className="text-2xl font-bold text-[#008080] mb-4">
              I. Purpose of the position
              </h3>
              <p className="text-gray-700 leading-relaxed">
              Contribute to the strategic development and coordination of activities within the Center for Foresight and AI, with the aim of strengthening network development, supporting the launch of innovative initiatives, and facilitating high-level consultations. This position also involves advancing the development of foresight studies and mechanisms to anticipate major trends in ICESCO's areas of activity, so as to promote more effective planning and more informed decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* II. Tâches à effectuer */}
        <div>
         
        <div className="flex items-start gap-4">
        <img
            src={two}// Standard <img> tag
           
            alt="World Map"
            className="w-[90px] h-[90px] object-cover"
          />
           <div>
          <h3 className="text-2xl font-bold text-[#008080] mb-4 flex items-center gap-2">
            
          II. Tasks to be performed
          </h3>
          <ul className="custom-green-square list-inside text-gray-700 space-y-2">
            <li>
              {
                "Supervise and monitor the projects of the Center for Foresight and AI and ensure the development of its network and the launch of initiatives."
              }
            </li>
            <li>
              {
                "Monitor and participate in the development of research and studies initiated by the Center and examine best practices in the field of foresight."
              }
            </li>
            <li>{"Develop new and innovative mechanisms in the field of foresight."}</li>
            <li>{"Analyze and write documents initiated by the Center."}</li>
            <li>
              {
                "Participate in the organization of events and training sessions for the Center for Foresight and AI."
              }
            </li>
            <li>
              {
                "Contribute to the development and updating of mechanisms and key performance and strategic monitoring indicators linked to the Foresight Center."
              }
            </li>
            <li>{"All other tasks assigned to him in the area of specialization of the position."}</li>
          </ul>
          </div>
          </div>
        </div>

          {/* III. Qualifications et compétences */}
          <div>

        <div className="flex items-start gap-4">
        <img
            src={thre} // Standard <img> tag
           
            alt="World Map"
            className="w-[90px] h-[90px] object-cover"
          />
          
          <div>
          <h3 className="text-2xl font-bold text-[#008080] mb-4 flex items-center gap-2">
            <GraduationCap size={24} className="text-[#008080]" />
            III. Qualifications and skills
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Academic qualifications:</h4>
              <ul className="custom-green-square list-inside text-gray-700 space-y-1">
                <li>
                  {
                    "Master's degree in strategic foresight or in another specialty adapted to the tasks and missions of the position."
                  }
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Certifications privilégiées:</h4>
              <ul className="custom-green-square list-inside text-gray-700 space-y-1">
                <li>{"Project management certification (PMP, PRINCE2) - an asset."}</li>
                <li>
                  {"Certification in strategic foresight (e.g., Certificate in Strategic Foresight)"}
                </li>
                <li>
                  {"Certification in public policy analysis or competitive intelligence - an asset."}
                </li>
              </ul>
            </div>
           
          </div>
          </div>
          </div>
        </div>
      </div>

        {/* Column 3: Core Competencies, Salary, Benefits */}
        <div className="lg:col-span-1 space-y-8">
        <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Skills:</h4>
                <ul className="custom-green-square list-inside text-gray-700 space-y-1">
                  <li>
                    {"At least 10 years of professional experience in one of the following fields "}
                    <ul className="custom-green-square list-inside ml-4 text-gray-700">
                      <li>{"Strategic management."}</li>
                      <li>{"Management / Marketing / International Relations;"}</li>
                      <li>
                        {
                          "At least three years of professional experience in an international organization or multinational."
                        }
                      </li>
                    </ul>
                  </li>
                  <li>{"Proven experience in strategic foresight"}</li>
                  <li>{"Expertise in prospective methodologies"}</li>
                  <li>
                    {
                      "Strong skills in research and analysis of trends related to future scenarios."
                    }
                  </li>
                  <li>
                    {
                      "Ability to design and implement monitoring mechanisms and evaluate public policies."
                    }
                  </li>
                </ul>
              </div>
          {/* Compétences de base */}
          <div>
            <h3 className="text-2xl font-bold text-[#008080] mb-4">Basic skills</h3>
            <ul className="custom-green-square list-inside text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">Strategic thinking</span>
                {" - Ability to analyze complex issues and provide long-term solutions."}
              </li>
              <li>
                <span className="font-semibold">Poblem solving</span>
                {"- Ability to offer innovative and effective solutions."}
              </li>
              <li>
                <span className="font-semibold">Results-oriented approach</span>
                {"- Strive to achieve effective results in line with ICESCO's strategic objectives."}
              </li>
              <li>
                <span className="font-semibold">Collaboration and teamwork</span>
                {"- Strong ability to work across different sectors and disciplines."}
              </li>
              <li>
                <span className="font-semibold">Adaptability and flexibility</span>
                {" - Multicultural experience and strong ability to work in an international environment."}
              </li>
              <li>
                <span className="font-semibold">Project and program management</span>
                {" - Strong skills in project planning, implementation and evaluation."}
              </li>
              <li>
                <span className="font-semibold">Networking and partnerships</span>
                {
                  " - Ability to establish and maintain relationships with stakeholders, Member States and international organizations."
                }
              </li>
              <li>
                <span className="font-semibold">Communication and negotiation</span>
                {
                  " - Excellent written and oral communication skills, and an ability to interact with a diverse audience."
                }
              </li>
            </ul>
          </div>

        {/* IV. Salaire, indemnités et avantages */}
        <div>
        <div className="flex items-start gap-4">
        <img
            src={four} // Standard <img> tag
           
            alt="World Map"
            className="w-[90px] h-[90px] object-cover"
          />
           <div>
          <h3 className="text-2xl font-bold text-[#008080] mb-4 flex items-center gap-2">
          
          IV. Salary, allowances and benefits
          </h3>
          <ul className="custom-green-square list-inside text-gray-700 space-y-2">
            <li>
              {
                "In the event of recruitment, the candidate receives the salary, bonuses and benefits provided for in the ICESCO Staff Regulations."
              }
            </li>
          </ul>
          </div>
          </div>
        </div>

          {/* Green Box */}
          <div className="bg-[#005050] text-white p-12 rounded-tl-[60px] rounded-tr-none rounded-bl-none rounded-br-[60px] shadow-lg space-y-4">
            <p className="leading-relaxed">
              {
                "The candidate assessment process will depend on the criteria set out in the job advertisement and may also include tests or assessments in addition to the interview."
              }
            </p>
            <p className="leading-relaxed">
              {"ICESCO adopts technological means of communication in the evaluation process."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}