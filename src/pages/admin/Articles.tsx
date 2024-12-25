// Page de gestion des articles pour l'administration du blog
// Permet de lister, créer, modifier et supprimer des articles

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
import articleService, { Article, ArticleCreate } from '@/services/articleService';
import { MoreHorizontal, Plus } from 'lucide-react';

/**
 * Page de gestion des articles pour l'administration du blog
 * 
 * Fonctionnalités principales :
 * - Lister tous les articles
 * - Rechercher des articles
 * - Créer de nouveaux articles
 * - Modifier des articles existants
 * - Supprimer des articles
 * - Changer le statut des articles
 * 
 * @returns {JSX.Element} Composant de gestion des articles
 */
export default function Articles() {
    // État pour la recherche et la sélection d'articles
    const [search, setSearch] = useState('');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Hook de notification
    const { toast } = useToast();

    // Récupération de la liste des articles
    const { data: articles, isLoading } = useApi('articles', () =>
        articleService.getAll()
    );

    // Mutation pour créer un nouvel article
    const createMutation = useApiMutation(
        (data: ArticleCreate) => articleService.create(data),
        {
            onSuccess: () => {
                // Fermeture du dialogue et notification de succès
                setIsDialogOpen(false);
                toast({
                    title: 'Article créé',
                    description: "L'article a été créé avec succès.",
                });
            },
            // Invalidation du cache pour mettre à jour la liste des articles
            invalidateQueries: ['articles'],
        }
    );

    // Mutation pour mettre à jour un article existant
    const updateMutation = useApiMutation(
        ({ id, data }: { id: number; data: Partial<ArticleCreate> }) =>
            articleService.update(id, data),
        {
            onSuccess: () => {
                // Fermeture du dialogue et notification de succès
                setIsDialogOpen(false);
                toast({
                    title: 'Article mis à jour',
                    description: "L'article a été mis à jour avec succès.",
                });
            },
            // Invalidation du cache pour mettre à jour la liste des articles
            invalidateQueries: ['articles'],
        }
    );

    // Mutation pour supprimer un article
    const deleteMutation = useApiMutation(
        (id: number) => articleService.delete(id),
        {
            onSuccess: () => {
                // Notification de suppression réussie
                toast({
                    title: 'Article supprimé',
                    description: "L'article a été supprimé avec succès.",
                });
            },
            // Invalidation du cache pour mettre à jour la liste des articles
            invalidateQueries: ['articles'],
        }
    );

    // Mutation pour changer le statut d'un article
    const updateStatusMutation = useApiMutation(
        ({ id, status }: { id: number; status: Article['status'] }) =>
            articleService.updateStatus(id, status),
        {
            onSuccess: () => {
                // Notification de mise à jour du statut
                toast({
                    title: 'Statut mis à jour',
                    description: "Le statut de l'article a été mis à jour avec succès.",
                });
            },
            // Invalidation du cache pour mettre à jour la liste des articles
            invalidateQueries: ['articles'],
        }
    );

    /**
     * Gère la soumission du formulaire de création/modification d'article
     * @param e Événement de soumission du formulaire
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // Extraction des données du formulaire
        const articleData = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            excerpt: formData.get('excerpt') as string,
            category: formData.get('category') as string,
            status: formData.get('status') as Article['status'],
        };

        // Détermine s'il s'agit d'une création ou d'une mise à jour
        if (selectedArticle) {
            // Mise à jour d'un article existant
            updateMutation.mutate({
                id: selectedArticle.id,
                data: articleData,
            });
        } else {
            // Création d'un nouvel article
            createMutation.mutate(articleData as ArticleCreate);
        }
    };

    // Filtrage des articles en fonction de la recherche
    const filteredArticles = articles?.filter(
        (article) =>
            article.title.toLowerCase().includes(search.toLowerCase()) ||
            article.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* En-tête de la page de gestion des articles */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
                    <p className="text-muted-foreground">
                        Gérez les articles de votre blog
                    </p>
                </div>

                {/* Dialogue de création/modification d'article */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                // Réinitialisation de l'article sélectionné lors de l'ouverture du dialogue
                                setSelectedArticle(null);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Nouvel article
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <form onSubmit={handleSubmit}>
                            {/* En-tête du dialogue */}
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedArticle 
                                        ? 'Modifier un article' 
                                        : 'Créer un nouvel article'}
                                </DialogTitle>
                                <DialogDescription>
                                    {selectedArticle 
                                        ? 'Modifiez les détails de votre article' 
                                        : 'Créez un nouvel article pour votre blog'}
                                </DialogDescription>
                            </DialogHeader>

                            {/* Contenu du formulaire */}
                            <div className="grid gap-4 py-4">
                                {/* Champ de titre */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Titre
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        defaultValue={selectedArticle?.title}
                                        className="col-span-3"
                                        required
                                    />
                                </div>

                                {/* Champ d'extrait */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="excerpt" className="text-right">
                                        Extrait
                                    </Label>
                                    <Textarea
                                        id="excerpt"
                                        name="excerpt"
                                        defaultValue={selectedArticle?.excerpt}
                                        className="col-span-3"
                                        required
                                    />
                                </div>

                                {/* Champ de contenu */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="content" className="text-right">
                                        Contenu
                                    </Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        defaultValue={selectedArticle?.content}
                                        className="col-span-3 min-h-[200px]"
                                        required
                                    />
                                </div>

                                {/* Sélection de catégorie */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Catégorie
                                    </Label>
                                    <Select 
                                        name="category"
                                        defaultValue={selectedArticle?.category}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tech">Technologie</SelectItem>
                                            <SelectItem value="dev">Développement</SelectItem>
                                            <SelectItem value="design">Design</SelectItem>
                                            <SelectItem value="autre">Autre</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Sélection du statut */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">
                                        Statut
                                    </Label>
                                    <Select 
                                        name="status"
                                        defaultValue={selectedArticle?.status || 'draft'}
                                    >
                                        <SelectTrigger className="col-span-3">
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

                            {/* Pied de page du dialogue */}
                            <DialogFooter>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit">
                                    {selectedArticle ? 'Mettre à jour' : 'Créer'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Barre de recherche */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Rechercher un article..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            {/* Tableau des articles */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des articles</CardTitle>
                    <CardDescription>
                        Tous les articles de votre blog
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        {/* En-tête du tableau */}
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Date de création</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* Corps du tableau */}
                        <TableBody>
                            {isLoading ? (
                                // État de chargement
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Chargement des articles...
                                    </TableCell>
                                </TableRow>
                            ) : filteredArticles?.length === 0 ? (
                                // Aucun article trouvé
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Aucun article trouvé
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Liste des articles
                                filteredArticles?.map((article) => (
                                    <TableRow key={article.id}>
                                        <TableCell>{article.title}</TableCell>
                                        <TableCell>{article.category}</TableCell>
                                        <TableCell>
                                            <span 
                                                className={`px-2 py-1 rounded text-xs ${
                                                    article.status === 'published' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : article.status === 'draft' 
                                                        ? 'bg-yellow-100 text-yellow-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {article.status === 'published' 
                                                    ? 'Publié' 
                                                    : article.status === 'draft' 
                                                    ? 'Brouillon' 
                                                    : 'Archivé'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Ouvrir le menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    
                                                    {/* Action de modification */}
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedArticle(article);
                                                            setIsDialogOpen(true);
                                                        }}
                                                    >
                                                        Modifier
                                                    </DropdownMenuItem>

                                                    {/* Actions de statut */}
                                                    {article.status !== 'published' && (
                                                        <DropdownMenuItem
                                                            onClick={() => 
                                                                updateStatusMutation.mutate({
                                                                    id: article.id,
                                                                    status: 'published'
                                                                })
                                                            }
                                                        >
                                                            Publier
                                                        </DropdownMenuItem>
                                                    )}

                                                    {article.status !== 'draft' && (
                                                        <DropdownMenuItem
                                                            onClick={() => 
                                                                updateStatusMutation.mutate({
                                                                    id: article.id,
                                                                    status: 'draft'
                                                                })
                                                            }
                                                        >
                                                            Mettre en brouillon
                                                        </DropdownMenuItem>
                                                    )}

                                                    {article.status !== 'archived' && (
                                                        <DropdownMenuItem
                                                            onClick={() => 
                                                                updateStatusMutation.mutate({
                                                                    id: article.id,
                                                                    status: 'archived'
                                                                })
                                                            }
                                                        >
                                                            Archiver
                                                        </DropdownMenuItem>
                                                    )}

                                                    {/* Action de suppression */}
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={() => 
                                                            deleteMutation.mutate(article.id)
                                                        }
                                                    >
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
