import React, { useEffect, useRef } from "react";
import { Handshake, Users, Lightbulb, Flag, Layers, Target, ListChecks, GraduationCap, DollarSign } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";// Assuming you have a Button component
import one from "../imgs/one.png"; 
import two from "../imgs/two.png"; 
import thre from "../imgs/thre.png"; 
import four from "../imgs/four.png"; 
import annonce from "../imgs/annonce-ang.png"; 
import sis from "../imgs/sis.png"; 
import map1 from "../imgs/map1.png"; 
import val from "../imgs/val.png"; 
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
      <section className="py-8 md:py-4 relative h-[85vh]">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.pexels.com/photos/3184352/pexels-photo-3184352.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-60"
          />
          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left: Title */}
          <img
            src={annonce}
            alt="Hero Background"
            className="w-[400px] h-[200px] ml-24"
          />
          {/* Right: Job Info Card and Apply Button */}
          <div className="flex flex-col items-end">

         
          <img
              src={sis} // Standard <img> tag
             
              alt="World Map"
              className="mr-24 w-[290px] h-[150px] "
            />
             
            {" "}
            {/* Use flex-col and items-end to align card and button */}
            <div className="bg-white/30 mr-24 mt-12 backdrop-blur-md border border-white/50 px-6 py-6 rounded-lg shadow-lg text-gray-700 space-y-2 w-md">
              <h2 className="text-xl font-semibold text-[#f5c402] mb-3">Job information</h2>
              <p className="text-white">
                <span className="font-medium text-white">Reference number:</span> ICESCO-JOB-2024-001
              </p>
              <p className="text-white">
                <span className="font-medium  text-white">Publication date:</span> July 15, 2025
              </p>
              <p className="text-white">
                <span className="font-medium  text-white">Application deadline:</span> August 15, 2025
              </p>
              <p className="text-white">
                <span className="font-medium  text-white">location:</span> Rabat, Maroc
              </p>
              <p className="text-white" >
                <span className="font-medium  text-white">Contract type:</span> Open-ended contract
              </p>
            </div>
            {/* Apply Button - now outside the card */}
            <div className="pt-4">
              {" "}
              {/* Add padding top for spacing */}
              <Button className="bg-[#008080] mr-24 hover:bg-[#008080]/90 text-white mt-12">Apply now</Button>
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
              className="w-[350px] h-[550px] object-cover"
            />
        </div>

        {/* Column 2: Job Objective, Tasks, Qualifications */}
        <div className="lg:col-span-1 space-y-8 font-sans">
          {/* I. Objectif du poste */}
          <div>
          <div className="flex items-start gap-4">
          <img
              src={one} // Standard <img> tag
             
              alt="World Map"
              className="w-[60px] h-[60px] object-cover"
            />
            <div>
                <h3 className="text-2xl font-bold text-[#008080] mb-4">
                  I. Purpose of the position
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Contribute to the strategic development and coordination of activities within the Foresight and AI Center, with the aim of strengthening network development, supporting the launch of innovative initiatives and facilitating high-level consultations. This position also involves advancing the development of foresight studies and mechanisms to anticipate major trends in ICESCO's fields of activity, so as to foster more effective planning and informed decision-making.</p>
              </div>
            </div>
          </div>

          {/* II. Tâches à effectuer */}
          <div>
           
          <div className="flex items-start gap-4">
          <img
              src= {two} // Standard <img> tag
             
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
                  "Superviser et suivre les projets du Centre de Prospective et d'IA et assure le développement de son réseau et le lancement d'initiatives."
                }
              </li>
              <li>
                {
                  "Assurer le suivi et participer au développement des recherches et études initiées par le Centre et examiner les meilleures pratiques dans le domaine de la prospective."
                }
              </li>
              <li>{"Développer des mécanismes nouveaux et innovants dans le domaine de la prospective."}</li>
              <li>{"Analyser et rédiger des documents initiés par le Centre."}</li>
              <li>
                {
                  "Participer à l'organisation d'événements et de sessions de formation pour le Centre de Prospective et d'IA."
                }
              </li>
              <li>
                {
                  "Contribuer à l'élaboration et à la mise à jour des mécanismes et des indicateurs clés de performance et de suivi stratégique liés au Centre de Prospective."
                }
              </li>
              <li>{"Toutes les autres tâches qui lui sont confiées dans le domaine de spécialisation du poste."}</li>
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
                      "Master en prospective stratégique ou dans une autre spécialité adaptée aux tâches et missions du poste."
                    }
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Preferred certifications:</h4>
                <ul className="custom-green-square list-inside text-gray-700 space-y-1">
                  <li>{"Certification en gestion de projet (PMP, PRINCE2) - un atout."}</li>
                  <li>
                    {"Certification en prospective stratégique (par exemple, Certificat en prospective stratégique)"}
                  </li>
                  <li>
                    {"Certification en analyse des politiques publiques ou en veille concurrentielle - un atout."}
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
                    {"Au moins 10 ans d'expérience professionnelle dans l'un des domaines suivants "}
                    <ul className="custom-green-square list-inside ml-4 text-gray-700">
                      <li>{"Gestion stratégique."}</li>
                      <li>{"Gestion / Marketing / Relations internationales ;"}</li>
                      <li>
                        {
                          "Expérience professionnelle d'au moins trois ans dans une organisation internationale ou une multinationale."
                        }
                      </li>
                    </ul>
                  </li>
                  <li>{"Expérience avérée en matière de prospective stratégique"}</li>
                  <li>{"Expertise dans les méthodologies de prospective"}</li>
                  <li>
                    {
                      "Solides compétences en matière de recherche et d'analyse des tendances liées aux scénarios futurs."
                    }
                  </li>
                  <li>
                    {
                      "Capacité à concevoir et à mettre en œuvre des mécanismes de suivi et à évaluer les politiques publiques."
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
                {" - Capacité à analyser les questions complexes et d'apporter des solutions à long terme."}
              </li>
              <li>
                <span className="font-semibold">Poblem solving</span>
                {" - Capacité à proposer des solutions innovantes et efficaces."}
              </li>
              <li>
                <span className="font-semibold">Results-oriented approach</span>
                {" - S'efforcer d'atteindre des résultats efficaces conformes aux objectifs stratégiques de l'ICESCO."}
              </li>
              <li>
                <span className="font-semibold">Collaboration and teamwork</span>
                {" - Grande capacité à travailler dans différents secteurs et disciplines."}
              </li>
              <li>
                <span className="font-semibold">Adaptability and flexibility</span>
                {" - Expérience multiculturelle et grande capacité à travailler dans un environnement international."}
              </li>
              <li>
                <span className="font-semibold">Project and program management</span>
                {" - Solides compétences en planification, mise en œuvre et évaluation de projets."}
              </li>
              <li>
                <span className="font-semibold">Networking and partnerships</span>
                {
                  " - Capacité à établir et entretenir des relations avec les parties prenantes, les États membres et les organisations internationales."
                }
              </li>
              <li>
                <span className="font-semibold">Communication and negotiation</span>
                {
                  " - Excellentes compétences en communication écrite et orale, et une capacité d'interagir avec un public diversifié."
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
                  "En cas de recrutement le candidat bénéficie du salaire et des primes et avantages prévus dans le Statut du Personnel de l'ICESCO."
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
                "Le processus d'évaluation des candidats dépendra des critères prévus dans l'annonce de recrutement et peut également comprendre des tests ou des évaluations en plus de l'entretien."
              }
            </p>
            <p className="leading-relaxed">
              {"L'ICESCO adopte les moyens de communication technologiques dans le processus d'évaluation."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}