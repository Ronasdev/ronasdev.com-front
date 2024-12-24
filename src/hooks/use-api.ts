import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface UseApiOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    enabled?: boolean;
}

export function useApi(key: string | string[], queryFn: () => Promise<any>, options: UseApiOptions = {}) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { onSuccess, onError, enabled = true } = options;

    const query = useQuery({
        queryKey: Array.isArray(key) ? key : [key],
        queryFn,
        enabled,
        onSuccess: (data) => {
            onSuccess?.(data);
        },
        onError: (error: Error) => {
            toast({
                title: 'Erreur',
                description: error.message,
                variant: 'destructive',
            });
            onError?.(error);
        },
    });

    return query;
}

interface UseMutationOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
    successMessage?: string;
}

export function useApiMutation(
    mutationFn: (data: any) => Promise<any>,
    options: UseMutationOptions = {}
) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { onSuccess, onError, invalidateQueries = [], successMessage } = options;

    const mutation = useMutation({
        mutationFn,
        onSuccess: (data) => {
            if (successMessage) {
                toast({
                    title: 'Succès',
                    description: successMessage,
                });
            }

            // Invalider les queries nécessaires
            invalidateQueries.forEach((query) => {
                queryClient.invalidateQueries({ queryKey: [query] });
            });

            onSuccess?.(data);
        },
        onError: (error: Error) => {
            toast({
                title: 'Erreur',
                description: error.message,
                variant: 'destructive',
            });
            onError?.(error);
        },
    });

    return mutation;
}
