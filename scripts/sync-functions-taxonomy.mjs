import { writeFileSync } from "fs";
import { INDUSTRIES } from "../src/features/taxonomy/data/taxonomy.js";

const data = INDUSTRIES.map((industry) => ({
  id: industry.id,
  name: industry.en,
  departments: industry.departments.map((department) => ({
    id: department.id,
    name: department.en,
    roles: department.roles.map((role) => ({
      id: role.id,
      name: role.en
    }))
  }))
}));

const body = `/**
 * Canonical taxonomy for Cloud Functions (synced from src/features/taxonomy).
 * Run: node scripts/sync-functions-taxonomy.mjs
 */

const INDUSTRIES = ${JSON.stringify(data, null, 2)};

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
`;

writeFileSync(new URL("../functions/taxonomy.js", import.meta.url), body);
console.log(`Synced ${data.length} industries to functions/taxonomy.js`);
