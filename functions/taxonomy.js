/**
 * Canonical taxonomy for Cloud Functions (synced from src/features/taxonomy).
 * Run: node scripts/sync-functions-taxonomy.mjs
 */

const INDUSTRIES = [
  {
    "id": "construction",
    "name": "Construction Workers",
    "departments": [
      {
        "id": "construction-civil",
        "name": "Civil Work",
        "roles": [
          {
            "id": "construction-civil-mason",
            "name": "Mason"
          },
          {
            "id": "construction-civil-helper",
            "name": "Helper"
          },
          {
            "id": "construction-civil-concrete",
            "name": "Concrete Worker"
          },
          {
            "id": "construction-civil-tile",
            "name": "Tile Installer"
          },
          {
            "id": "construction-civil-flooring",
            "name": "Flooring Worker"
          },
          {
            "id": "construction-civil-bar-bender",
            "name": "Bar Bender"
          },
          {
            "id": "construction-civil-scaffolding",
            "name": "Scaffolding Worker"
          },
          {
            "id": "construction-civil-road",
            "name": "Road Construction Worker"
          }
        ]
      },
      {
        "id": "construction-electrical",
        "name": "Electrical",
        "roles": [
          {
            "id": "construction-electrical-electrician",
            "name": "Electrician"
          },
          {
            "id": "construction-electrical-helper",
            "name": "Electrician Helper"
          },
          {
            "id": "construction-electrical-cable",
            "name": "Cable Technician"
          }
        ]
      },
      {
        "id": "construction-plumbing",
        "name": "Plumbing",
        "roles": [
          {
            "id": "construction-plumbing-plumber",
            "name": "Plumber"
          },
          {
            "id": "construction-plumbing-helper",
            "name": "Plumber Helper"
          }
        ]
      },
      {
        "id": "construction-metal",
        "name": "Metal Work",
        "roles": [
          {
            "id": "construction-metal-welder",
            "name": "Welder"
          },
          {
            "id": "construction-metal-fabricator",
            "name": "Fabricator"
          },
          {
            "id": "construction-metal-steel-fixer",
            "name": "Steel Fixer"
          }
        ]
      },
      {
        "id": "construction-wood",
        "name": "Wood Work",
        "roles": [
          {
            "id": "construction-wood-carpenter",
            "name": "Carpenter"
          },
          {
            "id": "construction-wood-furniture",
            "name": "Furniture Carpenter"
          },
          {
            "id": "construction-wood-shuttering",
            "name": "Shuttering Carpenter"
          }
        ]
      },
      {
        "id": "construction-painting",
        "name": "Painting",
        "roles": [
          {
            "id": "construction-painting-painter",
            "name": "Painter"
          },
          {
            "id": "construction-painting-putty",
            "name": "Wall Putty Worker"
          },
          {
            "id": "construction-painting-spray",
            "name": "Spray Painter"
          }
        ]
      },
      {
        "id": "construction-machine",
        "name": "Machine Operators",
        "roles": [
          {
            "id": "construction-machine-excavator",
            "name": "Excavator Operator"
          },
          {
            "id": "construction-machine-jcb",
            "name": "JCB Operator"
          },
          {
            "id": "construction-machine-crane",
            "name": "Crane Operator"
          },
          {
            "id": "construction-machine-forklift",
            "name": "Forklift Operator"
          }
        ]
      }
    ]
  },
  {
    "id": "manufacturing",
    "name": "Manufacturing Company Workers",
    "departments": [
      {
        "id": "manufacturing-production",
        "name": "Production",
        "roles": [
          {
            "id": "manufacturing-production-machine",
            "name": "Machine Operator"
          },
          {
            "id": "manufacturing-production-cnc",
            "name": "CNC Operator"
          },
          {
            "id": "manufacturing-production-operator",
            "name": "Production Operator"
          },
          {
            "id": "manufacturing-production-assembly",
            "name": "Assembly Line Worker"
          },
          {
            "id": "manufacturing-production-packing",
            "name": "Packing Worker"
          }
        ]
      },
      {
        "id": "manufacturing-quality",
        "name": "Quality",
        "roles": [
          {
            "id": "manufacturing-quality-inspector",
            "name": "Quality Inspector"
          },
          {
            "id": "manufacturing-quality-qc",
            "name": "QC Executive"
          }
        ]
      },
      {
        "id": "manufacturing-warehouse",
        "name": "Warehouse",
        "roles": [
          {
            "id": "manufacturing-warehouse-loader",
            "name": "Loader"
          },
          {
            "id": "manufacturing-warehouse-unloader",
            "name": "Unloader"
          },
          {
            "id": "manufacturing-warehouse-picker",
            "name": "Picker"
          },
          {
            "id": "manufacturing-warehouse-packer",
            "name": "Packer"
          },
          {
            "id": "manufacturing-warehouse-inventory",
            "name": "Inventory Assistant"
          },
          {
            "id": "manufacturing-warehouse-storekeeper",
            "name": "Store Keeper"
          }
        ]
      },
      {
        "id": "manufacturing-maintenance",
        "name": "Maintenance",
        "roles": [
          {
            "id": "manufacturing-maintenance-mechanical",
            "name": "Mechanical Technician"
          },
          {
            "id": "manufacturing-maintenance-electrical",
            "name": "Electrical Technician"
          },
          {
            "id": "manufacturing-maintenance-helper",
            "name": "Maintenance Helper"
          }
        ]
      },
      {
        "id": "manufacturing-others",
        "name": "Others",
        "roles": [
          {
            "id": "manufacturing-others-helper",
            "name": "Factory Helper"
          },
          {
            "id": "manufacturing-others-supervisor",
            "name": "Supervisor"
          },
          {
            "id": "manufacturing-others-shift",
            "name": "Shift Incharge"
          }
        ]
      }
    ]
  },
  {
    "id": "showroom",
    "name": "Showrooms & Mall Executives",
    "departments": [
      {
        "id": "showroom-sales",
        "name": "Sales & Customer",
        "roles": [
          {
            "id": "showroom-sales-executive",
            "name": "Sales Executive"
          },
          {
            "id": "showroom-sales-cre",
            "name": "Customer Relationship Executive"
          },
          {
            "id": "showroom-sales-floor",
            "name": "Floor Executive"
          },
          {
            "id": "showroom-sales-demonstrator",
            "name": "Product Demonstrator"
          },
          {
            "id": "showroom-sales-support",
            "name": "Customer Support Executive"
          }
        ]
      },
      {
        "id": "showroom-billing",
        "name": "Billing & Front Desk",
        "roles": [
          {
            "id": "showroom-billing-executive",
            "name": "Billing Executive"
          },
          {
            "id": "showroom-billing-cashier",
            "name": "Cashier"
          },
          {
            "id": "showroom-billing-receptionist",
            "name": "Receptionist"
          }
        ]
      },
      {
        "id": "showroom-store",
        "name": "Store & Merchandising",
        "roles": [
          {
            "id": "showroom-store-executive",
            "name": "Store Executive"
          },
          {
            "id": "showroom-store-visual",
            "name": "Visual Merchandiser"
          }
        ]
      },
      {
        "id": "showroom-management",
        "name": "Management",
        "roles": [
          {
            "id": "showroom-management-team-leader",
            "name": "Team Leader"
          },
          {
            "id": "showroom-management-assistant",
            "name": "Assistant Store Manager"
          },
          {
            "id": "showroom-management-manager",
            "name": "Store Manager"
          }
        ]
      }
    ]
  },
  {
    "id": "retail",
    "name": "Retail Shop Workers",
    "departments": [
      {
        "id": "retail-sales",
        "name": "Sales",
        "roles": [
          {
            "id": "retail-sales-salesman",
            "name": "Salesman"
          },
          {
            "id": "retail-sales-saleswoman",
            "name": "Saleswoman"
          },
          {
            "id": "retail-sales-counter",
            "name": "Counter Sales Executive"
          },
          {
            "id": "retail-sales-assistant",
            "name": "Store Assistant"
          },
          {
            "id": "retail-sales-helper",
            "name": "Shop Helper"
          }
        ]
      },
      {
        "id": "retail-billing",
        "name": "Billing & Counter",
        "roles": [
          {
            "id": "retail-billing-cashier",
            "name": "Cashier"
          },
          {
            "id": "retail-billing-executive",
            "name": "Billing Executive"
          }
        ]
      },
      {
        "id": "retail-ops",
        "name": "Store Operations",
        "roles": [
          {
            "id": "retail-ops-inventory",
            "name": "Inventory Assistant"
          },
          {
            "id": "retail-ops-delivery",
            "name": "Delivery Boy"
          }
        ]
      },
      {
        "id": "retail-specialty",
        "name": "Specialty Stores",
        "roles": [
          {
            "id": "retail-specialty-pharmacy",
            "name": "Pharmacy Assistant"
          },
          {
            "id": "retail-specialty-mobile",
            "name": "Mobile Shop Executive"
          },
          {
            "id": "retail-specialty-grocery",
            "name": "Grocery Store Worker"
          },
          {
            "id": "retail-specialty-fashion",
            "name": "Fashion Store Executive"
          }
        ]
      }
    ]
  },
  {
    "id": "hospital",
    "name": "Hospital Staff",
    "departments": [
      {
        "id": "hospital-clinical",
        "name": "Clinical Support",
        "roles": [
          {
            "id": "hospital-clinical-nurse",
            "name": "Staff Nurse"
          },
          {
            "id": "hospital-clinical-ot",
            "name": "OT Technician"
          },
          {
            "id": "hospital-clinical-ward-boy",
            "name": "Ward Boy"
          },
          {
            "id": "hospital-clinical-aya",
            "name": "Aya"
          },
          {
            "id": "hospital-clinical-pca",
            "name": "Patient Care Assistant"
          },
          {
            "id": "hospital-clinical-dialysis",
            "name": "Dialysis Technician"
          },
          {
            "id": "hospital-clinical-lab",
            "name": "Lab Technician"
          },
          {
            "id": "hospital-clinical-ecg",
            "name": "ECG Technician"
          },
          {
            "id": "hospital-clinical-xray",
            "name": "X-Ray Technician"
          },
          {
            "id": "hospital-clinical-icu",
            "name": "ICU Technician"
          }
        ]
      },
      {
        "id": "hospital-admin",
        "name": "Administrative",
        "roles": [
          {
            "id": "hospital-admin-receptionist",
            "name": "Receptionist"
          },
          {
            "id": "hospital-admin-front-desk",
            "name": "Front Desk Executive"
          },
          {
            "id": "hospital-admin-billing",
            "name": "Billing Executive"
          },
          {
            "id": "hospital-admin-records",
            "name": "Medical Records Executive"
          }
        ]
      },
      {
        "id": "hospital-support",
        "name": "Support",
        "roles": [
          {
            "id": "hospital-support-housekeeping",
            "name": "Housekeeping Staff"
          },
          {
            "id": "hospital-support-security",
            "name": "Security Guard"
          },
          {
            "id": "hospital-support-ambulance",
            "name": "Ambulance Driver"
          },
          {
            "id": "hospital-support-attendant",
            "name": "Hospital Attendant"
          }
        ]
      }
    ]
  },
  {
    "id": "elderly-care",
    "name": "Elderly Care",
    "departments": [
      {
        "id": "elderly-nursing",
        "name": "Nursing & Care",
        "roles": [
          {
            "id": "elderly-nursing-home-nurse",
            "name": "Home Nurse"
          },
          {
            "id": "elderly-nursing-caregiver",
            "name": "Caregiver"
          },
          {
            "id": "elderly-nursing-attendant",
            "name": "Patient Attendant"
          },
          {
            "id": "elderly-nursing-companion",
            "name": "Elderly Companion"
          },
          {
            "id": "elderly-nursing-live-in",
            "name": "Live-in Caregiver"
          }
        ]
      },
      {
        "id": "elderly-specialized",
        "name": "Specialized Care",
        "roles": [
          {
            "id": "elderly-specialized-physio",
            "name": "Physiotherapy Assistant"
          },
          {
            "id": "elderly-specialized-dementia",
            "name": "Dementia Caregiver"
          },
          {
            "id": "elderly-specialized-bedridden",
            "name": "Bedridden Patient Caregiver"
          },
          {
            "id": "elderly-specialized-palliative",
            "name": "Palliative Care Assistant"
          }
        ]
      },
      {
        "id": "elderly-preference",
        "name": "Care Preference",
        "roles": [
          {
            "id": "elderly-preference-male",
            "name": "Male Caregiver"
          },
          {
            "id": "elderly-preference-female",
            "name": "Female Caregiver"
          }
        ]
      }
    ]
  },
  {
    "id": "restaurant",
    "name": "Restaurant Staff",
    "departments": [
      {
        "id": "restaurant-kitchen",
        "name": "Kitchen",
        "roles": [
          {
            "id": "restaurant-kitchen-cook",
            "name": "Cook"
          },
          {
            "id": "restaurant-kitchen-commis",
            "name": "Commis"
          },
          {
            "id": "restaurant-kitchen-chef",
            "name": "Chef"
          },
          {
            "id": "restaurant-kitchen-tandoor",
            "name": "Tandoor Cook"
          },
          {
            "id": "restaurant-kitchen-south",
            "name": "South Indian Cook"
          },
          {
            "id": "restaurant-kitchen-chinese",
            "name": "Chinese Cook"
          },
          {
            "id": "restaurant-kitchen-continental",
            "name": "Continental Cook"
          },
          {
            "id": "restaurant-kitchen-bakery",
            "name": "Bakery Assistant"
          },
          {
            "id": "restaurant-kitchen-helper",
            "name": "Kitchen Helper"
          },
          {
            "id": "restaurant-kitchen-dishwasher",
            "name": "Dishwasher"
          }
        ]
      },
      {
        "id": "restaurant-service",
        "name": "Service",
        "roles": [
          {
            "id": "restaurant-service-waiter",
            "name": "Waiter"
          },
          {
            "id": "restaurant-service-steward",
            "name": "Steward"
          },
          {
            "id": "restaurant-service-captain",
            "name": "Captain"
          },
          {
            "id": "restaurant-service-hostess",
            "name": "Hostess"
          },
          {
            "id": "restaurant-service-cashier",
            "name": "Cashier"
          },
          {
            "id": "restaurant-service-counter",
            "name": "Counter Executive"
          }
        ]
      },
      {
        "id": "restaurant-operations",
        "name": "Operations",
        "roles": [
          {
            "id": "restaurant-operations-supervisor",
            "name": "Restaurant Supervisor"
          },
          {
            "id": "restaurant-operations-shift",
            "name": "Shift Manager"
          },
          {
            "id": "restaurant-operations-manager",
            "name": "Restaurant Manager"
          },
          {
            "id": "restaurant-operations-delivery",
            "name": "Delivery Executive"
          }
        ]
      }
    ]
  }
];

function findRolePath(roleId) {
  for (const industry of INDUSTRIES) {
    for (const department of industry.departments) {
      const role = department.roles.find((r) => r.id === roleId);
      if (role) {
        return { industry, department, role };
      }
    }
  }
  return null;
}

function resolveTaxonomyIds({ industryId, departmentId, roleId }) {
  const industry = INDUSTRIES.find((i) => i.id === industryId);
  if (!industry) return null;
  const department = industry.departments.find((d) => d.id === departmentId);
  if (!department) return null;
  const role = department.roles.find((r) => r.id === roleId);
  if (!role) return null;
  return { industry, department, role };
}

function flattenForPrompt() {
  return INDUSTRIES.map((industry) => ({
    industryId: industry.id,
    industryName: industry.name,
    departments: industry.departments.map((department) => ({
      departmentId: department.id,
      departmentName: department.name,
      roles: department.roles.map((role) => ({
        roleId: role.id,
        roleName: role.name
      }))
    }))
  }));
}

module.exports = {
  INDUSTRIES,
  findRolePath,
  flattenForPrompt,
  resolveTaxonomyIds
};
