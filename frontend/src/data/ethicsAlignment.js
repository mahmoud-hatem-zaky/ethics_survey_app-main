/**
 * The 8 Millan-Blanquel ethical concerns.
 * Each has an id (c1–c8), a short label, and a plain-language description.
 */
export const CONCERNS = [
  {
    id: 'c1',
    label: 'Minimise casualties',
    description: 'Harm the least possible number of people',
  },
  {
    id: 'c2',
    label: 'Protect passengers',
    description: 'Do not harm the people inside the vehicle',
  },
  {
    id: 'c3',
    label: 'Protect outsiders',
    description: 'Do not harm people outside the vehicle',
  },
  {
    id: 'c4',
    label: 'Minimise total damage',
    description: 'Inflict the least physical damage possible across all people',
  },
  {
    id: 'c5',
    label: 'Protect other vehicles',
    description: 'Do not harm other vehicles that carry passengers',
  },
  {
    id: 'c6',
    label: 'Protect vulnerable passengers',
    description: 'Do not harm children or incapacitated people inside the vehicle',
  },
  {
    id: 'c7',
    label: 'Protect animals',
    description: 'Do not harm animals',
  },
  {
    id: 'c8',
    label: 'Minimise property damage',
    description: 'Do not harm objects or property',
  },
]

/**
 * Priority arrays for each of the six philosophical frameworks.
 * Each array lists concern IDs from highest priority (index 0) to lowest.
 * Ties within a theory are expressed as nested arrays.
 * Source: Millan-Blanquel et al. (2020), Table I.
 */
export const FRAMEWORK_PRIORITIES = {
  Utilitarianism:     ['c1', 'c4', ['c2', 'c3'], 'c5', 'c6', 'c7', 'c8'],
  DistributiveJustice:['c4', 'c1', ['c2', 'c3'], 'c5', 'c6', 'c7', 'c8'],
  Deontological:      [['c3', 'c6'], 'c1', 'c4', 'c2', 'c5', 'c7', 'c8'],
  Kantian:            ['c3', 'c1', 'c2', 'c4', 'c5', 'c6', 'c7', 'c8'],
  Altruism:           ['c3', 'c2', 'c1', 'c4', 'c5', 'c6', 'c7', 'c8'],
  EthicalEgoism:      ['c2', 'c3', 'c1', 'c4', 'c5', 'c6', 'c7', 'c8'],
}

export const FRAMEWORK_LABELS = {
  Utilitarianism: 'Utilitarianism',
  DistributiveJustice: 'Distributive Justice',
  Deontological: 'Deontological',
  Kantian: 'Kantian',
  Altruism: 'Altruism',
  EthicalEgoism: 'Ethical Egoism',
}

/**
 * Algorithmic answer key: for each scenario (1–5) and each framework,
 * which option letter does the Boolean ethical engine select?
 *
 * YOU MUST FILL THIS IN based on your CARLA simulation output.
 * Format: ANSWER_KEY[scenarioId][frameworkKey] = 'A' | 'B' | 'C'
 *
 * The option letters here refer to the ACTUAL maneuver labels as they appear
 * in scenarios.js (the id field on each option object).
 *
 * Example placeholder — replace with your real simulation results:
 */
export const ANSWER_KEY = {
  1: {
    Utilitarianism:      'A',
    DistributiveJustice: 'A',
    Deontological:       'B',
    Kantian:             'B',
    Altruism:            'B',
    EthicalEgoism:       'C',
  },
  2: {
    Utilitarianism:      'A',
    DistributiveJustice: 'A',
    Deontological:       'B',
    Kantian:             'B',
    Altruism:            'B',
    EthicalEgoism:       'A',
  },
  3: {
    Utilitarianism:      'B',
    DistributiveJustice: 'B',
    Deontological:       'B',
    Kantian:             'B',
    Altruism:            'B',
    EthicalEgoism:       'C',
  },
  4: {
    Utilitarianism:      'C',
    DistributiveJustice: 'A',
    Deontological:       'A',
    Kantian:             'B',
    Altruism:            'A',
    EthicalEgoism:       'C',
  },
  5: {
    Utilitarianism:      'A',
    DistributiveJustice: 'A',
    Deontological:       'A',
    Kantian:             'A',
    Altruism:            'A',
    EthicalEgoism:       'A',
  },
}

/**
 * Converts a flat ranked concern array (e.g. ['c1','c3','c2',...]) produced
 * by the drag-ranking UI into a numeric rank map: { c1: 0, c3: 1, c2: 2, … }
 */
function buildRankMap(rankedConcerns) {
  const map = {}
  rankedConcerns.forEach((id, index) => {
    map[id] = index
  })
  return map
}

/**
 * Flattens a framework priority array (which may contain nested tie-arrays)
 * into a rank map: { c1: 0, c4: 1, c2: 1.5, c3: 1.5, … }
 * Tied concerns share the average of their positions.
 */
function buildFrameworkRankMap(priorityArray) {
  const map = {}
  let position = 0

  for (const entry of priorityArray) {
    if (Array.isArray(entry)) {
      // All tied — assign average rank
      const avg = (position + position + entry.length - 1) / 2
      for (const id of entry) {
        map[id] = avg
      }
      position += entry.length
    } else {
      map[entry] = position
      position += 1
    }
  }

  return map
}

/**
 * Computes the Spearman-style rank-distance between a participant's ranking
 * and a framework's canonical ranking. Lower score = closer alignment.
 *
 * Uses sum of squared rank differences (analogous to Spearman's D²).
 */
function rankDistance(userRankMap, frameworkRankMap) {
  let sumSquaredDiff = 0

  for (const id of Object.keys(userRankMap)) {
    const userRank = userRankMap[id]
    const frameworkRank = frameworkRankMap[id] ?? CONCERNS.length
    sumSquaredDiff += Math.pow(userRank - frameworkRank, 2)
  }

  return sumSquaredDiff
}

/**
 * Given a participant's ranked concern array (index 0 = most important),
 * returns the framework key with the minimum rank distance.
 *
 * @param {string[]} rankedConcernIds - e.g. ['c3', 'c1', 'c2', 'c4', ...]
 * @returns {string} - one of the keys of FRAMEWORK_PRIORITIES
 */
export function assignFramework(rankedConcernIds) {
  const userRankMap = buildRankMap(rankedConcernIds)

  let bestFramework = null
  let bestDistance = Infinity

  for (const [frameworkKey, priorityArray] of Object.entries(FRAMEWORK_PRIORITIES)) {
    const frameworkRankMap = buildFrameworkRankMap(priorityArray)
    const distance = rankDistance(userRankMap, frameworkRankMap)

    if (distance < bestDistance) {
      bestDistance = distance
      bestFramework = frameworkKey
    }
  }

  return bestFramework
}

/**
 * Returns the option letter that the assigned framework recommends
 * for a given scenario.
 *
 * @param {string} frameworkKey
 * @param {number} scenarioId
 * @returns {string|null} - 'A', 'B', or 'C', or null if not found
 */
export function getFrameworkRecommendation(frameworkKey, scenarioId) {
  return ANSWER_KEY[scenarioId]?.[frameworkKey] ?? null
}