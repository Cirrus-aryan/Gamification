import React from 'react';
import { formatFileSize } from '@/utils/helpers';

interface Props {
  file: File;
  onRemove: () => void;
}

const FilePreview: React.FC<Props> = ({ file, onRemove }) => (
  <div>
    <i className="fas fa-file-alt text-4xl mb-2 text-blue-500"></i>
    <p className="font-medium">{file.name}</p>
    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="mt-2 bg-red-100 text-red-700 px-4 py-1 rounded-xl text-sm hover:bg-red-200"
    >
      <i className="fas fa-times mr-2"></i> Remove
    </button>
  </div>
);

export default FilePreview;
