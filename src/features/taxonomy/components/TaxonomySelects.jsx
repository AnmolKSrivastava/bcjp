import { Label } from "@/lib/ui/label";
import {
  getDepartments,
  getIndustries,
  getRoles,
  labelOf
} from "../taxonomyHelpers";

const selectClass =
  "flex h-9 sm:h-10 w-full rounded-md border border-input bg-input-background px-3 py-1.5 sm:py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]";

/**
 * Cascading Industry → Department → Role selects.
 * form fields: industryId, departmentId, roleId
 */
function TaxonomySelects({
  form,
  onChange,
  lang = "en",
  labels = {},
  disabled = false
}) {
  const industries = getIndustries();
  const departments = getDepartments(form.industryId);
  const roles = getRoles(form.industryId, form.departmentId);

  const txt = {
    industry: labels.industry ?? (lang === "hi" ? "उद्योग" : "Industry"),
    industryPlaceholder:
      labels.industryPlaceholder ?? (lang === "hi" ? "उद्योग चुनें" : "Select industry"),
    department: labels.department ?? (lang === "hi" ? "विभाग" : "Department"),
    departmentPlaceholder:
      labels.departmentPlaceholder ?? (lang === "hi" ? "विभाग चुनें" : "Select department"),
    role: labels.role ?? (lang === "hi" ? "नौकरी की भूमिका" : "Job Role"),
    rolePlaceholder:
      labels.rolePlaceholder ?? (lang === "hi" ? "भूमिका चुनें" : "Select job role")
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4">
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="taxonomyIndustry" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
          {txt.industry} *
        </Label>
        <select
          id="taxonomyIndustry"
          className={selectClass}
          value={form.industryId || ""}
          disabled={disabled}
          onChange={(e) =>
            onChange({
              industryId: e.target.value,
              departmentId: "",
              roleId: ""
            })
          }
        >
          <option value="">{txt.industryPlaceholder}</option>
          {industries.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {labelOf(industry, lang)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="taxonomyDepartment" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
          {txt.department} *
        </Label>
        <select
          id="taxonomyDepartment"
          className={selectClass}
          value={form.departmentId || ""}
          disabled={disabled || !form.industryId}
          onChange={(e) =>
            onChange({
              industryId: form.industryId,
              departmentId: e.target.value,
              roleId: ""
            })
          }
        >
          <option value="">{txt.departmentPlaceholder}</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {labelOf(department, lang)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="taxonomyRole" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
          {txt.role} *
        </Label>
        <select
          id="taxonomyRole"
          className={selectClass}
          value={form.roleId || ""}
          disabled={disabled || !form.departmentId}
          onChange={(e) =>
            onChange({
              industryId: form.industryId,
              departmentId: form.departmentId,
              roleId: e.target.value
            })
          }
        >
          <option value="">{txt.rolePlaceholder}</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {labelOf(role, lang)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export { TaxonomySelects };
