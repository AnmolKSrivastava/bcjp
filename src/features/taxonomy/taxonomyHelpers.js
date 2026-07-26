import { INDUSTRIES } from "./data/taxonomy";

function getIndustries() {
  return INDUSTRIES;
}

function getIndustry(industryId) {
  return INDUSTRIES.find((i) => i.id === industryId) ?? null;
}

function getDepartments(industryId) {
  return getIndustry(industryId)?.departments ?? [];
}

function getDepartment(industryId, departmentId) {
  return getDepartments(industryId).find((d) => d.id === departmentId) ?? null;
}

function getRoles(industryId, departmentId) {
  return getDepartment(industryId, departmentId)?.roles ?? [];
}

function getRole(industryId, departmentId, roleId) {
  return getRoles(industryId, departmentId).find((r) => r.id === roleId) ?? null;
}

function labelOf(item, lang = "en") {
  if (!item) return "";
  return item[lang] || item.en || "";
}

function findRoleById(roleId) {
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

function resolveTaxonomy({ industryId, departmentId, roleId }) {
  const industry = getIndustry(industryId);
  if (!industry) return null;
  const department = getDepartment(industryId, departmentId);
  if (!department) return null;
  const role = getRole(industryId, departmentId, roleId);
  if (!role) return null;
  return { industry, department, role };
}

/** Payload fields to persist on jobs/candidates */
function taxonomyPayload({ industryId, departmentId, roleId }) {
  const resolved = resolveTaxonomy({ industryId, departmentId, roleId });
  if (!resolved) return null;
  return {
    industryId: resolved.industry.id,
    industryName: resolved.industry.en,
    departmentId: resolved.department.id,
    departmentName: resolved.department.en,
    roleId: resolved.role.id,
    roleName: resolved.role.en
  };
}

function isValidTaxonomy({ industryId, departmentId, roleId }) {
  return Boolean(resolveTaxonomy({ industryId, departmentId, roleId }));
}

/** Display label for a job or candidate (supports legacy title/occupation). */
function displayRoleLabel(entity, lang = "en") {
  if (!entity) return "";
  if (entity.roleId) {
    const found = findRoleById(entity.roleId);
    if (found) return labelOf(found.role, lang);
  }
  if (entity.roleName) return entity.roleName;
  if (entity.title) return entity.title;
  if (entity.occupation) return entity.occupation;
  return "";
}

function displayIndustryLabel(entity, lang = "en") {
  if (!entity) return "";
  if (entity.industryId) {
    const industry = getIndustry(entity.industryId);
    if (industry) return labelOf(industry, lang);
  }
  if (entity.industryName) return entity.industryName;
  if (entity.industry) {
    const byName = INDUSTRIES.find(
      (i) => i.en === entity.industry || i.id === entity.industry
    );
    if (byName) return labelOf(byName, lang);
    return entity.industry;
  }
  return "";
}

function taxonomySearchText(entity, lang = "en") {
  if (!entity) return "";
  const parts = [
    displayRoleLabel(entity, lang),
    displayRoleLabel(entity, "en"),
    displayIndustryLabel(entity, lang),
    displayIndustryLabel(entity, "en"),
    entity.departmentName,
    entity.roleName,
    entity.industryName,
    entity.title,
    entity.occupation
  ];
  return parts.filter(Boolean).join(" ").toLowerCase();
}

/** Flat lists for AI / Cloud Functions prompts */
function flattenTaxonomyForPrompt() {
  return INDUSTRIES.map((industry) => ({
    industryId: industry.id,
    industryName: industry.en,
    departments: industry.departments.map((department) => ({
      departmentId: department.id,
      departmentName: department.en,
      roles: department.roles.map((role) => ({
        roleId: role.id,
        roleName: role.en
      }))
    }))
  }));
}

function allIndustryIds() {
  return INDUSTRIES.map((i) => i.id);
}

function allRoleIds() {
  const ids = [];
  for (const industry of INDUSTRIES) {
    for (const department of industry.departments) {
      for (const role of department.roles) {
        ids.push(role.id);
      }
    }
  }
  return ids;
}

export {
  allIndustryIds,
  allRoleIds,
  displayIndustryLabel,
  displayRoleLabel,
  findRoleById,
  flattenTaxonomyForPrompt,
  getDepartment,
  getDepartments,
  getIndustries,
  getIndustry,
  getRole,
  getRoles,
  isValidTaxonomy,
  labelOf,
  resolveTaxonomy,
  taxonomyPayload,
  taxonomySearchText
};
