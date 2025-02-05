import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Mail, MessageSquare, Phone, Send, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import contactService, { ContactFormData } from '@/services/contactService';

/**
 * Schéma de validation du formulaire de contact
 */
const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

/**
 * Page de contact
 * Permet aux utilisateurs d'envoyer des messages via un formulaire
 */
const Contact = () => {
  // Hooks
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuration du formulaire avec React Hook Form et Zod
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  /**
   * Gère la soumission du formulaire
   * @param {ContactFormData} data - Les données du formulaire
   */
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await contactService.sendMessage(data);
      toast({
        title: 'Message envoyé',
        description: 'Nous vous répondrons dans les plus brefs délais.',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'envoi du message.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`
      min-h-screen 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gradient-to-b from-white to-gray-50'}
    `}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* En-tête de la page */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Contactez-moi
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Une question ? Un projet ? Une formation ? N'hésitez pas à me contacter !
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className={`space-y-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Mes coordonnées
              </h2>
              
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>contact@ronasdev.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6" />
                <div>
                  <h3 className="font-medium">Téléphone</h3>
                  <p>+229 60934817</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MessageSquare className="h-6 w-6" />
                <div>
                  <h3 className="font-medium">Adresse</h3>
                  <p>Cotonou, Bénin</p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className={`
              p-6 rounded-lg shadow-lg
              ${theme === 'dark' 
                ? 'bg-secondary-dark/30 text-white' 
                : 'bg-white text-gray-900'}
            `}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              className="pl-9"
                              placeholder="Votre nom"
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type="email"
                              className="pl-9"
                              placeholder="votre@email.com"
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Sujet de votre message"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Votre message..."
                            className="min-h-[150px]"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer le message'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;