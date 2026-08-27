import {
  type Task,
  type Priority,
  SORT_KEYS,
  PRIORITY_KEYS,
} from "@/helpers/types"

type SortKey = (typeof SORT_KEYS)[number]
type PriorityFilter = (typeof PRIORITY_KEYS)[number]

// Map priority string to a number for sorting.
const PRIORITY_RANK: Record<Priority, number> = { low: 1, medium: 2, high: 3 }

// Builds the comparator for the chosen sort key.
function comparatorFor(sort: SortKey): (a: Task, b: Task) => number {
  switch (sort) {
    case "title":
      return (a, b) => a.title.localeCompare(b.title)

    case "priority":
      return (a, b) =>
        (b.priority ? PRIORITY_RANK[b.priority] : 0) -
        (a.priority ? PRIORITY_RANK[a.priority] : 0)

    case "dueDate":
      return (a, b) => {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.localeCompare(b.dueDate)
      }

    case "createdDate":
    default:
      return (a, b) => b.createdAt.localeCompare(a.createdAt)
  }
}

// Filters by priority, then by search string, and then sorts.
function applyTaskFilters(
  tasks: Task[],
  {
    search,
    sort,
    priority,
  }: { search: string; sort: SortKey; priority: PriorityFilter }
): Task[] {
  const query = search.trim().toLowerCase()

  return tasks
    .filter((task) => priority === "all" || task.priority === priority)
    .filter((task) => task.title.toLowerCase().includes(query))
    .sort(comparatorFor(sort))
}

export { applyTaskFilters }
