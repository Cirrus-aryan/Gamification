// components/ProcessingPage/AnalyzeService.ts
import axios from "axios";
import toast from "react-hot-toast";
import type { FinalType, FormattedResponseItem } from "./type";

export async function analyzeContent(
  final: FinalType,
  language: string,
  setAnalysis:(val:any)=>void
): Promise<FormattedResponseItem[] | null> {

  if (!final) {
    toast.error("No data to process.");
    return null;
  }

  try {
    toast.success("Processing started...");

    const formData = new FormData();
    const url = getEndpoint(final.type);

    if (final.type === "YoutubeUrl") {
      formData.append("video_url", final.summary as string);
    } else {
      formData.append("type", final.type);
      formData.append("key", final.name);
      formData.append("summary", final.summary);
    }

    formData.append("language", language);
    const res = await axios.post(url, formData);

    const rawOutput = res.data.analysis_result;
    setAnalysis((val:any)=>([{
      key:final.key,
      link:res.data.link,
      name:final.name,
      summary:final.summary,
      analysis_result:res.data.analysis_result,
      type:final.type,
      "language":language
     },...val]))
    return rawOutput;
  } catch (error) {
    console.error(error);
    toast.error("Processing failed.");
    return null;
  }
}

function getEndpoint(type: FinalType["type"]) {
  switch (type) {
    case "Video":
      return `${import.meta.env.VITE_BACKEND_PORT}/Video`;
    case "Pdf":
      return `${import.meta.env.VITE_BACKEND_PORT}/Pdf`;
    case "Text":
      return `${import.meta.env.VITE_BACKEND_PORT}/Text`;
    case "YoutubeUrl":
      return `${import.meta.env.VITE_BACKEND_PORT}/analyze-youtube`;
    default:
      throw new Error("Unsupported content type");
  }
}

export function formatResponse(raw: string): FormattedResponseItem[] {
  return raw
    .split("\n")
    .map((line: string) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("*"))
        return { type: "bullet", text: trimmed.slice(1).trim() };
      if (trimmed.startsWith("#"))
        return { type: "heading", text: trimmed.slice(1).trim() };
      if (trimmed.startsWith("**"))
        return { type: "Underline", text: trimmed.slice(2).trim() };
      return { type: "text", text: trimmed };
    })
    .filter(Boolean) as FormattedResponseItem[];
}
