// File: components/InputBox/index.tsx
import  { useState, useContext } from 'react';
import Transcoder from './ui/Transcripttranscoder';
import Youtubetranscoder from './ui/Youtubetranscoder';
import { DataContext } from '@/Context/Context';
import toast from 'react-hot-toast';
import FileUploader from './InputBox/FileUploader';
import OptionSelector from './InputBox/OptionSelector';
import ActionButtons from './InputBox/ActionButtons';
import { generateKey } from '@/utils/helpers';
import { Input } from "@/components/ui/input"

function InputBox() {
  const [selectedOption, setSelectedOption] = useState('Video');
  const { final, setFinal, key, summary } = useContext(DataContext);
  const [files, setFiles] = useState<File | null | undefined>(null);
  const [name,setname]=useState<string>("");
  const handleFileUpload = (file: File | null | undefined) => {
    setFiles(file);
  };
  

  const handleAdd = () => {
    if (final) {
      toast.error("Please analyze your data first before adding new input.");
      return;
    }
    if (selectedOption !== 'Text') {
      if (selectedOption === 'YoutubeUrl') {
        setFinal({name:name, type: selectedOption, key: generateKey(selectedOption),"summary": summary });
      } else {
        if (!files) {
          toast.error("Please upload a file first.");
          return;
        }
        setFinal({name:name, type: selectedOption, key: generateKey(selectedOption), summary: files });
      }
    } else {
      if (!summary || !key) {
        toast.error("Please provide both key and summary for Text input.");
        return;
      }
      setFinal({name:name, type: selectedOption, key:generateKey(selectedOption), summary });
    }
    toast.success("Input added successfully!");
  };

  const handleClear = () => {
    setFiles(null);
    setFinal(null);
    toast.success("Cleared successfully!");
  };

  return (
    <div className='w-80 border p-4 m-3 rounded-3xl shadow-md bg-white'>
      <h1 className='text-3xl font-bold mb-2'>Input</h1>
      <Input type="text" placeholder="Name" onChange={(e)=>setname(e.target.value)} value={name} required />
      <hr className="mb-3" />
      <OptionSelector selectedOption={selectedOption} onChange={setSelectedOption} />
      <hr className='mb-3' />

      {selectedOption === "Text" ? (
        <Transcoder />
      ) : selectedOption === "YoutubeUrl" ? (
        <Youtubetranscoder />
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Input</h2>
          <FileUploader files={files} onFileUpload={handleFileUpload} />
        </>
      )}
      <ActionButtons onAdd={handleAdd} onClear={handleClear} />
    </div>
  );
}

export default InputBox;