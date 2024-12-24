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
        const formData = new FormData(e.currentTarget);
        const formationData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            content: formData.get('content') as string,
            price: Number(formData.get('price')),
            duration: formData.get('duration') as string,
            level: formData.get('level') as Formation['level'],
            status: formData.get('status') as Formation['status'],
        };

        if (selectedFormation) {
            updateMutation.mutate({
                id: selectedFormation.id,
                data: formationData,
            });
        } else {
            createMutation.mutate(formationData as FormationCreate);
        }
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
                    <DialogContent className="sm:max-w-[725px]">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedFormation
                                    ? 'Modifier la formation'
                                    : 'Nouvelle formation'}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedFormation
                                    ? 'Modifiez les informations de la formation'
                                    : 'Créez une nouvelle formation'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
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
                                    <Label htmlFor="content">Contenu</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        defaultValue={selectedFormation?.content}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Prix</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        defaultValue={selectedFormation?.price}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Durée</Label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        defaultValue={selectedFormation?.duration}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="level">Niveau</Label>
                                    <Select
                                        name="level"
                                        defaultValue={
                                            selectedFormation?.level || 'beginner'
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez un niveau" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">
                                                Débutant
                                            </SelectItem>
                                            <SelectItem value="intermediate">
                                                Intermédiaire
                                            </SelectItem>
                                            <SelectItem value="advanced">
                                                Avancé
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Statut</Label>
                                    <Select
                                        name="status"
                                        defaultValue={
                                            selectedFormation?.status || 'draft'
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez un statut" />
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
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit">
                                    {selectedFormation ? 'Modifier' : 'Créer'}
                                </Button>
                            </DialogFooter>
                        </form>
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
