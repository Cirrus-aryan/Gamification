// components/ProcessingPage/PreviewSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PreviewProps {
  final:any;
}

const PreviewSection: React.FC<PreviewProps> = ({ final }) => {
  if (!final) return <div className="text-gray-400 p-4">No input provided yet.</div>;

  if (final.type === "Text") {
    return (
      <div className="p-2">
        <div className="font-bold text-lg">Key:</div>
        <div className="mb-2">{final.key}</div>
        <div className="font-bold text-lg">Text:</div>
        <div>{final.summary as string}</div>
      </div>
    );
  }

  if (final.type === "YoutubeUrl") {
    return <div className="border-1 rounded-2xl w-full p-2">{final.summary as string}</div>;
  }

  const file = final.summary as File;

  return (
    <motion.div
      layoutId={`file-upload-${file.name}`}
      className={cn(
        "relative overflow-hidden bg-white dark:bg-neutral-900",
        "flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full rounded-md shadow-sm"
      )}
    >
      <div className="flex justify-between w-full items-center gap-4">
        <motion.p className="text-base truncate max-w-xs">{file.name}</motion.p>
        <motion.p className="rounded-lg px-2 flex py-1 w-fit text-sm shadow-input">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </motion.p>
      </div>
      <div className="flex text-sm mt-2 gap-4 text-neutral-600 dark:text-neutral-400">
        <motion.p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800">
          {file.type}
        </motion.p>
        <motion.p>Modified: {new Date(file.lastModified).toLocaleDateString()}</motion.p>
      </div>
    </motion.div>
  );
};

export default PreviewSection;
