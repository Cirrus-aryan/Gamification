import React from 'react';

interface Props {
  selectedOption: string;
  onChange: (value: string) => void;
}

const OptionSelector: React.FC<Props> = ({ selectedOption, onChange }) => {
  return (
    <div className='grid grid-cols-2 gap-2 mb-3'>
      {["Video", "Pdf", "Text", "YoutubeUrl"].map((option) => (
        <label
          key={option}
          className={`cursor-pointer flex justify-center items-center py-1 px-2 border-2 rounded-xl ${
            selectedOption === option ? 'bg-gray-300 border-black' : 'border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="DocType"
            value={option}
            checked={selectedOption === option}
            onChange={(e) => onChange(e.target.value)}
            className="hidden"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default OptionSelector;
