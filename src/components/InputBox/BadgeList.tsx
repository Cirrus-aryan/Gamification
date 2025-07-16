import React from 'react';

interface Props {
  isDarkMode: boolean;
}

const BadgeList: React.FC<Props> = ({ isDarkMode }) => (
  <div className="flex flex-wrap justify-center gap-3 mb-2">
    {[
      { icon: 'file-pdf', label: 'PDF' },
      { icon: 'file-word', label: 'DOC' },
      { icon: 'video', label: 'Video' },
      { icon: 'file-alt', label: 'Text' },
    ].map(({ icon, label }) => (
      <span
        key={label}
        className={`px-2 py-1 rounded-lg text-sm border ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} border-gray-300`}
      >
        <i className={`fas fa-${icon} mr-1`}></i> {label}
      </span>
    ))}
  </div>
);

export default BadgeList;
