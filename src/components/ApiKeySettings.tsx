
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setGeminiApiKey } from '../utils/fakeNewsDetection';
import { toast } from "@/components/ui/use-toast";

const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(apiKey);
    toast({
      title: "API Key Saved",
      description: "The Gemini API key has been temporarily saved for this session.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Gemini API Settings</h3>
        <p className="text-sm text-muted-foreground">
          Enter your Gemini API key for fake news detection.
          Note: This is stored temporarily and will be cleared when you refresh the page.
        </p>
      </div>
      <div className="flex gap-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter Gemini API key"
          className="flex-1"
        />
        <Button type="submit">Save Key</Button>
      </div>
    </form>
  );
};

export default ApiKeySettings;
