/**
 * Bharat Gig canonical employment taxonomy.
 * Industry → Department → Role
 */

function role(id, en, hi = en) {
  return { id, en, hi };
}

function dept(id, en, hi, roles) {
  return { id, en, hi, roles };
}

const INDUSTRIES = [
  {
    id: "construction",
    en: "Construction Workers",
    hi: "निर्माण कर्मचारी",
    departments: [
      dept("construction-civil", "Civil Work", "सिविल वर्क", [
        role("construction-civil-mason", "Mason", "राजमिस्त्री"),
        role("construction-civil-helper", "Helper", "हेल्पर"),
        role("construction-civil-concrete", "Concrete Worker", "कंक्रीट वर्कर"),
        role("construction-civil-tile", "Tile Installer", "टाइल इंस्टॉलर"),
        role("construction-civil-flooring", "Flooring Worker", "फ्लोरिंग वर्कर"),
        role("construction-civil-bar-bender", "Bar Bender", "बार बेंडर"),
        role("construction-civil-scaffolding", "Scaffolding Worker", "स्कैफोल्डिंग वर्कर"),
        role("construction-civil-road", "Road Construction Worker", "सड़क निर्माण वर्कर")
      ]),
      dept("construction-electrical", "Electrical", "इलेक्ट्रिकल", [
        role("construction-electrical-electrician", "Electrician", "इलेक्ट्रिशियन"),
        role("construction-electrical-helper", "Electrician Helper", "इलेक्ट्रिशियन हेल्पर"),
        role("construction-electrical-cable", "Cable Technician", "केबल तकनीशियन")
      ]),
      dept("construction-plumbing", "Plumbing", "प्लंबिंग", [
        role("construction-plumbing-plumber", "Plumber", "प्लंबर"),
        role("construction-plumbing-helper", "Plumber Helper", "प्लंबर हेल्पर")
      ]),
      dept("construction-metal", "Metal Work", "मेटल वर्क", [
        role("construction-metal-welder", "Welder", "वेल्डर"),
        role("construction-metal-fabricator", "Fabricator", "फैब्रिकेटर"),
        role("construction-metal-steel-fixer", "Steel Fixer", "स्टील फिक्सर")
      ]),
      dept("construction-wood", "Wood Work", "वुड वर्क", [
        role("construction-wood-carpenter", "Carpenter", "बढ़ई"),
        role("construction-wood-furniture", "Furniture Carpenter", "फर्नीचर कारपेंटर"),
        role("construction-wood-shuttering", "Shuttering Carpenter", "शटरिंग कारपेंटर")
      ]),
      dept("construction-painting", "Painting", "पेंटिंग", [
        role("construction-painting-painter", "Painter", "पेंटर"),
        role("construction-painting-putty", "Wall Putty Worker", "वॉल पुट्टी वर्कर"),
        role("construction-painting-spray", "Spray Painter", "स्प्रे पेंटर")
      ]),
      dept("construction-machine", "Machine Operators", "मशीन ऑपरेटर", [
        role("construction-machine-excavator", "Excavator Operator", "एक्सकेवेटर ऑपरेटर"),
        role("construction-machine-jcb", "JCB Operator", "जेसीबी ऑपरेटर"),
        role("construction-machine-crane", "Crane Operator", "क्रेन ऑपरेटर"),
        role("construction-machine-forklift", "Forklift Operator", "फोर्कलिफ्ट ऑपरेटर")
      ])
    ]
  },
  {
    id: "manufacturing",
    en: "Manufacturing Company Workers",
    hi: "मैन्युफैक्चरिंग कर्मचारी",
    departments: [
      dept("manufacturing-production", "Production", "प्रोडक्शन", [
        role("manufacturing-production-machine", "Machine Operator", "मशीन ऑपरेटर"),
        role("manufacturing-production-cnc", "CNC Operator", "CNC ऑपरेटर"),
        role("manufacturing-production-operator", "Production Operator", "प्रोडक्शन ऑपरेटर"),
        role("manufacturing-production-assembly", "Assembly Line Worker", "असेंबली लाइन वर्कर"),
        role("manufacturing-production-packing", "Packing Worker", "पैकिंग वर्कर")
      ]),
      dept("manufacturing-quality", "Quality", "क्वालिटी", [
        role("manufacturing-quality-inspector", "Quality Inspector", "क्वालिटी इंस्पेक्टर"),
        role("manufacturing-quality-qc", "QC Executive", "QC एक्ज़ीक्यूटिव")
      ]),
      dept("manufacturing-warehouse", "Warehouse", "वेयरहाउस", [
        role("manufacturing-warehouse-loader", "Loader", "लोडर"),
        role("manufacturing-warehouse-unloader", "Unloader", "अनलोडर"),
        role("manufacturing-warehouse-picker", "Picker", "पिकर"),
        role("manufacturing-warehouse-packer", "Packer", "पैकर"),
        role("manufacturing-warehouse-inventory", "Inventory Assistant", "इन्वेंटरी असिस्टेंट"),
        role("manufacturing-warehouse-storekeeper", "Store Keeper", "स्टोर कीपर")
      ]),
      dept("manufacturing-maintenance", "Maintenance", "मेंटेनेंस", [
        role("manufacturing-maintenance-mechanical", "Mechanical Technician", "मैकेनिकल तकनीशियन"),
        role("manufacturing-maintenance-electrical", "Electrical Technician", "इलेक्ट्रिकल तकनीशियन"),
        role("manufacturing-maintenance-helper", "Maintenance Helper", "मेंटेनेंस हेल्पर")
      ]),
      dept("manufacturing-others", "Others", "अन्य", [
        role("manufacturing-others-helper", "Factory Helper", "फैक्ट्री हेल्पर"),
        role("manufacturing-others-supervisor", "Supervisor", "सुपरवाइज़र"),
        role("manufacturing-others-shift", "Shift Incharge", "शिफ्ट इंचार्ज")
      ])
    ]
  },
  {
    id: "showroom",
    en: "Showrooms & Mall Executives",
    hi: "शोरूम और मॉल एक्ज़ीक्यूटिव",
    departments: [
      dept("showroom-sales", "Sales & Customer", "सेल्स और कस्टमर", [
        role("showroom-sales-executive", "Sales Executive", "सेल्स एक्ज़ीक्यूटिव"),
        role("showroom-sales-cre", "Customer Relationship Executive", "कस्टमर रिलेशनशिप एक्ज़ीक्यूटिव"),
        role("showroom-sales-floor", "Floor Executive", "फ्लोर एक्ज़ीक्यूटिव"),
        role("showroom-sales-demonstrator", "Product Demonstrator", "प्रोडक्ट डेमॉन्स्ट्रेटर"),
        role("showroom-sales-support", "Customer Support Executive", "कस्टमर सपोर्ट एक्ज़ीक्यूटिव")
      ]),
      dept("showroom-billing", "Billing & Front Desk", "बिलिंग और फ्रंट डेस्क", [
        role("showroom-billing-executive", "Billing Executive", "बिलिंग एक्ज़ीक्यूटिव"),
        role("showroom-billing-cashier", "Cashier", "कैशियर"),
        role("showroom-billing-receptionist", "Receptionist", "रिसेप्शनिस्ट")
      ]),
      dept("showroom-store", "Store & Merchandising", "स्टोर और मर्चेंडाइज़िंग", [
        role("showroom-store-executive", "Store Executive", "स्टोर एक्ज़ीक्यूटिव"),
        role("showroom-store-visual", "Visual Merchandiser", "विज़ुअल मर्चेंडाइज़र")
      ]),
      dept("showroom-management", "Management", "मैनेजमेंट", [
        role("showroom-management-team-leader", "Team Leader", "टीम लीडर"),
        role("showroom-management-assistant", "Assistant Store Manager", "असिस्टेंट स्टोर मैनेजर"),
        role("showroom-management-manager", "Store Manager", "स्टोर मैनेजर")
      ])
    ]
  },
  {
    id: "retail",
    en: "Retail Shop Workers",
    hi: "रिटेल दुकान कर्मचारी",
    departments: [
      dept("retail-sales", "Sales", "सेल्स", [
        role("retail-sales-salesman", "Salesman", "सेल्समैन"),
        role("retail-sales-saleswoman", "Saleswoman", "सेल्सवुमन"),
        role("retail-sales-counter", "Counter Sales Executive", "काउंटर सेल्स एक्ज़ीक्यूटिव"),
        role("retail-sales-assistant", "Store Assistant", "स्टोर असिस्टेंट"),
        role("retail-sales-helper", "Shop Helper", "दुकान हेल्पर")
      ]),
      dept("retail-billing", "Billing & Counter", "बिलिंग और काउंटर", [
        role("retail-billing-cashier", "Cashier", "कैशियर"),
        role("retail-billing-executive", "Billing Executive", "बिलिंग एक्ज़ीक्यूटिव")
      ]),
      dept("retail-ops", "Store Operations", "स्टोर ऑपरेशंस", [
        role("retail-ops-inventory", "Inventory Assistant", "इन्वेंटरी असिस्टेंट"),
        role("retail-ops-delivery", "Delivery Boy", "डिलीवरी बॉय")
      ]),
      dept("retail-specialty", "Specialty Stores", "विशेष दुकानें", [
        role("retail-specialty-pharmacy", "Pharmacy Assistant", "फार्मेसी असिस्टेंट"),
        role("retail-specialty-mobile", "Mobile Shop Executive", "मोबाइल शॉप एक्ज़ीक्यूटिव"),
        role("retail-specialty-grocery", "Grocery Store Worker", "किराना स्टोर वर्कर"),
        role("retail-specialty-fashion", "Fashion Store Executive", "फैशन स्टोर एक्ज़ीक्यूटिव")
      ])
    ]
  },
  {
    id: "hospital",
    en: "Hospital Staff",
    hi: "अस्पताल स्टाफ",
    departments: [
      dept("hospital-clinical", "Clinical Support", "क्लिनिकल सपोर्ट", [
        role("hospital-clinical-nurse", "Staff Nurse", "स्टाफ नर्स"),
        role("hospital-clinical-ot", "OT Technician", "OT तकनीशियन"),
        role("hospital-clinical-ward-boy", "Ward Boy", "वार्ड बॉय"),
        role("hospital-clinical-aya", "Aya", "आया"),
        role("hospital-clinical-pca", "Patient Care Assistant", "पेशेंट केयर असिस्टेंट"),
        role("hospital-clinical-dialysis", "Dialysis Technician", "डायलिसिस तकनीशियन"),
        role("hospital-clinical-lab", "Lab Technician", "लैब तकनीशियन"),
        role("hospital-clinical-ecg", "ECG Technician", "ECG तकनीशियन"),
        role("hospital-clinical-xray", "X-Ray Technician", "एक्स-रे तकनीशियन"),
        role("hospital-clinical-icu", "ICU Technician", "ICU तकनीशियन")
      ]),
      dept("hospital-admin", "Administrative", "प्रशासनिक", [
        role("hospital-admin-receptionist", "Receptionist", "रिसेप्शनिस्ट"),
        role("hospital-admin-front-desk", "Front Desk Executive", "फ्रंट डेस्क एक्ज़ीक्यूटिव"),
        role("hospital-admin-billing", "Billing Executive", "बिलिंग एक्ज़ीक्यूटिव"),
        role("hospital-admin-records", "Medical Records Executive", "मेडिकल रिकॉर्ड्स एक्ज़ीक्यूटिव")
      ]),
      dept("hospital-support", "Support", "सपोर्ट", [
        role("hospital-support-housekeeping", "Housekeeping Staff", "हाउसकीपिंग स्टाफ"),
        role("hospital-support-security", "Security Guard", "सिक्योरिटी गार्ड"),
        role("hospital-support-ambulance", "Ambulance Driver", "एम्बुलेंस ड्राइवर"),
        role("hospital-support-attendant", "Hospital Attendant", "हॉस्पिटल अटेंडेंट")
      ])
    ]
  },
  {
    id: "elderly-care",
    en: "Elderly Care",
    hi: "बुज़ुर्ग देखभाल",
    departments: [
      dept("elderly-nursing", "Nursing & Care", "नर्सिंग और केयर", [
        role("elderly-nursing-home-nurse", "Home Nurse", "होम नर्स"),
        role("elderly-nursing-caregiver", "Caregiver", "केयरगिवर"),
        role("elderly-nursing-attendant", "Patient Attendant", "पेशेंट अटेंडेंट"),
        role("elderly-nursing-companion", "Elderly Companion", "एल्डरली कंपेनियन"),
        role("elderly-nursing-live-in", "Live-in Caregiver", "लाइव-इन केयरगिवर")
      ]),
      dept("elderly-specialized", "Specialized Care", "विशेष देखभाल", [
        role("elderly-specialized-physio", "Physiotherapy Assistant", "फिजियोथेरेपी असिस्टेंट"),
        role("elderly-specialized-dementia", "Dementia Caregiver", "डिमेंशिया केयरगिवर"),
        role("elderly-specialized-bedridden", "Bedridden Patient Caregiver", "बेडरिडन पेशेंट केयरगिवर"),
        role("elderly-specialized-palliative", "Palliative Care Assistant", "पेलिएटिव केयर असिस्टेंट")
      ]),
      dept("elderly-preference", "Care Preference", "केयर प्राथमिकता", [
        role("elderly-preference-male", "Male Caregiver", "पुरुष केयरगिवर"),
        role("elderly-preference-female", "Female Caregiver", "महिला केयरगिवर")
      ])
    ]
  },
  {
    id: "restaurant",
    en: "Restaurant Staff",
    hi: "रेस्तरां स्टाफ",
    departments: [
      dept("restaurant-kitchen", "Kitchen", "किचन", [
        role("restaurant-kitchen-cook", "Cook", "रसोइया"),
        role("restaurant-kitchen-commis", "Commis", "कॉमिस"),
        role("restaurant-kitchen-chef", "Chef", "शेफ"),
        role("restaurant-kitchen-tandoor", "Tandoor Cook", "तंदूर कुक"),
        role("restaurant-kitchen-south", "South Indian Cook", "साउथ इंडियन कुक"),
        role("restaurant-kitchen-chinese", "Chinese Cook", "चाइनीज़ कुक"),
        role("restaurant-kitchen-continental", "Continental Cook", "कॉन्टिनेंटल कुक"),
        role("restaurant-kitchen-bakery", "Bakery Assistant", "बेकरी असिस्टेंट"),
        role("restaurant-kitchen-helper", "Kitchen Helper", "किचन हेल्पर"),
        role("restaurant-kitchen-dishwasher", "Dishwasher", "बर्तन धोने वाला")
      ]),
      dept("restaurant-service", "Service", "सर्विस", [
        role("restaurant-service-waiter", "Waiter", "वेटर"),
        role("restaurant-service-steward", "Steward", "स्टूवर्ड"),
        role("restaurant-service-captain", "Captain", "कैप्टन"),
        role("restaurant-service-hostess", "Hostess", "होस्टेस"),
        role("restaurant-service-cashier", "Cashier", "कैशियर"),
        role("restaurant-service-counter", "Counter Executive", "काउंटर एक्ज़ीक्यूटिव")
      ]),
      dept("restaurant-operations", "Operations", "ऑपरेशंस", [
        role("restaurant-operations-supervisor", "Restaurant Supervisor", "रेस्तरां सुपरवाइज़र"),
        role("restaurant-operations-shift", "Shift Manager", "शिफ्ट मैनेजर"),
        role("restaurant-operations-manager", "Restaurant Manager", "रेस्तरां मैनेजर"),
        role("restaurant-operations-delivery", "Delivery Executive", "डिलीवरी एक्ज़ीक्यूटिव")
      ])
    ]
  }
];

export { INDUSTRIES };
