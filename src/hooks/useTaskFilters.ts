import { useQueryState, parseAsStringEnum } from "nuqs"

import { SORT_KEYS, PRIORITY_KEYS } from "@/helpers/types"

export function useTaskFilters() {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" })

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringEnum([...SORT_KEYS]).withDefault("createdDate")
  )

  const [priority, setPriority] = useQueryState(
    "priority",
    parseAsStringEnum([...PRIORITY_KEYS]).withDefault("all")
  )

  return { search, setSearch, sort, setSort, priority, setPriority }
}
