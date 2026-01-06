import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ExportPanelProps {
  boardRef: React.RefObject<HTMLDivElement>;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ boardRef }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [lastExport, setLastExport] = useState<string | null>(null);

  const exportAsImage = async () => {
    if (!boardRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(boardRef.current, {
        backgroundColor: '#1a1f2e',
        pixelRatio: 2,
      });
      
      setLastExport(dataUrl);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `tactics-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success('Formation exported!');
    } catch (error) {
      toast.error('Failed to export image');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const shareImage = async () => {
    if (!boardRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(boardRef.current, {
        backgroundColor: '#1a1f2e',
        pixelRatio: 2,
      });
      
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'tactics.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Football Tactics',
          text: 'Check out my formation!',
          files: [file],
        });
        toast.success('Shared successfully!');
      } else {
        // Fallback to copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        toast.success('Image copied to clipboard!');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share');
        console.error(error);
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-panel p-4 space-y-4">
        <h3 className="font-display font-semibold text-foreground">Export & Share</h3>
        
        <p className="text-sm text-muted-foreground">
          Export your formation as an image to save or share with your team.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={exportAsImage}
            disabled={isExporting}
            className="action-button-primary"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          
          <Button
            onClick={shareImage}
            disabled={isExporting}
            className="action-button-secondary"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      {lastExport && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 space-y-3"
        >
          <div className="flex items-center gap-2 text-success">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Last export preview</span>
          </div>
          <img 
            src={lastExport} 
            alt="Last export" 
            className="w-full rounded-lg border border-border"
          />
        </motion.div>
      )}
    </div>
  );
};
