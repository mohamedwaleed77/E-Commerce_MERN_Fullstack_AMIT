import i18n from 'i18next';
import { useDispatch,useSelector } from 'react-redux'
import { ar,en } from '../features/languageSlice/languageSlice';
// Client-side only function to set document direction and lang attribute
export const setDocumentDirection = (lng) => {
  // Only run in browser environment
  if (typeof document !== 'undefined') {
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;

    // Optional: Add CSS class for RTL-specific styling
    if (lng === 'ar') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }
};

// Initialize i18n
const initializeI18n = () => {
  return i18n
    .init({
      lng: 'en', // Default to English
      fallbackLng: 'en',
      resources: {
        ar: {
          translation: {
            greeting: 'أهلاً {{username}}!',
            cart: "السلة",
            users:"المستخدمين",
            products:"المنتجات",
            carts:"السلات",
            orders:"الطلبات",
            admindashboard:"لوحة التحكم"

          }
        },
        en: {
          translation: {
            greeting: 'Hello {{username}}!',
            cart:"cart",
            users:"users",
            products:"products",
            carts:"carts",
            orders:"orders",
            admindashboard:"Admin Dashboard"

          }
        }
      }
    })
    .then(() => {
      // Initialize direction on load
      setDocumentDirection(i18n.language);
      return i18n;
    });
};

// Listen for language changes


// Export both the i18n instance and initialization function
export { i18n, initializeI18n };
export default i18n;