import { Label } from "@/lib/ui/label";
import {
  getDepartments,
  getIndustries,
  getRoles,
  labelOf
} from "../taxonomyHelpers";

const selectClass =
  "flex h-9 sm:h-10 w-full rounded-md border border-input bg-input-background px-3 py-1.5 sm:py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]";

const filterSelectClass =
  "flex h-11 w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#2563EB] focus:bg-white disabled:opacity-60";

/**
 * Cascading Industry → Department → Role selects.
 * form fields: industryId, departmentId, roleId
 *
 * @param {boolean} optional - filter mode: no required asterisks, "All" placeholders
 * @param {"stack"|"row"} layout - stack (default) or 3-column row on sm+
 * @param {string} idPrefix - prefix for select element ids
 */
function TaxonomySelects({
  form,
  onChange,
  lang = "en",
  labels = {},
  disabled = false,
  optional = false,
  layout = "stack",
  idPrefix = "taxonomy"
}) {
  const industries = getIndustries();
  const departments = getDepartments(form.industryId);
  const roles = getRoles(form.industryId, form.departmentId);
  const mark = optional ? "" : " *";
  const fieldClass = optional ? filterSelectClass : selectClass;

  const txt = {
    industry: labels.industry ?? (lang === "hi" ? "उद्योग" : "Industry"),
    industryPlaceholder:
      labels.industryPlaceholder ??
      (optional
        ? lang === "hi"
          ? "सभी उद्योग"
          : "All industries"
        : lang === "hi"
          ? "उद्योग चुनें"
          : "Select industry"),
    department: labels.department ?? (lang === "hi" ? "विभाग" : "Department"),
    departmentPlaceholder:
      labels.departmentPlaceholder ??
      (optional
        ? lang === "hi"
          ? "सभी विभाग"
          : "All departments"
        : lang === "hi"
          ? "विभाग चुनें"
          : "Select department"),
    role: labels.role ?? (lang === "hi" ? "नौकरी की भूमिका" : "Job Role"),
    rolePlaceholder:
      labels.rolePlaceholder ??
      (optional
        ? lang === "hi"
          ? "सभी भूमिकाएँ"
          : "All roles"
        : lang === "hi"
          ? "भूमिका चुनें"
          : "Select job role")
  };

  const gridClass =
    layout === "row"
      ? "grid grid-cols-1 gap-3 sm:grid-cols-3"
      : "grid grid-cols-1 gap-3 sm:gap-4";

  return (
    <div className={gridClass}>
      <div className="space-y-1.5 sm:space-y-2">
        <Label
          htmlFor={`${idPrefix}Industry`}
          className="text-xs sm:text-sm font-semibold text-[#0F172A]"
        >
          {txt.industry}
          {mark}
        </Label>
        <select
          id={`${idPrefix}Industry`}
          className={fieldClass}
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
        <Label
          htmlFor={`${idPrefix}Department`}
          className="text-xs sm:text-sm font-semibold text-[#0F172A]"
        >
          {txt.department}
          {mark}
        </Label>
        <select
          id={`${idPrefix}Department`}
          className={fieldClass}
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
        <Label
          htmlFor={`${idPrefix}Role`}
          className="text-xs sm:text-sm font-semibold text-[#0F172A]"
        >
          {txt.role}
          {mark}
        </Label>
        <select
          id={`${idPrefix}Role`}
          className={fieldClass}
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
