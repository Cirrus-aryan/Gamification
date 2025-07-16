// components/ProcessingPage/SettingsDialog.tsx

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SettingsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  setOpen,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SettingsOutlinedIcon className="mr-1" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Configuration</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
          </TabsList>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-sm font-semibold mb-1">Choose Language</h2>
                <Select
                  value={selectedLanguage}
                  onValueChange={(value) => setSelectedLanguage(value)}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                                        <SelectItem value="Malayalam">Malayalam</SelectItem>
                                        <SelectItem value="Tamil">Tamil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Add more settings here as needed */}
            </div>
          </TabsContent>

          {/* Uploads Tab */}
          <TabsContent value="uploads">
            <ScrollArea className="h-64 pr-4">
              <div className="space-y-2">
                {/* Placeholder for recent uploads – ideally you map this from state/context */}
                {["notes.pdf", "lecture.mp4", "sample.txt"].map((item, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "p-3 cursor-pointer transition-all hover:bg-muted rounded-lg"
                    )}
                  >
                    <p className="text-sm font-medium truncate">{item}</p>
                    <p className="text-xs text-gray-500">Modified: Today</p>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
