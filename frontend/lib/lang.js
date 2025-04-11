import Checkout from '@/app/cart/checkout';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // ✅ Add this
 
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
    .use(initReactI18next)
    .init({
      lng: 'en', // Default to English
      fallbackLng: 'en',
      resources: {
        ar: {
          translation: {
            greeting: 'أهلاً {{username}}!',
            cart: "السلة",
            users:"المستخدمين",
            Users:"المستخدمين",
            products:"المنتجات",
            carts:"السلات",
            orders:"الطلبات",
            admindashboard:"لوحة التحكم",
            SearchbyIDorName:"ابحث بالإسم او الرقم التعريفي",
            Next:"التالي",
            Previous:"السابق",
            Edit:"تعديل",
            Delete:"حذف",
            Page:"صفحة",
            of:"من",
            Submit:"تم",
            Cancel:"الغاء",
            true:"نعم",
            false:"لا",
            emailconfirmed:"حساب مؤكد",
            ID:"رقم تعريفي",
            Email:"البريد",
            role:"مركز",
            Nousersfound:"لا يوجد مستخدمون",
            AddUser:"أضف مستخدم",
            Admins:"مديرين",
            emailNotconfirmed:"حساب مش مؤكد",
            AllCategories:"كل التصنيفات",
            SortBy:"ترتيب حسب",
            InStock:"متوفر",
            OutOfStock:"غير متوفر",
            Itemaddedtocart:"تم وضعه في السلة",
            Quantity:"الكمية",
            Price:"السعر",
            Category:"التصنيف",
            Outofstock:"نفذت الكمية",
            Addtocart:"ضعه في السلة",
            Name:"أبجدي",
            Role:"منصب",
            Total:"المجموع",
            Checkout:"الدفع",
            EnterAdress:"ادخل العنوان",
            EnterPhone:"ادخل رقم هاتف",
            empty_cart:"السلة فارغة",
            YourCart:"سلتك",
            Products:"المنتجات",
            createdat:"تاريخ الطلب",
            Status:"الحالة",
            Phone:"الهاتف",
            Adress:"العنوان",
            newest:"الأحدث",
            oldest:"الأقدم"
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
            admindashboard:"Admin Dashboard",
            SearchbyIDorName:"search by name or ID",
            Next:"Next",
            Previous:"Previous",
            Edit:"Edit",
            Delete:"Delete",
            Page:"Page",
            of:"of",
            Submit:"Submit",
            Cancel:"Cancel",
            true:"yes",
            false:"nope",
            emailconfirmed:"Email confirmed",
            ID:"ID",
            Email:"Email",
            role:"Role",
            Nousersfound:"No users found",
            AddUser:"Add User",
            emailNotconfirmed:"Email not confirmed",
            AllCategories:"All categories",
            SortBy:"Sort by",
            InStock:"In stock",
            OutOfStock:"Out of stock",
            Itemaddedtocart:"Added to cart",
            Outofstock:"out of stock",
            Addtocart:"Add to cart",
            EnterAdress:"Enter Adress",
            EnterPhone:"Enter Phone Number",
            empty_cart:"Empty Cart",
            createdat:"Created at",
            Status:"Status"
            
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