import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApi, useApiMutation } from '@/hooks/use-api';
import formationService, {
    Formation,
    FormationCreate,
} from '@/services/formationService';
import { MoreHorizontal, Plus } from 'lucide-react';

export default function Formations() {
    const [search, setSearch] = useState('');
    const [selectedFormation, setSelectedFormation] = useState<Formation | null>(
        null
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { toast } = useToast();

    // Récupération des formations
    const { data: formations, isLoading } = useApi('formations', () =>
        formationService.getAll()
    );

    // Mutation pour créer une formation
    const createMutation = useApiMutation(
        (data: FormationCreate) => formationService.create(data),
        {
            onSuccess: () => {
                setIsDialogOpen(false);
                toast({
                    title: 'Formation créée',
                    description: 'La formation a été créée avec succès.',
                });
            },
            invalidateQueries: ['formations'],
        }
    );

    // Mutation pour mettre à jour une formation
    const updateMutation = useApiMutation(
        ({ id, data }: { id: number; data: Partial<FormationCreate> }) =>
            formationService.update(id, data),
        {
            onSuccess: () => {
                setIsDialogOpen(false);
                toast({
                    title: 'Formation mise à jour',
                    description: 'La formation a été mise à jour avec succès.',
                });
            },
            invalidateQueries: ['formations'],
        }
    );

    // Mutation pour supprimer une formation
    const deleteMutation = useApiMutation(
        (id: number) => formationService.delete(id),
        {
            onSuccess: () => {
                toast({
                    title: 'Formation supprimée',
                    description: 'La formation a été supprimée avec succès.',
                });
            },
            invalidateQueries: ['formations'],
        }
    );

    // Mutation pour changer le statut d'une formation
    const updateStatusMutation = useApiMutation(
        ({ id, status }: { id: number; status: Formation['status'] }) =>
            formationService.updateStatus(id, status),
        {
            onSuccess: () => {
                toast({
                    title: 'Statut mis à jour',
                    description: 'Le statut de la formation a été mis à jour avec succès.',
                });
            },
            invalidateQueries: ['formations'],
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        const formationData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            content: formData.get('content') as string,
            price: Number(formData.get('price')),
            duration: Number(formData.get('duration')),
            level: formData.get('level') as Formation['level'],
            status: formData.get('status') as Formation['status'],
            max_participants: Number(formData.get('max_participants') || 0),
            start_date: formData.get('start_date') as string,
        };

        if (selectedFormation) {
            updateMutation.mutate({
                id: selectedFormation.id,
                data: formationData,
            });
        } else {
            createMutation.mutate(formationData as FormationCreate);
        }
        setIsDialogOpen(false);
    };

    const filteredFormations = formations?.filter(
        (formation) =>
            formation.title.toLowerCase().includes(search.toLowerCase()) ||
            formation.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Formations
                    </h2>
                    <p className="text-muted-foreground">
                        Gérez vos formations en ligne
                    </p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                setSelectedFormation(null);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle formation
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedFormation ? 'Modifier la formation' : 'Nouvelle formation'}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedFormation
                                    ? 'Modifiez les informations de la formation'
                                    : 'Créez une nouvelle formation'}
                            </DialogDescription>
                        </DialogHeader>
                        <form 
                            onSubmit={handleSubmit} 
                            id="formation-form" 
                            className="space-y-4 overflow-y-auto max-h-[60vh] pr-2"
                        >
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Titre</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        defaultValue={selectedFormation?.title}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={selectedFormation?.description}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="content">Contenu détaillé</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        defaultValue={selectedFormation?.content}
                                        placeholder="Détails complets de la formation..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Prix</Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            defaultValue={selectedFormation?.price}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="duration">Durée (heures)</Label>
                                        <Input
                                            id="duration"
                                            name="duration"
                                            type="number"
                                            defaultValue={selectedFormation?.duration}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="level">Niveau</Label>
                                        <Select 
                                            name="level"
                                            defaultValue={selectedFormation?.level}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez un niveau" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="beginner">Débutant</SelectItem>
                                                <SelectItem value="intermediate">Intermédiaire</SelectItem>
                                                <SelectItem value="advanced">Avancé</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Statut</Label>
                                        <Select 
                                            name="status"
                                            defaultValue={selectedFormation?.status}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez un statut" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Brouillon</SelectItem>
                                                <SelectItem value="published">Publié</SelectItem>
                                                <SelectItem value="archived">Archivé</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="max_participants">Nombre max de participants</Label>
                                    <Input
                                        id="max_participants"
                                        name="max_participants"
                                        type="number"
                                        defaultValue={selectedFormation?.max_participants || ''}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="start_date">Date de début</Label>
                                    <Input
                                        id="start_date"
                                        name="start_date"
                                        type="date"
                                        defaultValue={selectedFormation?.start_date ? 
                                            new Date(selectedFormation.start_date).toISOString().split('T')[0] : 
                                            ''
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                        <DialogFooter className="sticky bottom-0 bg-white py-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" form="formation-form">
                                {selectedFormation ? 'Modifier' : 'Créer'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Liste des formations</CardTitle>
                            <CardDescription>
                                {formations?.length} formations au total
                            </CardDescription>
                        </div>
                        <Input
                            placeholder="Rechercher une formation..."
                            className="max-w-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead>Niveau</TableHead>
                                <TableHead>Durée</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFormations?.map((formation) => (
                                <TableRow key={formation.id}>
                                    <TableCell>{formation.title}</TableCell>
                                    <TableCell>
                                        {formation.price.toLocaleString('fr-FR', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {formation.level === 'beginner'
                                            ? 'Débutant'
                                            : formation.level === 'intermediate'
                                            ? 'Intermédiaire'
                                            : 'Avancé'}
                                    </TableCell>
                                    <TableCell>{formation.duration}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={formation.status}
                                            onValueChange={(value) =>
                                                updateStatusMutation.mutate({
                                                    id: formation.id,
                                                    status: value as Formation['status'],
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">
                                                    Brouillon
                                                </SelectItem>
                                                <SelectItem value="published">
                                                    Publié
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSelectedFormation(
                                                            formation
                                                        );
                                                        setIsDialogOpen(true);
                                                    }}
                                                >
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() =>
                                                        deleteMutation.mutate(
                                                            formation.id
                                                        )
                                                    }
                                                >
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
