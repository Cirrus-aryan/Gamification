import { useState, useContext, useEffect, useCallback } from "react";
import { DataContext } from "@/Context/Context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import SoundBLOG from "./Page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AudioFile {
    filename: string;
    s3_url: string;
    segment_key: string;
    title: string;
}

function AudioBook() {
    const { Analysis, musicplaylists, setmusicplaylists,musicplaylistslanguage,setmusicplaylistslanguage } =
        useContext(DataContext);
    const [selectedResult, setSelectedResult] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Track which playlist is displayed
const allLanguages = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "japanese", label: "Japanese" },
  { value: "malayalam", label: "Malayalam" },
  { value: "tamil", label: "Tamil" },
  { value: "mandarin", label: "Mandarin Chinese" },
  { value: "arabic", label: "Arabic" },
  { value: "bengali", label: "Bengali" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
  { value: "urdu", label: "Urdu" },
  { value: "indonesian", label: "Indonesian" },
  { value: "korean", label: "Korean" },
  { value: "turkish", label: "Turkish" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "italian", label: "Italian" },
  { value: "marathi", label: "Marathi" },
  { value: "telugu", label: "Telugu" },
  { value: "cantonese", label: "Cantonese" },
  { value: "thai", label: "Thai" },
  { value: "polish", label: "Polish" },
  { value: "ukrainian", label: "Ukrainian" },
  { value: "gujarati", label: "Gujarati" },
  { value: "kannada", label: "Kannada" },
  { value: "swahili", label: "Swahili" },
  { value: "amharic", label: "Amharic" },
  { value: "hausa", label: "Hausa" },
  { value: "yoruba", label: "Yoruba" },
  
  { value: "afrikaans", label: "Afrikaans" },
  { value: "dutch", label: "Dutch" },
  { value: "swedish", label: "Swedish" },
  { value: "danish", label: "Danish" },
  { value: "norwegian", label: "Norwegian" },
  { value: "finnish", label: "Finnish" },
  { value: "greek", label: "Greek" },
  { value: "romanian", label: "Romanian" },
  { value: "czech", label: "Czech" },
  { value: "slovak", label: "Slovak" },
  { value: "hungarian", label: "Hungarian" },
  { value: "serbian", label: "Serbian" },
  { value: "croatian", label: "Croatian" },
  { value: "bulgarian", label: "Bulgarian" },
  { value: "albanian", label: "Albanian" },
  { value: "lithuanian", label: "Lithuanian" },
  { value: "latvian", label: "Latvian" },
  { value: "estonian", label: "Estonian" },
  { value: "irish", label: "Irish" },
  { value: "welsh", label: "Welsh" },
  { value: "quechua", label: "Quechua" },
  { value: "guarani", label: "Guaraní" },
  { value: "nahuatl", label: "Nahuatl" },
  { value: "aymara", label: "Aymara" },
  { value: "cree", label: "Cree" },
  { value: "inuktitut", label: "Inuktitut" },
  { value: "tok_pisin", label: "Tok Pisin" },
  { value: "maori", label: "Maori" },
  { value: "samoan", label: "Samoan" },
  { value: "fijian", label: "Fijian" },
  { value: "filipino", label: "Filipino (Tagalog)" },
  { value: "burmese", label: "Burmese" },
  { value: "khmer", label: "Khmer" },
  { value: "lao", label: "Lao" },
  { value: "nepali", label: "Nepali" },
  { value: "sinhala", label: "Sinhala" },
  { value: "uzbek", label: "Uzbek" },
  { value: "kazakh", label: "Kazakh" },
  { value: "azerbaijani", label: "Azerbaijani" },
  { value: "persian", label: "Persian (Farsi)" },
  { value: "punjabi", label: "Punjabi" },
  { value: "javanese", label: "Javanese" },
  { value: "sundanese", label: "Sundanese" },
  { value: "hebrew", label: "Hebrew" },
  { value: "pashto", label: "Pashto" },
  { value: "kurdish", label: "Kurdish" },
  { value: "georgian", label: "Georgian" },
  { value: "armenian", label: "Armenian" },
  { value: "mongolian", label: "Mongolian" },
  { value: "tatar", label: "Tatar" },
  { value: "tibetan", label: "Tibetan" },
  { value: "uyghur", label: "Uyghur" },
  { value: "zhuang", label: "Zhuang" },
  { value: "akan", label: "Akan" },
  { value: "ganda", label: "Ganda" },
  { value: "kinyarwanda", label: "Kinyarwanda" },
  { value: "kirundi", label: "Kirundi" },
  { value: "lingala", label: "Lingala" },
  { value: "luganda", label: "Luganda" },
  { value: "nko", label: "N'Ko" },
  { value: "sotho", label: "Sotho" },
  { value: "tigrinya", label: "Tigrinya" },
  { value: "tsonga", label: "Tsonga" },
  { value: "venda", label: "Venda" },
  // Add more as needed, remembering the balance between comprehensiveness and UI usability
];

    useEffect(() => {
        console.log("Current musicplaylists:", musicplaylists);
    }, [musicplaylists]);

    const createAudioBook = useCallback(async () => {
        if (!selectedResult) {
            setError("Please select a data source to create an audio book.");
            return;
        }
        setIsLoading(true);
        setError(null);

        const formdata = new FormData();
        const data = Analysis.find((item: any) => item.key === selectedResult);

        if (!data) {
            setError("Selected data source not found for audio book creation.");
            setIsLoading(false);
            return;
        }

        formdata.append("summary", JSON.stringify(data));
        formdata.append("Key",selectedResult)
        formdata.append("language", musicplaylistslanguage);

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_PORT || "http://localhost:8000";
            const response = await axios.post(`${apiUrl}/CreateAudioBook`, formdata);

            const fetchedAudioFiles: AudioFile[] =
                response.data.audio_file_path.audio_files || [];
            console.log(response);

            setmusicplaylists([
                { data: data, musicfiles: fetchedAudioFiles,language:musicplaylistslanguage },
                ...musicplaylists,
            ]);
            setCurrentIndex(0); // Show the newly created audiobook
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.detail || "Failed to create audio book."
                );
            } else {
                setError("An unexpected error occurred while creating audio book.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [
        Analysis,
        selectedResult,
        musicplaylistslanguage,
        setmusicplaylists,
        musicplaylists,
    ]);

    useEffect(() => {
        console.log(musicplaylists);
    }, [musicplaylists]);

    // Deletion function
    const deletePlaylist = (index: number) => {
        const updated = musicplaylists.filter((_, i) => i !== index);
        setmusicplaylists(updated);
        // Adjust currentIndex if needed
        if (currentIndex === index) {
            setCurrentIndex(0);
        } else if (currentIndex > index) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const currentAudiobookFiles =
        musicplaylists.length > 0
            ? musicplaylists[currentIndex].musicfiles
            : [];

    return (
        <Card className="bg-white m-2 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
            <CardContent className="p-0">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Create Audio Book
                </h2>
                <div className="flex flex-row justify-between flex-wrap w-full">
                    <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <Label
                        htmlFor="data-select"
                        className="text-base font-medium flex-shrink-0"
                    >
                        Select Data Source:
                    </Label>
                    <Select value={selectedResult} onValueChange={setSelectedResult}>
                        <SelectTrigger id="data-select" className="w-full sm:w-[250px]">
                            <SelectValue placeholder="Choose a processed data" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Processed Data</SelectLabel>
                                {Analysis.map((val: any) => (
                                    <SelectItem key={val.key} value={val.key}>
                                        {val.name} - ({val.type})
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Select
                        value={musicplaylistslanguage}
                        onValueChange={(value) => setmusicplaylistslanguage(value)}
                    >
                        <SelectTrigger className="w-64">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <ScrollArea className="h-[200px] w-full">
                                {allLanguages
                                    .sort((a, b) => a.label.localeCompare(b.label))
                                    .map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 rounded-lg whitespace-nowrap cursor-pointer w-full sm:w-auto"
                        onClick={createAudioBook}
                        disabled={!selectedResult || isLoading}
                    >
                        <i className="fas fa-headphones mr-2"></i>
                        {isLoading ? "Processing..." : "Create Audio Book"}
                    </Button>
                </div>

                </div>
                {error && (
                    <p className="text-center text-red-500 mt-4 text-sm sm:text-base">
                        Error: {error}
                    </p>
                )}

                {/* Display the SoundBLOG player if there are audio files */}
                {currentAudiobookFiles.length > 0 && (
                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">
                                Generated Audiobook
                            </h3>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deletePlaylist(currentIndex)}
                            >
                                Delete This Audiobook
                            </Button>
                        </div>
                        <SoundBLOG audioFiles={currentAudiobookFiles} />
                    </div>
                )}
                <Separator className="my-6" />

                {/* Optionally, display a list of all created audiobooks from musicplaylists */}
                {musicplaylists.length > 1 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">
                            Previous Audiobooks
                        </h3>
                        <div className="space-y-4">
                            {musicplaylists.map((playlistItem, index) =>
                                index !== currentIndex ? (
                                    <Card key={index} className="p-4 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-lg mb-2">
                                                    {playlistItem.data.name}-{playlistItem?.language}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    Chapters: {playlistItem.musicfiles.length}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setCurrentIndex(index)}
                                                >
                                                    Play this Audiobook
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => deletePlaylist(index)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ) : null
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default AudioBook;
