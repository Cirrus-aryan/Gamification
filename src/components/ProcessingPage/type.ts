// components/ProcessingPage/types.ts
export type FinalType = {
  name: any;
  type: "Video" | "Pdf" | "Text" | "YoutubeUrl";
  key: string;
  summary: string | File;
};

export type FormattedResponseItem = {
  section: any;
  mainheading: any;
  type: "text" | "bullet" | "heading" | "Underline";
  text: string;
};
