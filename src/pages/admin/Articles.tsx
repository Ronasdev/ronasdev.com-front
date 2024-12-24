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

export default function Articles() {
    const [search, setSearch] = useState('');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { toast } = useToast();

    // Récupération des articles
    const { data: articles, isLoading } = useApi('articles', () =>
        articleService.getAll()
    );

    // Mutation pour créer un article
    const createMutation = useApiMutation(
        (data: ArticleCreate) => articleService.create(data),
        {
            onSuccess: () => {
                setIsDialogOpen(false);
                toast({
                    title: 'Article créé',
                    description: "L'article a été créé avec succès.",
                });
            },
            invalidateQueries: ['articles'],
        }
    );

    // Mutation pour mettre à jour un article
    const updateMutation = useApiMutation(
        ({ id, data }: { id: number; data: Partial<ArticleCreate> }) =>
            articleService.update(id, data),
        {
            onSuccess: () => {
                setIsDialogOpen(false);
                toast({
                    title: 'Article mis à jour',
                    description: "L'article a été mis à jour avec succès.",
                });
            },
            invalidateQueries: ['articles'],
        }
    );

    // Mutation pour supprimer un article
    const deleteMutation = useApiMutation(
        (id: number) => articleService.delete(id),
        {
            onSuccess: () => {
                toast({
                    title: 'Article supprimé',
                    description: "L'article a été supprimé avec succès.",
                });
            },
            invalidateQueries: ['articles'],
        }
    );

    // Mutation pour changer le statut d'un article
    const updateStatusMutation = useApiMutation(
        ({ id, status }: { id: number; status: Article['status'] }) =>
            articleService.updateStatus(id, status),
        {
            onSuccess: () => {
                toast({
                    title: 'Statut mis à jour',
                    description: "Le statut de l'article a été mis à jour avec succès.",
                });
            },
            invalidateQueries: ['articles'],
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const articleData = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            excerpt: formData.get('excerpt') as string,
            category: formData.get('category') as string,
            status: formData.get('status') as Article['status'],
        };

        if (selectedArticle) {
            updateMutation.mutate({
                id: selectedArticle.id,
                data: articleData,
            });
        } else {
            createMutation.mutate(articleData as ArticleCreate);
        }
    };

    const filteredArticles = articles?.filter(
        (article) =>
            article.title.toLowerCase().includes(search.toLowerCase()) ||
            article.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
                    <p className="text-muted-foreground">
                        Gérez les articles de votre blog
                    </p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                setSelectedArticle(null);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvel article
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[725px]">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedArticle
                                    ? "Modifier l'article"
                                    : 'Nouvel article'}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedArticle
                                    ? "Modifiez les informations de l'article"
                                    : 'Créez un nouvel article'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Titre</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        defaultValue={selectedArticle?.title}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="excerpt">Extrait</Label>
                                    <Textarea
                                        id="excerpt"
                                        name="excerpt"
                                        defaultValue={selectedArticle?.excerpt}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="content">Contenu</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        defaultValue={selectedArticle?.content}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Catégorie</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        defaultValue={selectedArticle?.category}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Statut</Label>
                                    <Select
                                        name="status"
                                        defaultValue={
                                            selectedArticle?.status || 'draft'
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
                                    {selectedArticle ? 'Modifier' : 'Créer'}
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
                            <CardTitle>Liste des articles</CardTitle>
                            <CardDescription>
                                {articles?.length} articles au total
                            </CardDescription>
                        </div>
                        <Input
                            placeholder="Rechercher un article..."
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
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Date de création</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredArticles?.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>{article.category}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={article.status}
                                            onValueChange={(value) =>
                                                updateStatusMutation.mutate({
                                                    id: article.id,
                                                    status: value as Article['status'],
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
                                    <TableCell>
                                        {new Date(
                                            article.created_at
                                        ).toLocaleDateString()}
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
                                                        setSelectedArticle(article);
                                                        setIsDialogOpen(true);
                                                    }}
                                                >
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() =>
                                                        deleteMutation.mutate(
                                                            article.id
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
