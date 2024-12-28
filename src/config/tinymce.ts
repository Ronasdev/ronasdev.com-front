import { Editor } from '@tinymce/tinymce-react';

export const TINYMCE_CONFIG = {
    // Configuration de base
    apiKey: import.meta.env.VITE_TINYMCE_API_KEY || 'no-api-key',
    
    // Plugins essentiels
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 
        'charmap', 'preview', 'anchor', 'searchreplace', 
        'visualblocks', 'code', 'fullscreen', 
        'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],

    // Barre d'outils personnalisée
    toolbar: 'undo redo | ' +
        'bold italic underline | ' +
        'alignleft aligncenter alignright | ' +
        'numlist bullist | ' +
        'link image | ' +
        'code',

    // Configuration de l'éditeur
    menubar: true,
    branding: false,
    height: 500,
    
    // Configuration des images
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    file_picker_callback: (cb, value, meta) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.addEventListener('change', (e: any) => {
            const file = e.target.files[0];
            
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const id = 'blobid' + (new Date()).getTime();
                const blobCache = (window as any).tinymce.activeEditor.editorUpload.blobCache;
                const base64 = (reader.result as string).split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
        });

        input.click();
    },

    // Configuration des liens
    link_default_target: '_blank',

    // Configuration de la langue
    language: 'fr_FR',

    // Styles personnalisés
    content_style: `
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        img { 
            max-width: 100%; 
            height: auto; 
        }
    `
};

// Configuration spécifique pour l'extrait (version réduite)
export const TINYMCE_EXCERPT_CONFIG = {
    ...TINYMCE_CONFIG,
    height: 200,
    menubar: false,
    plugins: ['lists', 'link'],
    toolbar: 'bold italic | bullist numlist | removeformat'
};
