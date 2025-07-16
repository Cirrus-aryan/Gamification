import React, { type DragEvent, type ChangeEvent } from 'react';
import FilePreview from './FilePreview';
import BadgeList from './BadgeList';

interface Props {
  files: File | null | undefined;
  onFileUpload: (file: File | null | undefined) => void;
}

const FileUploader: React.FC<Props> = ({ files, onFileUpload }) => {
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles?.length) onFileUpload(droppedFiles[0]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles?.length) onFileUpload(uploadedFiles[0]);
  };

  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 mb-4 text-center cursor-pointer border-gray-300 hover:border-gray-400"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      {files ? (
        <FilePreview file={files} onRemove={() => onFileUpload(null)} />
      ) : (
        <>
          <i className="fas fa-cloud-upload-alt text-4xl mb-4 text-blue-500"></i>
          <p className="text-lg font-medium mb-2">Drag & drop your file here</p>
          <p className="text-sm text-gray-500 mb-4">or click to browse</p>
          <BadgeList isDarkMode={false} />
          <p className="text-xs text-gray-500 mt-2">Max file size: 100MB</p>
        </>
      )}
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt,.mp4,.mov,.avi"
      />
    </div>
  );
};

export default FileUploader;
