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

// Interface pour les états du composant
interface ArticlesAdminState {
    articles: Article[];
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    selectedArticle: Partial<Article> | null;
    selectedCategories: number[];
    featuredImage: File | null;
    newCategory: Partial<Category>;
    isCategoryModalOpen: boolean;
    isArticleModalOpen: boolean;
}

/**
 * Page d'administration des articles
 * Permet de gérer la liste des articles, leur création, modification et suppression
 */
const ArticlesAdminPage: React.FC = () => {
    // État initial du composant
    const [state, setState] = useState<ArticlesAdminState>({
        articles: [],
        categories: [],
        isLoading: true,
        error: null,
        selectedArticle: null,
        selectedCategories: [],
        featuredImage: null,
        newCategory: { name: '', description: '' },
        isCategoryModalOpen: false,
        isArticleModalOpen: false
    });

    // États pour la pagination et la recherche
    const [totalArticles, setTotalArticles] = useState(0);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Effet pour charger les articles et catégories au montage du composant
    useEffect(() => {
        const fetchInitialData = async () => {
            // Réinitialiser l'état de chargement et d'erreur
            setState(prev => ({ 
                ...prev, 
                isLoading: true, 
                error: null 
            }));

            try {
                // Charger les articles
                const articlesResponse = await articleService.getAllArticles(page);
                
                // Charger les catégories
                const categoriesResponse = await categoryService.getAllCategories();

                // Mettre à jour l'état avec les données
                setState(prev => ({
                    ...prev,
                    articles: articlesResponse || [],
                    categories: categoriesResponse || [],
                    isLoading: false,
                    error: null
                }));
                setTotalArticles(articlesResponse.length);
            } catch (error) {
                // Gestion détaillée des erreurs
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : 'Impossible de charger les données';

                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: errorMessage,
                    articles: [],
                    categories: []
                }));

                toast.error('Erreur de chargement', {
                    description: errorMessage
                });

                console.error('Erreur de chargement des données:', error);
            }
        };

        fetchInitialData();
    }, [page]); 

    /**
     * Permet de filtrer par titre ou catégories
     */
    const filteredArticles = useMemo(() => {
        if (!searchQuery) return state.articles || [];

        const normalizedQuery = searchQuery.toLowerCase().trim();

        return (state.articles || []).filter(article => {
            // Vérification du titre
            const titleMatch = article?.title?.toLowerCase().includes(normalizedQuery) || false;

            // Vérification des catégories
            const categoryMatch = (article?.categories || [])
                .some(category => 
                    category?.name?.toLowerCase().includes(normalizedQuery) || false
                );

            return titleMatch || categoryMatch;
        });
    }, [state.articles, searchQuery]);

    // Méthode de recherche
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    // Méthode pour ouvrir le modal de création/édition d'article
    const handleEditArticle = (article?: Article) => {
        setState(prev => ({
            ...prev,
            selectedArticle: article || null,
            selectedCategories: article?.category_ids 
                ? article.category_ids.split(',').map(Number) 
                : [],
            isArticleModalOpen: true
        }));
    };

    // Méthode pour gérer le téléchargement de l'image
    const handleFeaturedImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setState(prev => ({ 
                ...prev, 
                featuredImage: file 
            }));

            try {
                const imageUrl = await articleService.uploadImage(file);
                setState(prev => ({
                    ...prev,
                    selectedArticle: {
                        ...prev.selectedArticle,
                        featured_image: imageUrl
                    }
                }));
            } catch (error) {
                toast.error('Échec du téléchargement de l\'image');
            }
        }
    };

    // Méthode pour sélectionner/désélectionner les catégories
    const handleCategorySelect = (categoryId: number) => {
        setState(prev => ({
            ...prev,
            selectedCategories: prev.selectedCategories.includes(categoryId)
                ? prev.selectedCategories.filter(id => id !== categoryId)
                : [...prev.selectedCategories, categoryId]
        }));
    };

    // Méthode pour créer/mettre à jour un article
    const handleSaveArticle = async () => {
        try {
            const { selectedArticle, selectedCategories, featuredImage } = state;

            if (!selectedArticle?.title || !selectedArticle.content) {
                toast.error('Champs obligatoires manquants');
                return;
            }

            const articleData = {
                ...selectedArticle,
                category_ids: selectedCategories.join(','),
                featured_image: featuredImage
            };

            let savedArticle: Article;
            if (selectedArticle.id) {
                // Mise à jour
                savedArticle = await articleService.updateArticle(selectedArticle.id, articleData);
            } else {
                // Création
                savedArticle = await articleService.createArticle(articleData);
            }

            // Mettre à jour la liste des articles
            setState(prev => ({
                ...prev,
                articles: selectedArticle.id 
                    ? prev.articles.map(a => a.id === savedArticle.id ? savedArticle : a)
                    : [...prev.articles, savedArticle],
                isArticleModalOpen: false,
                selectedArticle: null,
                selectedCategories: [],
                featuredImage: null
            }));

            toast.success(selectedArticle.id ? 'Article mis à jour' : 'Article créé');
        } catch (error) {
            toast.error('Erreur de sauvegarde', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    // Méthode pour supprimer un article
    const handleDeleteArticle = async (articleId: number) => {
        try {
            await articleService.deleteArticle(articleId);
            
            setState(prev => ({
                ...prev,
                articles: prev.articles.filter(article => article.id !== articleId)
            }));

            toast.success('Article supprimé avec succès');
        } catch (error) {
            toast.error('Suppression impossible', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    // Méthode pour créer une nouvelle catégorie
    const handleCreateCategory = async () => {
        try {
            const { newCategory } = state;

            if (!newCategory.name) {
                toast.error('Le nom de la catégorie est obligatoire');
                return;
            }

            const createdCategory = await categoryService.createCategory({
                name: newCategory.name,
                description: newCategory.description
            });

            setState(prev => ({
                ...prev,
                categories: [...prev.categories, createdCategory],
                newCategory: { name: '', description: '' },
                isCategoryModalOpen: false
            }));

            toast.success('Catégorie créée avec succès');
        } catch (error) {
            toast.error('Création impossible', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Gestion des Articles 
                    <span className="text-sm text-gray-500 ml-3">
                        ({totalArticles} articles disponibles)
                    </span>
                </h1>
                <div className="flex space-x-4">
                    {/* Barre de recherche */}
                    <div className="relative flex-grow max-w-md">
                        <input 
                            type="text" 
                            placeholder="Rechercher un article..." 
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#49D6A2] transition-all"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Boutons de création */}
                    <Button 
                        onClick={() => setState(prev => ({ 
                            ...prev, 
                            isArticleModalOpen: true, 
                            selectedArticle: null 
                        }))}
                    >
                        <FaPlus className="mr-2" /> Nouvel Article
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={() => setState(prev => ({ 
                            ...prev, 
                            isCategoryModalOpen: true 
                        }))}
                    >
                        <FaPlus className="mr-2" /> Nouvelle Catégorie
                    </Button>
                </div>
            </div>

            {/* Liste des articles */}
            {filteredArticles.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    Aucun article trouvé
                    {searchQuery && (
                        <p className="mt-2 text-sm">
                            Aucun résultat pour la recherche "{searchQuery}"
                        </p>
                    )}
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredArticles.map(article => (
                        <div 
                            key={article.id} 
                            className="border rounded-lg p-4 flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{article.title}</h2>
                                <p className="text-sm text-gray-500">
                                    {article.categories?.map(cat => cat.name).join(', ') || 'Aucune catégorie'}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => setState(prev => ({
                                        ...prev,
                                        selectedArticle: { ...article },
                                        selectedCategories: article.category_ids 
                                            ? article.category_ids.split(',').map(Number) 
                                            : [],
                                        isArticleModalOpen: true
                                    }))}
                                >
                                    <FaEdit className="mr-2" /> Modifier
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => {
                                        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cet article ?');
                                        if (confirmDelete) {
                                            handleDeleteArticle(article.id!);
                                        }
                                    }}
                                >
                                    <FaTrash className="mr-2" /> Supprimer
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de création/édition d'article */}
            <Dialog 
                open={state.isArticleModalOpen} 
                onOpenChange={() => setState(prev => ({ 
                    ...prev, 
                    isArticleModalOpen: false, 
                    selectedArticle: null 
                }))}
            >
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            {state.selectedArticle ? 'Modifier l\'Article' : 'Créer un Nouvel Article'}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500">
                            Remplissez tous les champs pour {state.selectedArticle ? 'mettre à jour' : 'créer'} un article.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4 px-2">
                        {/* Champs de titre avec design amélioré */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium text-gray-700">Titre de l'Article</Label>
                            <Input 
                                id="title" 
                                value={state.selectedArticle?.title || ''} 
                                onChange={(e) => setState(prev => ({ 
                                    ...prev, 
                                    selectedArticle: { 
                                        ...prev.selectedArticle, 
                                        title: e.target.value 
                                    } 
                                }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#49D6A2] transition-all" 
                                placeholder="Entrez le titre de votre article"
                            />
                        </div>

                        {/* Champs de contenu avec design amélioré */}
                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-sm font-medium text-gray-700">Contenu de l'Article</Label>
                            <Textarea 
                                id="content" 
                                value={state.selectedArticle?.content || ''} 
                                onChange={(e) => setState(prev => ({ 
                                    ...prev, 
                                    selectedArticle: { 
                                        ...prev.selectedArticle, 
                                        content: e.target.value 
                                    } 
                                }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[200px] focus:ring-2 focus:ring-[#49D6A2] transition-all" 
                                placeholder="Rédigez le contenu de votre article..."
                            />
                        </div>

                        {/* Champs d'extrait avec design amélioré */}
                        <div className="space-y-2">
                            <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700">Extrait</Label>
                            <Textarea 
                                id="excerpt" 
                                value={state.selectedArticle?.excerpt || ''} 
                                onChange={(e) => setState(prev => ({ 
                                    ...prev, 
                                    selectedArticle: { 
                                        ...prev.selectedArticle, 
                                        excerpt: e.target.value 
                                    } 
                                }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[100px] focus:ring-2 focus:ring-[#49D6A2] transition-all" 
                                placeholder="Un court résumé de l'article (optionnel)"
                            />
                        </div>

                        {/* Sélection du statut avec design amélioré */}
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-sm font-medium text-gray-700">Statut de l'Article</Label>
                            <Select
                                value={state.selectedArticle?.status || 'draft'}
                                onValueChange={(value) => setState(prev => ({ 
                                    ...prev, 
                                    selectedArticle: { 
                                        ...prev.selectedArticle, 
                                        status: value as 'draft' | 'published' | 'archived'
                                    } 
                                }))}
                            >
                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#49D6A2]">
                                    <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft" className="hover:bg-gray-100">Brouillon</SelectItem>
                                    <SelectItem value="published" className="hover:bg-gray-100">Publié</SelectItem>
                                    <SelectItem value="archived" className="hover:bg-gray-100">Archivé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Téléchargement de l'image à la une avec design moderne */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Image à la Une</Label>
                            <div className="flex items-center space-x-4 w-full">
                                <div className="flex-grow">
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#49D6A2] transition-all">
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleFeaturedImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center justify-center">
                                            <FaFileImage className="text-3xl text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">
                                                {state.featuredImage 
                                                    ? state.featuredImage.name 
                                                    : 'Glissez et déposez ou cliquez pour télécharger'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {state.selectedArticle?.featured_image && (
                                    <div className="relative group">
                                        <img 
                                            src={state.selectedArticle.featured_image} 
                                            alt="Image à la une" 
                                            className="w-32 h-32 object-cover rounded-lg shadow-md group-hover:opacity-75 transition-opacity"
                                        />
                                        <button 
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                selectedArticle: {
                                                    ...prev.selectedArticle,
                                                    featured_image: undefined
                                                }
                                            }))}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sélection des catégories avec design amélioré */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Catégories</Label>
                            <div className="flex flex-wrap gap-2">
                                {state.categories?.map(category => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => handleCategorySelect(category.id!)}
                                        className={`
                                            px-3 py-1 rounded-full text-sm transition-all
                                            ${state.selectedCategories.includes(category.id!) 
                                                ? 'bg-[#49D6A2] text-white' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                                        `}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="sticky bottom-0 bg-white z-10 pt-4 border-t">
                        <Button 
                            type="submit" 
                            onClick={handleSaveArticle}
                            className="w-full bg-[#49D6A2] hover:bg-[#3ac48c] text-white font-bold py-2 rounded-md transition-colors"
                        >
                            {state.selectedArticle ? 'Mettre à jour' : 'Créer'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal de création de catégorie */}
            <Dialog 
                open={state.isCategoryModalOpen} 
                onOpenChange={() => setState(prev => ({ 
                    ...prev, 
                    isCategoryModalOpen: false, 
                    newCategory: { name: '', description: '' } 
                }))}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Créer une Nouvelle Catégorie</DialogTitle>
                        <DialogDescription>
                            Ajoutez une nouvelle catégorie pour vos articles
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="categoryName" className="text-right">
                                Nom de la Catégorie
                            </Label>
                            <Input 
                                id="categoryName"
                                value={state.newCategory.name || ''}
                                onChange={(e) => setState(prev => ({ 
                                    ...prev, 
                                    newCategory: { 
                                        ...prev.newCategory, 
                                        name: e.target.value 
                                    } 
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
                                value={state.newCategory.description || ''}
                                onChange={(e) => setState(prev => ({ 
                                    ...prev, 
                                    newCategory: { 
                                        ...prev.newCategory, 
                                        description: e.target.value 
                                    } 
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
    );
};

export default ArticlesAdminPage;
