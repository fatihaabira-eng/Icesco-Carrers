import React from 'react';
import { Download } from 'lucide-react';

interface SupportingDocumentsStepProps {
  formData: {
    cv: File | null;
    otherDocuments?: File[];
  };
  handleCvFile: (file: File) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SupportingDocumentsStep: React.FC<SupportingDocumentsStepProps> = ({
  formData,
  handleCvFile,
  setFormData
}) => {
  return (
    <div>
      <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-teal-600">Supporting Documents</h2>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white shadow-sm">
          <label 
            htmlFor="cv-upload" 
            className="cursor-pointer px-6 py-3 rounded-lg font-medium shadow-md transition bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white"
          >
            <Download className="w-5 h-5 mr-2 inline" />
            {formData.cv ? 'Edit CV' : 'Select CV'}
          </label>
          <input
            id="cv-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={e => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                setFormData({ ...formData, cv: file });
                handleCvFile(file);
              }
            }}
          />
          {formData.cv && (
            <div className="mt-4 text-teal-700 font-medium">{formData.cv.name}</div>
          )}
          <div className="text-gray-500 mt-4 text-sm">Accepted formats: PDF, DOC, DOCX</div>
        </div>
      </div>
      
      <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm mt-6">
        <h2 className="text-2xl font-semibold text-teal-600">Other Documents</h2>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white shadow-sm">
          <label 
            htmlFor="other-docs-upload" 
            className="cursor-pointer px-6 py-3 rounded-lg font-medium shadow-md transition bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white"
          >
            <Download className="w-5 h-5 mr-2 inline" />
            Cover Letter or Other Documents
          </label>
          <input
            id="other-docs-upload"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={e => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                // Add uploaded file to formData.otherDocuments
                const prevDocs = formData.otherDocuments || [];
                // Prevent duplicates by name
                if (!prevDocs.some(doc => doc.name === file.name)) {
                  setFormData({
                    ...formData,
                    otherDocuments: [...prevDocs, file]
                  });
                }
              }
            }}
          />
          <div className="text-gray-500 mt-4 text-sm">Accepted formats: PDF, DOC, DOCX, JPG, PNG</div>
          {/* Show uploaded other documents */}
          {formData.otherDocuments && formData.otherDocuments.length > 0 && (
            <div className="mt-4 w-full">
              <div className="font-medium text-teal-700 mb-2">Uploaded Documents:</div>
              <ul className="list-disc pl-5">
                {formData.otherDocuments.map((doc, idx) => (
                  <li key={doc.name + idx} className="flex items-center justify-between mb-1">
                    <span>{doc.name}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700 text-xs"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          otherDocuments: formData.otherDocuments!.filter((_, i) => i !== idx)
                        });
                      }}
                    >Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportingDocumentsStep;