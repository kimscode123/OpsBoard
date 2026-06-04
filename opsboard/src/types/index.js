// /src/types/index.js

/**
 * @typedef {Object} Task
 * @property {number|string} id
 * @property {string} title
 * @property {string} [description]
 * @property {'low'|'medium'|'high'|number} [priority]
 * @property {'open'|'in_progress'|'done'|'closed'|string} status
 * @property {number|string|null} [assigned_to]
 * @property {string|null} [due_date] ISO 8601 date string
 * @property {string} created_at ISO 8601 date string
 */

/**
 * @typedef {Object} Incident
 * @property {number|string} id
 * @property {string} title
 * @property {'low'|'medium'|'high'|number} severity
 * @property {number|string|null} [reported_by]
 * @property {boolean} resolved
 * @property {string} created_at ISO 8601 date string
 * @property {string|null} [resolved_at] ISO 8601 date string
 * @property {string} [notes]
 */

/**
 * @typedef {Object} KpiSummary
 * @property {string} period e.g. '2026-05' or 'Q1 2026'
 * @property {number} totalTasks
 * @property {number} openTasks
 * @property {number} closedTasks
 * @property {number} incidentsReported
 * @property {number} incidentsResolved
 * @property {Record<string, number>} [breakdown] arbitrary breakdowns e.g. by priority
 */

/**
 * Create a Task object with sensible defaults
 * @param {Partial<Task>} data
 * @returns {Task}
 */
function createTask(data = {}) {
  const now = new Date().toISOString();
  return {
    id: data.id ?? Date.now(),
    title: data.title ?? 'Untitled task',
    description: data.description ?? null,
    priority: data.priority ?? 'medium',
    status: data.status ?? 'open',
    assigned_to: data.assigned_to ?? null,
    due_date: data.due_date ?? null,
    created_at: data.created_at ?? now,
  };
}

/**
 * Create an Incident object with sensible defaults
 * @param {Partial<Incident>} data
 * @returns {Incident}
 */
function createIncident(data = {}) {
  const now = new Date().toISOString();
  return {
    id: data.id ?? Date.now(),
    title: data.title ?? 'Untitled incident',
    severity: data.severity ?? 'medium',
    reported_by: data.reported_by ?? null,
    resolved: data.resolved ?? false,
    created_at: data.created_at ?? now,
    resolved_at: data.resolved_at ?? null,
    notes: data.notes ?? '',
  };
}

/**
 * Create a KpiSummary object
 * @param {Partial<KpiSummary>} data
 * @returns {KpiSummary}
 */
function createKpiSummary(data = {}) {
  return {
    period: data.period ?? new Date().toISOString().slice(0, 7),
    totalTasks: data.totalTasks ?? 0,
    openTasks: data.openTasks ?? 0,
    closedTasks: data.closedTasks ?? 0,
    incidentsReported: data.incidentsReported ?? 0,
    incidentsResolved: data.incidentsResolved ?? 0,
    breakdown: data.breakdown ?? {},
  };
}

module.exports = {
  createTask,
  createIncident,
  createKpiSummary,
};
