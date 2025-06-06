
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Create unique filename with user folder structure
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      console.log('Uploading file:', fileName);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 20, 90));
      }, 200);

      // Upload file to the bills bucket
      const { data, error } = await supabase.storage
        .from('bills')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      clearInterval(progressInterval);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      setUploadProgress(100);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('bills')
        .getPublicUrl(data.path);

      console.log('File uploaded successfully:', publicUrl);
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      return publicUrl;
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload Failed",
        description: error.message || 'Failed to upload file',
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteFile = async (filePath: string): Promise<boolean> => {
    try {
      // Extract just the path part from the full URL
      const pathMatch = filePath.match(/\/storage\/v1\/object\/public\/bills\/(.+)$/);
      const actualPath = pathMatch ? pathMatch[1] : filePath;

      const { error } = await supabase.storage
        .from('bills')
        .remove([actualPath]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error('Delete failed:', error);
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploadFile,
    deleteFile,
    isUploading,
    uploadProgress,
  };
};
