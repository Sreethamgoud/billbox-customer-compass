
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAlertMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createAlert = useMutation({
    mutationFn: async (alertData: {
      message: string;
      type: 'success' | 'warning' | 'error' | 'info';
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('alerts')
        .insert({
          ...alertData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create alert: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to mark alert as read: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      toast({
        title: "Success",
        description: "All alerts marked as read",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to mark alerts as read: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteAlert = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('alerts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete alert: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    createAlert,
    markAsRead,
    markAllAsRead,
    deleteAlert,
  };
};
