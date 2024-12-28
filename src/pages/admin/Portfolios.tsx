import React, { useState, useEffect, useRef, useMemo } from 'react';
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

import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_CONFIG } from '@/config/tinymce';

import portfolioService, { PortfolioProject, PortfolioProjectCreate, PortfolioProjectUpdate } from '@/services/portfolioService';

const API_URL = import.meta.env.VITE_API_URL;

interface PortfoliosAdminState {
    portfolios: PortfolioProject[];
    isLoading: boolean;
    error: string | null;
    selectedPortfolio: Partial<PortfolioProject> | null;
    isModalOpen: boolean;
}

const PortfoliosAdminPage: React.FC = () => {
    const [state, setState] = useState<PortfoliosAdminState>({
        portfolios: [],
        isLoading: true,
        error: null,
        selectedPortfolio: null,
        isModalOpen: false
    });

    const [searchTerm, setSearchTerm] = useState('');

    const descriptionEditorRef = useRef<any>(null);
    const technologiesInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const filteredPortfolios = useMemo(() => {
        if (!searchTerm) return state.portfolios;

        return state.portfolios.filter(portfolio => 
            portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            portfolio.technologies.some(tech => 
                tech.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            portfolio.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [state.portfolios, searchTerm]);

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const portfolios = await portfolioService.getAll();
            setState(prev => ({
                ...prev,
                portfolios,
                isLoading: false
            }));
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                error: error.message || 'Erreur lors du chargement des projets',
                isLoading: false
            }));
            toast.error('Erreur lors du chargement des projets');
        }
    };

    const handleCreateOrUpdatePortfolio = async () => {
        try {
            const description = descriptionEditorRef.current?.getContent();
            const technologies = technologiesInputRef.current?.value.split(',').map(tech => tech.trim());

            const portfolioData: PortfolioProjectCreate | PortfolioProjectUpdate = {
                title: state.selectedPortfolio?.title || '',
                description: description || '',
                technologies: technologies || [],
                image: state.selectedPortfolio?.image || '',
                link: state.selectedPortfolio?.link || '',
                github: state.selectedPortfolio?.github || '',
                status: state.selectedPortfolio?.status || 'active',
                id: state.selectedPortfolio?.id
            };

            if (state.selectedPortfolio?.id) {
                // Update existing portfolio
                await portfolioService.update(state.selectedPortfolio.id, portfolioData);
                toast.success('Projet mis à jour avec succès');
            } else {
                // Create new portfolio
                await portfolioService.create(portfolioData as PortfolioProjectCreate);
                toast.success('Projet créé avec succès');
            }

            fetchPortfolios();
            setState(prev => ({ ...prev, isModalOpen: false, selectedPortfolio: null }));
        } catch (error: any) {
            toast.error(error.message || 'Erreur lors de la sauvegarde du projet');
        }
    };

    const handleDeletePortfolio = async (id: number) => {
        try {
            await portfolioService.delete(id);
            toast.success('Projet supprimé avec succès');
            fetchPortfolios();
        } catch (error: any) {
            toast.error(error.message || 'Erreur lors de la suppression du projet');
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const { url } = await portfolioService.uploadImage(file);
                setState(prev => ({
                    ...prev,
                    selectedPortfolio: {
                        ...prev.selectedPortfolio,
                        image: url
                    }
                }));
            } catch (error: any) {
                toast.error('Erreur lors du téléchargement de l\'image');
            }
        }
    };

    const openPortfolioModal = (portfolio?: PortfolioProject) => {
        setState(prev => ({
            ...prev,
            selectedPortfolio: portfolio || {},
            isModalOpen: true
        }));
    };

    const closePortfolioModal = () => {
        setState(prev => ({
            ...prev,
            isModalOpen: false,
            selectedPortfolio: null
        }));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestion des Projets Portfolio</h1>
                <Button onClick={() => openPortfolioModal()} className="flex items-center gap-2">
                    <FaPlus /> Ajouter un Projet
                </Button>
                <Input 
                    type="search" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Rechercher un projet" 
                    className="ml-4" 
                />
            </div>

            {state.isLoading ? (
                <p>Chargement des projets...</p>
            ) : state.error ? (
                <p className="text-red-500">{state.error}</p>
            ) : (
                <Table>
                    <TableCaption>Liste des projets de portfolio</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead>Technologies</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Lien du Projet</TableHead>
                            <TableHead>GitHub</TableHead>
                            <TableHead>Date de Création</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPortfolios.map(portfolio => (
                            <TableRow key={portfolio.id}>
                                <TableCell>{portfolio.title}</TableCell>
                                <TableCell>
                                    {portfolio.technologies.map(tech => (
                                        <Badge key={tech} variant="secondary" className="mr-1">{tech}</Badge>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Badge 
                                        variant={portfolio.status === 'active' ? 'default' : 'destructive'}
                                    >
                                        {portfolio.status === 'active' ? 'Actif' : 'Archivé'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {portfolio.link ? (
                                        <a 
                                            href={portfolio.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-blue-600 hover:underline"
                                        >
                                            Voir le projet
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">Non défini</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {portfolio.github ? (
                                        <a 
                                            href={portfolio.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-green-600 hover:underline"
                                        >
                                            Voir GitHub
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">Non défini</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {new Date(portfolio.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            onClick={() => openPortfolioModal(portfolio)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => handleDeletePortfolio(portfolio.id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Dialog open={state.isModalOpen} onOpenChange={closePortfolioModal}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {state.selectedPortfolio?.id ? 'Modifier' : 'Ajouter'} un Projet
                        </DialogTitle>
                        <DialogDescription>
                            Gérez les détails de votre projet de portfolio
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4 pr-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Titre
                            </Label>
                            <Input 
                                id="title" 
                                value={state.selectedPortfolio?.title || ''} 
                                onChange={(e) => setState(prev => ({
                                    ...prev,
                                    selectedPortfolio: {
                                        ...prev.selectedPortfolio,
                                        title: e.target.value
                                    }
                                }))}
                                className="col-span-3" 
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <div className="col-span-3">
                                <Editor
                                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                                    onInit={(evt, editor) => descriptionEditorRef.current = editor}
                                    initialValue={state.selectedPortfolio?.description || ''}
                                    init={{
                                        ...TINYMCE_CONFIG,
                                        height: 300
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="technologies" className="text-right">
                                Technologies
                            </Label>
                            <Input 
                                id="technologies" 
                                ref={technologiesInputRef}
                                defaultValue={state.selectedPortfolio?.technologies?.join(', ') || ''}
                                placeholder="React, Node.js, TypeScript" 
                                className="col-span-3" 
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project_url" className="text-right">
                                URL du Projet
                            </Label>
                            <Input 
                                id="project_url" 
                                value={state.selectedPortfolio?.link || ''} 
                                onChange={(e) => setState(prev => ({
                                    ...prev,
                                    selectedPortfolio: {
                                        ...prev.selectedPortfolio,
                                        link: e.target.value
                                    }
                                }))}
                                className="col-span-3" 
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="github_url" className="text-right">
                                URL GitHub
                            </Label>
                            <Input 
                                id="github_url" 
                                value={state.selectedPortfolio?.github || ''} 
                                onChange={(e) => setState(prev => ({
                                    ...prev,
                                    selectedPortfolio: {
                                        ...prev.selectedPortfolio,
                                        github: e.target.value
                                    }
                                }))}
                                className="col-span-3" 
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image_url" className="text-right">
                                Image
                            </Label>
                            <Input 
                                id="image_url" 
                                type="file"
                                ref={imageInputRef}
                                onChange={handleImageUpload}
                                className="col-span-3" 
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Statut
                            </Label>
                            <Select
                                value={state.selectedPortfolio?.status || 'active'}
                                onValueChange={(value) => setState(prev => ({
                                    ...prev,
                                    selectedPortfolio: {
                                        ...prev.selectedPortfolio,
                                        status: value as 'active' | 'archived'
                                    }
                                }))}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Actif</SelectItem>
                                    <SelectItem value="archived">Archivé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <DialogFooter className="sticky bottom-0 bg-white py-2">
                        <Button type="button" variant="outline" onClick={closePortfolioModal}>
                            Annuler
                        </Button>
                        <Button type="submit" onClick={handleCreateOrUpdatePortfolio}>
                            Enregistrer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PortfoliosAdminPage;
