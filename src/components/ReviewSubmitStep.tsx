import React from "react";
import { FileText } from "lucide-react";
import { Education } from "@/Types/Education";
import { Certification } from "@/Types/Certification";
import { Reference } from "@/Types/Reference";
import { Experience } from "@/Types/Experience";
import { SocialMedia } from "@/Types/SocialMedia";
import { Language } from "@/Types/Language";



interface FormData {
  offerId?: string;
  fullName?: string;
  email?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  nationality?: string;
  dateOfBirth?: string;
  address?: string;
  education: Education[];
  certifications: Certification[];
  experience: Experience[];
  technicalSkills: string[];
  technicalSkillsEvidence: Record<string, File>;
  managerialSkills: string[];
  managerialSkillsEvidence: Record<string, File>;
  languages: Language[];
  practicalExperience?: string;
  socialMedia: SocialMedia[];
  references: Reference[];
  cv?: File;
  videoFile?: File;
  otherDocuments?: File[];
}

interface ReviewSubmitProps {
  formData: FormData;
  submitted: boolean;
  submitError?: string;
  acceptTerms: boolean;
  setAcceptTerms: (val: boolean) => void;
  ACHIEVEMENT_TYPES: { value: string; label: string }[];
}

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({
  formData,
  submitted,
  submitError,
  acceptTerms,
  setAcceptTerms,
  ACHIEVEMENT_TYPES,
}) => {
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg shadow-sm">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Application Submitted!
        </h2>
        <p className="text-gray-600 text-center max-w-md">
          Thank you for your application. We will review your information and
          get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Review & Submit</h2>

      {/* Error */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-400 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                Unable to Submit Application
              </h3>
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-6">
        {/* Job Offer */}
        {formData.offerId && (
          <div>
            <h3 className="text-lg font-medium text-teal-700 mb-3">Job Offer</h3>
            <div className="text-gray-800 p-4 rounded-lg border bg-white shadow-sm">
              <span className="font-semibold">Offer ID:</span> {formData.offerId}
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-medium text-teal-700 mb-3">
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-800 p-4 rounded-lg border bg-white shadow-sm">
            <div>
              <span className="font-semibold">Full Name:</span>{" "}
              {formData.fullName || "-"}
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              {formData.email || "-"}
            </div>
            <div>
              <span className="font-semibold">Phone:</span>{" "}
              {formData.phoneCountryCode} {formData.phoneNumber || "-"}
            </div>
            <div>
              <span className="font-semibold">Nationality:</span>{" "}
              {formData.nationality || "-"}
            </div>
            <div>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {formData.dateOfBirth || "-"}
            </div>
            <div>
              <span className="font-semibold">Address:</span>{" "}
              {formData.address || "-"}
            </div>
          </div>
        </div>
 <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Education</h3>
                {formData.education.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No education provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.education.map((edu, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Institution:</span> {edu.place || '-'}</div>
                          <div><span className="font-semibold">Diploma:</span> {edu.diploma || '-'}</div>
                          <div><span className="font-semibold">From:</span> {edu.startDate || '-'}</div>
                          <div><span className="font-semibold">To:</span> {edu.endDate || '-'}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Certifications</h3>
                {formData.certifications.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No certifications provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.certifications.map((cert, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Title:</span> {cert.title || '-'}</div>
                          <div><span className="font-semibold">Issuer:</span> {cert.issuer || '-'}</div>
                          <div><span className="font-semibold">Date:</span> {cert.date || '-'}</div>
                          {cert.url && (
                            <div><span className="font-semibold">URL:</span> <a href={cert.url} className="text-teal-600 hover:underline">{cert.url}</a></div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Professional Experience</h3>
                {formData.experience.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No experience provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.experience.map((exp, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Company:</span> {exp.company || '-'}</div>
                          <div><span className="font-semibold">Position:</span> {exp.jobTitle || '-'}</div>
                          <div><span className="font-semibold">From:</span> {exp.startDate || '-'}</div>
                          <div><span className="font-semibold">To:</span> {exp.current ? 'Currently' : (exp.endDate || '-')}</div>
                        </div>
                        {exp.description && (
                          <div className="mt-2">
                            <span className="font-semibold">Description:</span>
                            <p className="text-gray-700 mt-1">{exp.description}</p>
                          </div>
                        )}
                        {exp.achievements && (
                          <div className="mt-2">
                            <span className="font-semibold">Achievements:</span>
                            <p className="text-gray-700 mt-1">{exp.achievements}</p>

                            {/* Achievement Evidence */}
                            {exp.achievementType && (
                              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                <span className="font-semibold text-sm">Evidence:</span>
                                {exp.achievementType === 'press' && exp.achievementLink ? (
                                  <div className="mt-1">
                                    <span className="text-sm text-gray-600">Press Link: </span>
                                    <a
                                      href={exp.achievementLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-teal-600 hover:underline text-sm"
                                    >
                                      {exp.achievementLink}
                                    </a>
                                  </div>
                                ) : exp.achievementFile ? (
                                  <div className="mt-1 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-teal-600" />
                                    <span className="text-sm text-gray-600">
                                      {exp.achievementType === 'report' && 'Report: '}
                                      {exp.achievementType === 'acknowledgment' && 'Acknowledgment Letter: '}
                                      {exp.achievementType === 'certificate' && 'Thank You Certificate: '}
                                      {exp.achievementFile.name}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-500 mt-1 block">
                                    {ACHIEVEMENT_TYPES.find(t => t.value === exp.achievementType)?.label} (No file uploaded)
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Technical Skills</h3>
                {formData.technicalSkills.filter(skill => skill.trim() !== '').length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No technical skills provided.</div>
                ) : (
                  <div className="space-y-3 p-4 rounded-lg border bg-white shadow-sm">
                    {formData.technicalSkills
                      .filter(skill => skill.trim() !== '')
                      .map((skill, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                            {formData.technicalSkillsEvidence[skill] && (
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Evidence: {formData.technicalSkillsEvidence[skill]?.name}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Managerial Skills</h3>
                {formData.managerialSkills.filter(skill => skill.trim() !== '').length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No managerial skills provided.</div>
                ) : (
                  <div className="space-y-3 p-4 rounded-lg border bg-white shadow-sm">
                    {formData.managerialSkills
                      .filter(skill => skill.trim() !== '')
                      .map((skill, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-yellow-50  border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                            {formData.managerialSkillsEvidence[skill] && (
                              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Evidence: {formData.managerialSkillsEvidence[skill]?.name}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Languages</h3>
                {formData.languages.filter(lang => lang.language.trim() !== '' && lang.level.trim() !== '').length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No languages provided.</div>
                ) : (
                  <div className="space-y-3 p-4 rounded-lg border bg-white shadow-sm">
                    {formData.languages
                      .filter(lang => lang.language.trim() !== '' && lang.level.trim() !== '')
                      .map((lang, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                              {lang.language} - {lang.level}
                            </span>
                            {lang.learnedFrom && (
                              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                Learned from: {lang.learnedFrom}
                              </span>
                            )}
                            {lang.certificate && (
                              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Certificate: {lang.certificate.name}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Practical Experience</h3>
                {formData.practicalExperience ? (
                  <p className="text-gray-700 p-4 rounded-lg border bg-white shadow-sm">{formData.practicalExperience}</p>
                ) : (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No practical experience provided.</div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Social Media & Online Presence</h3>
                {formData.socialMedia.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No profiles provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.socialMedia.map((sm, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Platform:</span> {sm.platform || '-'}</div>
                          <div><span className="font-semibold">URL:</span> <a href={sm.url} className="text-teal-600 hover:underline">{sm.url || '-'}</a></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">References</h3>
                {formData.references.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No references provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.references.map((ref, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Name:</span> {ref.name || '-'}</div>
                          <div><span className="font-semibold">Title/Relationship:</span> {ref.title || '-'}</div>
                          <div><span className="font-semibold">Email:</span> {ref.email || '-'}</div>
                          <div><span className="font-semibold">Phone Number:</span> {ref.email || '-'}</div>
                          {ref.note && (
                            <div className="col-span-2">
                              <span className="font-semibold">Note:</span>
                              <p className="text-gray-700 mt-1">{ref.note}</p>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Supporting Documents</h3>
                {formData.cv ? (
                  <div className="text-teal-700 font-medium p-4 rounded-lg border bg-white shadow-sm">{formData.cv.name}</div>
                ) : (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No CV uploaded.</div>
                )}
                {/* Other Documents Section */}
                <div className="mt-4">
                  <h4 className="text-md font-medium text-teal-600 mb-2">Other Documents</h4>
                  {formData.otherDocuments && formData.otherDocuments.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {formData.otherDocuments.map((doc, idx) => (
                        <li key={doc.name + idx} className="text-teal-700 font-medium mb-1">
                          {doc.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-gray-500 p-2 rounded-lg border bg-white shadow-sm">No other documents uploaded.</div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Video Introduction</h3>
                {formData.videoFile ? (
                  <div className="text-teal-700 font-medium p-4 rounded-lg border bg-white shadow-sm">
                    Video introduction recorded ({(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                ) : (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No video introduction submitted.</div>
                )}
              </div>

        {/* Terms */}
        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-gray-700">
              I accept the{" "}
              <a href="/privacy-policy" className="text-teal-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-teal-600 hover:underline">
                Terms of Service
              </a>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
