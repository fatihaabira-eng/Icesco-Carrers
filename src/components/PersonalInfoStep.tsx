import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import InputField from './InputField';


const countryCodes = [
  { code: '+1', name: 'United States', iso: 'US' },
  { code: '+44', name: 'United Kingdom', iso: 'GB' },
  { code: '+33', name: 'France', iso: 'FR' },
  { code: '+49', name: 'Germany', iso: 'DE' },
  { code: '+212', name: 'Morocco', iso: 'MA' },
  // Add more country codes as needed
];

const PersonalInfoStep = ({ formData, handleInputChange }) => {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);



  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-teal-600">Personal Information</h2>
        <div className="relative group">
          <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
          <div className="absolute hidden group-hover:block w-64 p-3 bg-white rounded-lg shadow-lg text-sm text-gray-600 z-10 -right-2 top-6">
            Your personal information is securely stored and used solely for recruitment purposes.
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          id="fullName"
          value={formData.fullName ?? ""}
          onChange={handleInputChange}
          placeholder="Enter your full name"
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          value={formData.email ?? ""}
          onChange={handleInputChange}
          placeholder="Enter your email address"
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label htmlFor="phoneCountryCode" className="block text-sm font-medium text-gray-700 mb-1 sr-only">
              Country Code
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm hover:shadow-md transition text-sm"
                onClick={() => setShowCountryDropdown(v => !v)}
                id="phoneCountryCode"
              >
                <span className="flex items-center gap-1">
                  <ReactCountryFlag
                    countryCode={countryCodes.find(c => c.code === formData.phoneCountryCode)?.iso || ''}
                    svg
                    style={{ width: '1.2em', height: '1.2em' }}
                  />
                  <span className="ml-1">{formData.phoneCountryCode}</span>
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCountryDropdown && (
                <ul className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {countryCodes.map((country) => (
                    <li
                      key={country.code}
                      className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-teal-50 ${formData.phoneCountryCode === country.code ? 'bg-teal-100' : ''}`}
                      onClick={() => {
                        handleInputChange({ target: { id: 'phoneCountryCode', value: country.code } });
                        setShowCountryDropdown(false);
                      }}
                    >
                      <ReactCountryFlag countryCode={country.iso} svg style={{ width: '1.2em', height: '1.2em' }} />
                      <span>{country.name} ({country.code})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <InputField
              label="Phone Number"
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber ?? ""}
              onChange={handleInputChange}
              placeholder="e.g. 600 123 456"
            />
          </div>
        </div>
        <InputField
          label="Nationality"
          id="nationality"
          value={formData.nationality ?? ""}
          onChange={handleInputChange}
          placeholder="e.g. Moroccan"
        />
        <InputField
          label="Date of Birth"
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth ?? ""}
          onChange={handleInputChange}
        />
        <div className="md:col-span-2">
          <div className="relative">
            <textarea
              id="address"
              value={formData.address ?? ""}
              onChange={e => handleInputChange('address', e.target.value)}
              className="w-full px-4 py-3 pt-6 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm peer placeholder-transparent"
              placeholder="Enter your full address"
              rows={3}
            />
            <label
              htmlFor="address"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.address
                  ? 'top-2 text-xs text-teal-600 font-medium'
                  : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
                } peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 peer-focus:font-medium`}
            >
              Address
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;