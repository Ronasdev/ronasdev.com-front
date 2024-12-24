import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useApi, useApiMutation } from '@/hooks/use-api';
import settingService, { Setting } from '@/services/settingService';

type SettingsGroup = {
    [key: string]: Setting[];
};

export default function Settings() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('general');

    // Récupération des paramètres
    const { data: settings } = useApi('settings', () => settingService.getAll());

    // Mutation pour mettre à jour les paramètres
    const updateSettingMutation = useApiMutation(
        ({ key, value }: { key: string; value: string }) =>
            settingService.update(key, { value }),
        {
            onSuccess: () => {
                toast({
                    title: 'Paramètre mis à jour',
                    description: 'Le paramètre a été mis à jour avec succès.',
                });
            },
            invalidateQueries: ['settings'],
        }
    );

    // Mutation pour mettre à jour plusieurs paramètres
    const updateBulkMutation = useApiMutation(
        (settings: { key: string; value: string }[]) =>
            settingService.updateBulk(settings),
        {
            onSuccess: () => {
                toast({
                    title: 'Paramètres mis à jour',
                    description: 'Les paramètres ont été mis à jour avec succès.',
                });
            },
            invalidateQueries: ['settings'],
        }
    );

    // Grouper les paramètres par catégorie
    const groupedSettings: SettingsGroup = settings?.reduce(
        (acc: SettingsGroup, setting) => {
            if (!acc[setting.group]) {
                acc[setting.group] = [];
            }
            acc[setting.group].push(setting);
            return acc;
        },
        {}
    ) || {};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const settings = Array.from(formData.entries()).map(([key, value]) => ({
            key,
            value: value as string,
        }));
        updateBulkMutation.mutate(settings);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
                <p className="text-muted-foreground">
                    Gérez les paramètres de votre site
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="general">Général</TabsTrigger>
                    <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>Paramètres généraux</CardTitle>
                                <CardDescription>
                                    Configurez les paramètres généraux de votre site
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {groupedSettings.general?.map((setting) => (
                                    <div key={setting.key} className="space-y-2">
                                        <Label htmlFor={setting.key}>
                                            {setting.key}
                                        </Label>
                                        <Input
                                            id={setting.key}
                                            name={setting.key}
                                            defaultValue={setting.value}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="social">
                        <Card>
                            <CardHeader>
                                <CardTitle>Réseaux sociaux</CardTitle>
                                <CardDescription>
                                    Configurez vos liens de réseaux sociaux
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {groupedSettings.social?.map((setting) => (
                                    <div key={setting.key} className="space-y-2">
                                        <Label htmlFor={setting.key}>
                                            {setting.key}
                                        </Label>
                                        <Input
                                            id={setting.key}
                                            name={setting.key}
                                            defaultValue={setting.value}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="seo">
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO</CardTitle>
                                <CardDescription>
                                    Configurez les paramètres SEO de votre site
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {groupedSettings.seo?.map((setting) => (
                                    <div key={setting.key} className="space-y-2">
                                        <Label htmlFor={setting.key}>
                                            {setting.key}
                                        </Label>
                                        <Input
                                            id={setting.key}
                                            name={setting.key}
                                            defaultValue={setting.value}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="contact">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact</CardTitle>
                                <CardDescription>
                                    Configurez vos informations de contact
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {groupedSettings.contact?.map((setting) => (
                                    <div key={setting.key} className="space-y-2">
                                        <Label htmlFor={setting.key}>
                                            {setting.key}
                                        </Label>
                                        <Input
                                            id={setting.key}
                                            name={setting.key}
                                            defaultValue={setting.value}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit">Enregistrer les modifications</Button>
                    </div>
                </form>
            </Tabs>
        </div>
    );
}
