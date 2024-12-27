import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import categoryService, { Category } from '../../services/categoryService';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogFooter 
} from '@/components/ui/dialog';
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableRow, 
    TableHead, 
    TableCell 
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Partial<Category> | null>(null);
    const [categoryForm, setCategoryForm] = useState<Partial<Category>>({
        name: '',
        description: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await categoryService.fetchAllCategories();
            setCategories(response);
        } catch (error) {
            toast.error('Erreur lors du chargement des catégories', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    const handleCreateCategory = () => {
        setSelectedCategory(null);
        setCategoryForm({ name: '', description: '' });
        setIsOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
        setCategoryForm({
            name: category.name,
            description: category.description || ''
        });
        setIsOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (selectedCategory) {
                // Mise à jour d'une catégorie existante
                await categoryService.updateExistingCategory(selectedCategory.id!, categoryForm);
                toast.success('Catégorie mise à jour avec succès');
            } else {
                // Création d'une nouvelle catégorie
                await categoryService.addNewCategory(categoryForm);
                toast.success('Catégorie créée avec succès');
            }
            fetchCategories();
            setIsOpen(false);
        } catch (error) {
            toast.error('Erreur lors de l\'enregistrement de la catégorie', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            await categoryService.removeCategory(categoryId);
            toast.success('Catégorie supprimée avec succès');
            fetchCategories();
        } catch (error) {
            toast.error('Erreur lors de la suppression de la catégorie', {
                description: error instanceof Error ? error.message : 'Une erreur est survenue'
            });
        }
    };

    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Input 
                    placeholder="Rechercher une catégorie" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md"
                />
                <Button onClick={handleCreateCategory}>
                    <FaPlus className="mr-2" /> Nouvelle Catégorie
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Articles</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCategories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>{category.article_count || 0}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mr-2"
                                    onClick={() => handleEditCategory(category)}
                                >
                                    <FaEdit />
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleDeleteCategory(category.id!)}
                                >
                                    <FaTrash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedCategory ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nom
                            </Label>
                            <Input 
                                id="name"
                                value={categoryForm.name || ''}
                                onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input 
                                id="description"
                                value={categoryForm.description || ''}
                                onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>
                            Enregistrer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CategoriesPage;
