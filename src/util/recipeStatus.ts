export type RateTier = 'high' | 'medium' | 'low';

/**
 * Success rate of a recipe, as a percentage of the applications that recorded an outcome.
 *
 * Applications with neither a success nor a failure are excluded from the denominator.
 * `migrationStatus` was only added to the metadata in June 2025, so older records carry no
 * outcome at all and counting them as failures would understate the recipe.
 */
export function computeSuccessRate(recipe: { successCount: number; failureCount: number }): number {
  const completed = recipe.successCount + recipe.failureCount;
  return completed > 0 ? (recipe.successCount / completed) * 100 : 0;
}

/**
 * Classify a recipe's success rate percentage into a tier.
 *
 *  - 'high'   : >= 80%  — recipe applies successfully to most plugins
 *  - 'medium' : 50–79%  — mixed results, needs investigation
 *  - 'low'    : < 50%   — recipe fails on the majority of plugins (includes 0%)
 */
export function getRateTier(rate: number): RateTier {
  if (rate >= 80) return 'high';
  if (rate >= 50) return 'medium';
  return 'low';
}

/**
 * Extract the trailing class-style name from a fully-qualified recipe ID.
 * e.g. "io.jenkins.tools.pluginmodernizer.SetupJenkinsfile" → "SetupJenkinsfile"
 */
export function shortRecipeName(recipeId: string): string {
  return recipeId.split('.').pop() ?? recipeId;
}

export const RATE_CARD_DEFS: { key: RateTier; label: string; desc: string }[] = [
  { key: 'high', label: 'High Rate', desc: 'Success rate 80% or above' },
  { key: 'medium', label: 'Medium Rate', desc: 'Success rate 50–79%' },
  { key: 'low', label: 'Low Rate', desc: 'Success rate under 50%' },
];
