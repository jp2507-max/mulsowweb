/**
 * Utility function to conditionally join CSS class names
 * Filters out falsy values and joins the remaining strings with spaces
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}