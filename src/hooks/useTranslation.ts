import { useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'ta';

const translations = {
  en: {
    // Landing Page
    title: "Empowering Street Vendors Through Bulk Buying",
    description: "Join our community platform where street food vendors in the same locality form groups to buy raw materials collectively from wholesale suppliers. Save 5-12% by eliminating middlemen and strengthen your local food community.",
    joinVendorGroup: "Join a Vendor Group",
    becomeSupplier: "Become a Supplier",
    
    // Vendor Registration
    vendorRegistration: "Vendor Registration",
    name: "Name",
    phoneNumber: "Phone Number", 
    area: "Area",
    foodType: "Food Type",
    whatsappNumber: "WhatsApp Number",
    preferredTimeSlot: "Preferred Time Slot",
    createGroup: "Create Group",
    joinGroupWithCode: "Join Group with Code",
    groupCode: "Group Code",
    
    // Supplier Registration
    supplierRegistration: "Supplier Registration",
    typeOfProducts: "Type of Products",
    areasServed: "Areas Served",
    contactNumber: "Contact Number",
    minimumOrderQuantity: "Minimum Order Quantity",
    register: "Register",
    
    // Common
    submit: "Submit",
    back: "Back",
    cancel: "Cancel",
    confirm: "Confirm",
    loading: "Loading...",
    
    // Group Dashboard
    groupDashboard: "Group Dashboard",
    vendorsInGroup: "Vendors in Group",
    activeBulkOrder: "Active Bulk Order",
    quantity: "Quantity",
    sharedCost: "Shared Cost",
    markAsPaid: "Mark as Paid",
    
    // Payment
    totalBulkCost: "Total Bulk Cost",
    yourContribution: "Your Contribution",
    paymentSimulation: "Payment Simulation",
    
    // Delivery
    deliveryTime: "Delivery Time",
    deliveryCoordination: "Delivery Coordination",
    
    // Admin
    adminPanel: "Admin Panel",
    vendors: "Vendors",
    suppliers: "Suppliers",
    groups: "Groups",
    orders: "Orders"
  },
  hi: {
    title: "थोक खरीदारी के माध्यम से स्ट्रीट वेंडर्स को सशक्त बनाना",
    description: "हमारे कम्युनिटी प्लेटफॉर्म में शामिल हों जहां एक ही इलाके के स्ट्रीट फूड वेंडर्स मिलकर होलसेल सप्लायर्स से कच्चा माल खरीदते हैं। बिचौलियों को हटाकर 5-12% बचाएं।",
    joinVendorGroup: "वेंडर ग्रुप में शामिल हों",
    becomeSupplier: "सप्लायर बनें",
    vendorRegistration: "वेंडर पंजीकरण",
    name: "नाम",
    phoneNumber: "फोन नंबर",
    area: "क्षेत्र",
    foodType: "खाना का प्रकार",
    whatsappNumber: "व्हाट्सएप नंबर",
    preferredTimeSlot: "पसंदीदा समय",
    createGroup: "ग्रुप बनाएं",
    joinGroupWithCode: "कोड से ग्रुप जॉइन करें",
    groupCode: "ग्रुप कोड",
    supplierRegistration: "सप्लायर पंजीकरण",
    typeOfProducts: "उत्पाद का प्रकार",
    areasServed: "सेवा क्षेत्र",
    contactNumber: "संपर्क नंबर",
    minimumOrderQuantity: "न्यूनतम ऑर्डर मात्रा",
    register: "पंजीकरण करें",
    submit: "जमा करें",
    back: "वापस",
    cancel: "रद्द करें",
    confirm: "पुष्टि करें",
    loading: "लोड हो रहा है...",
    groupDashboard: "ग्रुप डैशबोर्ड",
    vendorsInGroup: "ग्रुप में वेंडर्स",
    activeBulkOrder: "सक्रिय थोक ऑर्डर",
    quantity: "मात्रा",
    sharedCost: "साझा लागत",
    markAsPaid: "भुगतान किया चिह्नित करें",
    totalBulkCost: "कुल थोक लागत",
    yourContribution: "आपका योगदान",
    paymentSimulation: "भुगतान सिमुलेशन",
    deliveryTime: "डिलीवरी का समय",
    deliveryCoordination: "डिलीवरी समन्वय",
    adminPanel: "एडमिन पैनल",
    vendors: "वेंडर्स",
    suppliers: "सप्लायर्स",
    groups: "ग्रुप्स",
    orders: "ऑर्डर्स"
  },
  ta: {
    title: "மொத்த வாங்குதல் மூலம் தெரு விற்பனையாளர்களை வலுப்படுத்துதல்",
    description: "எங்கள் சமூக தளத்தில் சேரவும், அங்கு ஒரே பகுதியில் உள்ள தெரு உணவு விற்பனையாளர்கள் குழுக்களாக சேர்ந்து மொத்த விற்பனையாளர்களிடமிருந்து மூலப்பொருட்களை வாங்குகிறார்கள். இடைத்தரகர்களை நீக்கி 5-12% சேமிக்கவும்.",
    joinVendorGroup: "விற்பனையாளர் குழுவில் சேரவும்",
    becomeSupplier: "சப்ளையர் ஆகவும்",
    vendorRegistration: "விற்பனையாளர் பதிவு",
    name: "பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    area: "பகுதி",
    foodType: "உணவு வகை",
    whatsappNumber: "வாட்ஸ்அப் எண்",
    preferredTimeSlot: "விருப்பமான நேர இடைவெளி",
    createGroup: "குழு உருவாக்கவும்",
    joinGroupWithCode: "குறியீட்டுடன் குழுவில் சேரவும்",
    groupCode: "குழு குறியீடு",
    supplierRegistration: "சப்ளையர் பதிவு",
    typeOfProducts: "தயாரிப்பு வகை",
    areasServed: "சேவை பகுதிகள்",
    contactNumber: "தொடர்பு எண்",
    minimumOrderQuantity: "குறைந்தபட்ச ஆர்டர் அளவு",
    register: "பதிவு செய்யவும்",
    submit: "சமர்பிக்கவும்",
    back: "பின்",
    cancel: "ரத்து செய்",
    confirm: "உறுதிப்படுத்து",
    loading: "ஏற்றுகிறது...",
    groupDashboard: "குழு டாஷ்போர்டு",
    vendorsInGroup: "குழுவில் விற்பனையாளர்கள்",
    activeBulkOrder: "செயலில் உள்ள மொத்த ஆர்டர்",
    quantity: "அளவு",
    sharedCost: "பகிர்ந்த செலவு",
    markAsPaid: "பணம் செலுத்தியதாக குறிக்கவும்",
    totalBulkCost: "மொத்த மொத்த செலவு",
    yourContribution: "உங்கள் பங்களிப்பு",
    paymentSimulation: "பணம் செலுத்துதல் உருவகப்படுத்துதல்",
    deliveryTime: "வினியோக நேரம்",
    deliveryCoordination: "வினியோக ஒருங்கிணைப்பு",
    adminPanel: "நிர்வாக பேனல்",
    vendors: "விற்பனையாளர்கள்",
    suppliers: "சப்ளையர்கள்",
    groups: "குழுக்கள்",
    orders: "ஆர்டர்கள்"
  }
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return { t, language, setLanguage };
}