
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLessons = (subjectId?: string) => {
  return useQuery({
    queryKey: ['lessons', subjectId],
    queryFn: async () => {
      let query = supabase
        .from('lessons')
        .select(`
          *,
          subjects (
            name,
            color
          )
        `)
        .order('created_at');
      
      if (subjectId) {
        query = query.eq('subject_id', subjectId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
};
