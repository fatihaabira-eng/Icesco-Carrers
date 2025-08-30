import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  placeholder, 
  onChange, 
  disabled = false 
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 pt-7 pb-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm peer placeholder-transparent ${
          disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''
        }`}
        placeholder={placeholder || " "}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          value || type === 'date' 
            ? 'top-2 text-xs text-teal-600 font-medium' 
            : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
        } peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 peer-focus:font-medium ${
          disabled ? 'text-gray-400' : ''
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;