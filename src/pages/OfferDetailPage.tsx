import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Building2, Users, Lightbulb, Award, Target, CheckCircle, GraduationCap, DollarSign, Mail, Phone, Globe } from 'lucide-react';

const OfferDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="px-20 py-16 relative max-h-[1000px] bg-gradient-to-br from-gray-600 to-gray-800 overflow-hidden"
        style={{ backgroundImage: "url('/bdb.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-teal-400/30 rounded-full blur-lg"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Left side - Announcement */}
            <div
              className="flex flex-col justify-center "
              style={{ borderRadius: '50px 0 50px 0' }}
            >
              {/* ICESCO Logo */}
              <div className="mb-8">
                
              <img src="/image.png" alt="ICESCO Logo" className="w-42 h-42 object-contain" />
              
              </div>

              {/* Announcement Banners */}
              <div className="">
                <div  style={{ borderRadius: '30px 0 30px 0' }} className="bg-yellow-400 text-white px-8 py-4 ml-10 rounded-lg shadow-lg transform max-w-[300px]">
                  <h2 className="text-3xl font-bold">Annonce de</h2>
                </div>
                <div style={{ borderRadius: '30px 0 30px 0' }} className="bg-teal-500 text-white px-8 py-6 rounded-lg shadow-lg transform  max-w-[400px]">
                  <h2 className="text-4xl font-bold">recrutement</h2>
                </div>
              </div>

              {/* Organization info */}
              <div className="mt-8 text-white">
                <p className="text-lg mb-2">L'Organisation du Monde Islamique pour l'Éducation, les Sciences et la Culture</p>
                <p className="text-xl font-semibold">(ICESCO)</p>
                <p className="text-lg mt-4">annonce un appel à candidature au poste de</p>
                <p className="text-2xl font-bold text-teal-300 mt-2">(Expert en prospective)</p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md ml-40 border max-h-[300px] border-gray-200 rounded-xl shadow-md p-6 w-full max-w-[400px] mt-36 transition hover:shadow-lg">
  <div className="space-y-2 text-sm text-gray-800">
    <div>
      <span className="font-medium text-gray-600 inline-block mr-12">Numéro du poste</span>
      <span className="font-semibold text-gray-900 inline-block">P040</span>
    </div>
    <div>
      <span className="font-medium text-gray-600 inline-block mr-12">Référence de l'annonce</span>
      <span className="font-semibold text-gray-900 inline-block">FAIC_002_25</span>
    </div>
    <div>
      <span className="font-medium text-gray-600 inline-block mr-16">Lieu du travail</span>
      <span className="text-gray-800 inline-block">Siège ICESCO</span>
    </div>
    <div className="text-sm text-gray-600">Rabat - Royaume du Maroc</div>
    <div>
      <span className="font-medium text-gray-600 inline-block mr-12">Type de contrat</span>
      <span className="text-gray-800 inline-block">CDD</span>
    </div>
    <div>
      <span className="font-medium text-gray-600 inline-block mr-28">Durée</span>
      <span className="text-gray-800 inline-block">12 mois renouvelable</span>
    </div>
    <div>
      <span className="font-medium text-gray-600 inline-block mr-24">Ouvert à</span>
      <span className="text-teal-600 font-medium inline-block">Candidats externes</span>
    </div>
    <div>
      <span className="font-medium text-gray-600 inline-block mr-20">Date limite</span>
      <span className="text-red-600 font-semibold inline-block">20/05/2025</span>
    </div>
    <div>
      <span className="font-medium text-gray-600 inline-block mr-28">E-mail</span>
      <span className="text-blue-600 font-medium inline-block">icescoemployment@icesco.org</span>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - ICESCO Values */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-teal-500 to-teal-600 rounded-lg p-6 text-white sticky top-8">
                <h3 className="text-xl font-bold mb-6 text-center">Les valeurs fondamentales de l'ICESCO</h3>
                
                <div className="space-y-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                      <Award className="w-8 h-8 text-yellow-800" />
                    </div>
                    <span className="font-semibold">Excellence</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                      <Users className="w-8 h-8 text-yellow-800" />
                    </div>
                    <span className="font-semibold">Coexistence</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                      <Lightbulb className="w-8 h-8 text-yellow-800" />
                    </div>
                    <span className="font-semibold">Innovation</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                      <Target className="w-8 h-8 text-yellow-800" />
                    </div>
                    <span className="font-semibold">Leadership</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle className="w-8 h-8 text-yellow-800" />
                    </div>
                    <span className="font-semibold">Transparence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Section I - Objectif du poste */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-400">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-yellow-800" />
                    </div>
                    <h2 className="text-2xl font-bold text-teal-600">I. Objectif du poste</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Contribuer au développement stratégique et à la coordination des activités au sein du Centre de Prospective et d'IA</strong>, dans le but de renforcer le développement du réseau, via le soutien à la formulation d'initiatives innovantes et de faciliter les consultations de haut niveau. Ce poste consiste également à faire progresser le développement d'études et de mécanismes de performance relatifs aux grandes tendances dans les domaines d'activité de l'ICESCO, de manière à favoriser une planification plus efficace et une prise de décision plus éclairée.
                    </p>
                  </div>
                </div>

                {/* Section II - Tâches à effectuer */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-400">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="w-6 h-6 text-yellow-800" />
                    </div>
                    <h2 className="text-2xl font-bold text-teal-600">II. Tâches à effectuer</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Assurer le suivi et participer au développement du Centre de Prospective et d'IA</strong> en veillant au développement de son réseau et le lancement d'initiatives.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Assurer le suivi et participer au développement</strong> de mécanismes de recherches et études initiées par le Centre et examiner les meilleures pratiques dans le domaine de la prospective.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Développer des mécanismes et innovants</strong> dans le domaine de la prospective.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Analyser et rédiger des documents édités par le Centre</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Participer à l'organisation d'événements et de sessions</strong> de formation pour le Centre de Prospective et d'IA</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Contribuer à l'élaboration et à la mise à jour</strong> des mécanismes et des indicateurs de performance et de suivi stratégique liés au Centre de Prospective.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Toutes les autres tâches qui lui sont confiées</strong> dans le domaine de spécialisation du poste.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section III - Qualifications et compétences */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-400">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                      <GraduationCap className="w-6 h-6 text-yellow-800" />
                    </div>
                    <h2 className="text-2xl font-bold text-teal-600">III. Qualifications et compétences</h2>
                  </div>
                  <div className="space-y-6 text-gray-700">
                    <div>
                      <h3 className="font-bold text-lg mb-3">Qualifications académiques :</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Master en prospective stratégique</strong> ou dans une autre spécialité adaptée aux tâches et missions du poste.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg mb-3">Certifications privilégiées :</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Certification en gestion de projet (PMP, PRINCE2) - un atout.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Certification en prospective stratégique (par exemple, Certificat en prospective stratégique)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Certification en analyse des politiques publiques ou en veille stratégique/ concurrentielle - un atout.</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-3">Compétences :</h3>
                      <p className="mb-3">Au moins 10 ans d'expérience professionnelle dans l'un des domaines suivants :</p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Gestion stratégique;</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Gestion / Marketing / Relations internationales;</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Expérience professionnelle</strong> d'au moins trois ans dans une organisation internationale ou une agence gouvernementale.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Expérience avérée en matière de prospective stratégique</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Expérience dans les méthodologies de prospective</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Solides compétences en matière de recherche et d'analyse des tendances liées aux scénarios futurs.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Capacité à concevoir et à mettre en œuvre des mécanismes de suivi et à évaluer les politiques publiques.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right column content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-teal-600 mb-4">Compétences avancées en matière de gestion de projets</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>y compris la coordination, la planification de l'exécution;</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Maîtrise de la rédaction et de la synthèse de rapports stratégiques et de documents de référence;</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Expérience en matière d'organisation d'événements internationaux et de gestion de partenariats internationaux;</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Capacité à produire des rapports qualitatifs et à organiser des événements internationaux.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Capacité à développer le réseau et les activités du Centre.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-teal-600 mb-4">Compétences de base</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Pensée stratégique</strong> – Capacité à analyser les questions complexes et d'apporter des solutions à long terme.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Résolution de problèmes</strong> – Capacité à proposer des solutions innovantes et efficaces.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Approche axée sur les résultats</strong> – S'efforcer d'atteindre des résultats efficaces conformément aux objectifs stratégiques de l'ICESCO.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Collaboration et travail d'équipe</strong> – Grande capacité à travailler dans différents secteurs et disciplines.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Adaptabilité et flexibilité</strong> – Expérience multiculturelle et grande capacité à travailler dans un environnement international.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section IV - Salaire, indemnités et avantages */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-400">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="w-6 h-6 text-yellow-800" />
                    </div>
                    <h2 className="text-2xl font-bold text-teal-600">IV. Salaire, indemnités et avantages</h2>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-6">
                    <div className="space-y-4 text-gray-700">
                      <p>
                        <strong>En cas de recrutement</strong> le candidat bénéficie du salaire et des primes et avantages prévus dans le Statut du Personnel de l'ICESCO.
                      </p>
                      <p>
                        Le processus d'évaluation des candidats dépendra des critères prévus dans l'annonce de recrutement et peut également comprendre des tests ou des évaluations en plus de l'entretien.
                      </p>
                      <p>
                        L'ICESCO adopte les moyens de communication technologiques dans le processus d'évaluation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OfferDetailPage

