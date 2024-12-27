import React, { useState, useEffect, useMemo } from 'react';
import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { 
    FaPlus, 
    FaEdit, 
    FaTrash, 
    FaSearch, 
    FaFileImage 
} from 'react-icons/fa';

import articleService, { Article } from '@/services/articleService';
import categoryService, { Category } from '@/services/categoryService';

// URL de base pour les images
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Page d'administration des articles
 * Permet de gérer la liste des articles, leur création, modification et suppression
 */
const ArticlesAdminPage: React.FC = () => {
    // États pour la gestion des articles et catégories
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    
    // États pour la pagination et la recherche
    const [totalArticles, setTotalArticles] = useState(0);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // États pour la sélection et le formulaire d'article
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [articleForm, setArticleForm] = useState<Partial<Article>>({
        title: '',
        content: '',
        excerpt: '',
        status: 'draft',
        category_ids: '',
        featured_image: null
    });

    // États pour la gestion des catégories et images
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);

    // États pour les modaux
    const [newCategory, setNewCategory] = useState<Partial<Category>>({
        name: '',
        description: ''
    });
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    /**
     * Charge la liste des articles
     * Récupère les articles depuis l'API avec pagination
     */
    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const response = await articleService.getAllArticles(page);
            setArticles(response);
            setTotalArticles(response.length);
        } catch (error) {
            toast.error('Impossible de charger les articles', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Charge la liste des catégories
     * Récupère toutes les catégories depuis l'API
     */
    const fetchCategories = async () => {
        try {
            const response = await categoryService.getAllCategories();
            console.log("Catégories chargées: ", response);
            setCategories(response);
        } catch (error) {
            toast.error('Impossible de charger les catégories', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    // Effet pour charger les articles et catégories au montage et lors du changement de page
    useEffect(() => {
        fetchArticles();
        fetchCategories();
    }, [page]);

    /**
     * Filtre les articles en fonction de la recherche
     * Permet de filtrer par titre ou extrait
     */
    const filteredArticles = useMemo(() => {
        return articles?.filter(article => 
            (article?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article?.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [articles, searchQuery]);

    /**
     * Gère le téléchargement de l'image à la une
     * @param event - Événement de changement de fichier
     */
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFeaturedImage(file);
            try {
                const imageUrl = await articleService.uploadImage(file);
                setArticleForm(prev => ({ ...prev, featured_image: imageUrl }));
            } catch (error) {
                toast.error('Échec du téléchargement de l\'image');
            }
        }
    };

    /**
     * Soumet le formulaire d'article (création ou modification)
     * Gère l'enregistrement des articles avec leurs catégories
     */
    const handleSubmit = async () => {
        try {
            const formData: Partial<Article> = {
                ...articleForm,
                category_ids: selectedCategories.join(',')
            };

            if (selectedArticle) {
                await articleService.updateArticle(selectedArticle.id!, formData);
                toast.success('Article mis à jour avec succès');
            } else {
                await articleService.createArticle(formData);
                toast.success('Article créé avec succès');
            }

            fetchArticles();
            setSelectedArticle(null);
            setArticleForm({});
            setSelectedCategories([]);
        } catch (error) {
            toast.error('Erreur lors de l\'enregistrement', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    /**
     * Supprime un article
     * @param id - Identifiant de l'article à supprimer
     */
    const handleDelete = async (id: number) => {
        try {
            await articleService.deleteArticle(id);
            toast.success('Article supprimé avec succès');
            fetchArticles();
        } catch (error) {
            toast.error('Impossible de supprimer l\'article', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    /**
     * Sélectionne ou désélectionne une catégorie
     * @param categoryId - Identifiant de la catégorie
     */
    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategories(prev => 
            prev.includes(categoryId) 
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    /**
     * Crée une nouvelle catégorie
     */
    const handleCreateCategory = async () => {
        if (!newCategory.name) {
            toast.error('Le nom de la catégorie est obligatoire');
            return;
        }

        try {
            const createdCategory = await categoryService.createCategory({
                name: newCategory.name,
                description: newCategory.description
            });

            // Mettre à jour la liste des catégories
            setCategories(prev => [...prev, createdCategory]);
            
            // Réinitialiser le formulaire
            setNewCategory({ name: '', description: '' });
            setIsCategoryModalOpen(false);

            toast.success('Catégorie créée avec succès');
        } catch (error) {
            toast.error('Impossible de créer la catégorie', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Gestion des Articles</h1>
                    <p className="text-muted-foreground">
                        Total d'articles : {totalArticles}
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                            placeholder="Rechercher un article" 
                            className="pl-10 w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={() => {
                                setSelectedArticle(null);
                                setArticleForm({});
                                setSelectedCategories([]);
                            }}>
                                <FaPlus className="mr-2" /> Nouvel Article
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px]">
                            {/* Contenu du modal de création/édition d'article */}
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedArticle ? 'Modifier l\'Article' : 'Créer un Nouvel Article'}
                                </DialogTitle>
                                <DialogDescription>
                                    Remplissez tous les champs pour {selectedArticle ? 'mettre à jour' : 'créer'} un article.
                                </DialogDescription>
                            </DialogHeader>

                            {/* Formulaire de l'article */}
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">Titre</Label>
                                    <Input 
                                        id="title" 
                                        value={articleForm.title || ''} 
                                        onChange={(e) => setArticleForm(prev => ({ 
                                            ...prev, 
                                            title: e.target.value 
                                        }))}
                                        className="col-span-3" 
                                    />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="content" className="text-right">Contenu</Label>
                                    <Textarea 
                                        id="content" 
                                        value={articleForm.content || ''} 
                                        onChange={(e) => setArticleForm(prev => ({ 
                                            ...prev, 
                                            content: e.target.value 
                                        }))}
                                        className="col-span-3 h-48" 
                                    />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="categories" className="text-right">Catégories</Label>
                                    <div className="col-span-3 flex flex-wrap gap-2">
                                        {categories?.map(category => (
                                            <Button 
                                                key={category.id} 
                                                variant={selectedCategories.includes(category.id!) ? 'default' : 'outline'}
                                                onClick={() => handleCategorySelect(category.id!)}
                                                className="cursor-pointer"
                                            >
                                                {category.name}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" onClick={handleSubmit}>
                                    {selectedArticle ? 'Mettre à jour' : 'Créer'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Modal de création de catégorie */}
                    <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Créer une Nouvelle Catégorie</DialogTitle>
                                <DialogDescription>
                                    Ajoutez une nouvelle catégorie pour vos articles
                                </DialogDescription>
                            </DialogHeader>
                            
                            {/* Formulaire de création de catégorie */}
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="categoryName" className="text-right">
                                        Nom de la Catégorie
                                    </Label>
                                    <Input 
                                        id="categoryName"
                                        value={newCategory.name || ''}
                                        onChange={(e) => setNewCategory(prev => ({ 
                                            ...prev, 
                                            name: e.target.value 
                                        }))}
                                        className="col-span-3"
                                        placeholder="Ex: Développement Web"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="categoryDescription" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea 
                                        id="categoryDescription"
                                        value={newCategory.description || ''}
                                        onChange={(e) => setNewCategory(prev => ({ 
                                            ...prev, 
                                            description: e.target.value 
                                        }))}
                                        className="col-span-3"
                                        placeholder="Description optionnelle de la catégorie"
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button 
                                    type="submit" 
                                    onClick={handleCreateCategory}
                                >
                                    Créer la Catégorie
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Tableau des articles */}
            <Table>
                <TableCaption>Liste des articles</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Catégories</TableHead>
                        <TableHead>Date de Création</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredArticles?.map(article => (
                        <TableRow key={article.id}>
                            <TableCell>{article.title}</TableCell>
                            <TableCell>
                                <Badge 
                                    variant={
                                        article.status === 'draft' ? 'secondary' :
                                        article.status === 'published' ? 'default' :
                                        'destructive'
                                    }
                                >
                                    {article.status === 'draft' ? 'Brouillon' :
                                     article.status === 'published' ? 'Publié' :
                                     'Archivé'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {article.categories || 'Aucune catégorie'}
                            </TableCell>
                            <TableCell>
                                {new Date(article.created_at || '').toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedArticle(article);
                                            setArticleForm({
                                                title: article.title,
                                                content: article.content,
                                                excerpt: article.excerpt,
                                                status: article.status,
                                                featured_image: article.featured_image
                                            });
                                            setSelectedCategories(
                                                article.category_ids 
                                                    ? article.category_ids.split(',').map(Number) 
                                                    : []
                                            );
                                        }}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        variant="destructive"
                                        onClick={() => handleDelete(article.id!)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ArticlesAdminPage;
