import  { useContext, useState } from "react";
import axios from "axios";
import { FileUpload } from "@/components/ui/file-upload";
import { DataContext } from "@/Context/Context";

export default function FileUploadPage() {
  const { setFinal, setResponse } = useContext(DataContext);
  const [files, setFiles] = useState<File | null|undefined>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File | null|undefined) => {
    setFiles(file);
    console.log(file);
  };

  const handleAnalyze = async () => {
    if (!files) {
      alert("Please select a video file first.");
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", files);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/analyze-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Video analysis response:", response.data);
      const formattedResponse = response.data.analysis_result.split('\n').map((line: string) => {
        if (line.startsWith('*')) {
          return { type: 'bullet', text: line.replace('*', '').trim() };
        } else if (line.startsWith('#')) {
          return { type: 'heading', text: line.replace('#', '').trim() };
        } else {
          return { type: 'text', text: line.trim() };
        }
      });
      setResponse((prev: any) => [...prev, formattedResponse]);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to analyze video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
      <FileUpload onChange={handleFileUpload} files={files} setFiles={setFiles} />
      <div className="flex gap-2 mt-4">
        <button
          className="bg-black text-white p-2 rounded-4xl"
          onClick={() => setFinal([{ type: "Video", key: files?.name || "", summary: files }])}
          disabled={!files}
        >
          Add
        </button>
        <button className="bg-black text-white p-2 rounded-4xl" onClick={() => setFiles(null)}>
          Clear
        </button>
        <button className="bg-black text-white p-2 rounded-4xl" onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
