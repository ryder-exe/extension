export const loadGoogleApi = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = true;
        script.onload = () => resolve(window.gapi);
        script.onerror = () => reject(new Error('Failed to load Google API script'));
        document.body.appendChild(script);
    });
};
