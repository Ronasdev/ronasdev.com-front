import axios from 'axios';
// URL de l'API récupérée depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Interface pour les données du formulaire de contact
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Service pour gérer les fonctionnalités liées aux contacts
 */
class ContactService {
  private readonly baseURL = '/contacts';

  /**
   * Envoie un message via le formulaire de contact
   * @param {ContactFormData} data - Les données du formulaire
   * @returns {Promise} Réponse de l'API
   */
  async sendMessage(data: ContactFormData): Promise<any> {
    const response = await axios.post(`${API_URL}${this.baseURL}`, data);
    return response.data;
  }
}

export default new ContactService();
