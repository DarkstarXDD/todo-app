import { Search } from "lucide-react"

import { Checkbox } from "@/components/base/Checkbox"
import { SearchField } from "@/components/base/SearchField"
import { Select, SelectItem } from "@/components/base/Select"
import { ToggleButton, ToggleButtonGroup } from "@/components/base/ToggleButton"
import { SORT_KEYS, PRIORITY_KEYS } from "@/helpers/types"
import { useTaskFilters } from "@/hooks/useTaskFilters"

function ToolBar() {
  const {
    search,
    setSearch,
    sort,
    setSort,
    priority,
    setPriority,
    hideCompleted,
    setHideCompleted,
  } = useTaskFilters()

  return (
    <div className="grid gap-4">
      <div className="@container flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="grid gap-4 @md:grid-cols-2 @md:items-start">
          <SearchField
            label="Search Tasks"
            placeholder="Buy groceries"
            leadingIcon={<Search />}
            className="max-w-xs"
            value={search}
            onChange={(value) => setSearch(value)}
          />

          <Select
            label="Sort"
            value={sort}
            onChange={(value) =>
              value && setSort(value as (typeof SORT_KEYS)[number])
            }
            className="max-w-xs"
          >
            <SelectItem id="createdDate">Created Date</SelectItem>
            <SelectItem id="priority">Priority</SelectItem>
            <SelectItem id="dueDate">Due date</SelectItem>
            <SelectItem id="title">Title</SelectItem>
          </Select>
        </div>

        <ToggleButtonGroup
          disallowEmptySelection
          selectedKeys={[priority]}
          onSelectionChange={(keys) => {
            const [value] = keys
            if (value) setPriority(value as (typeof PRIORITY_KEYS)[number])
          }}
        >
          <ToggleButton id="all">All</ToggleButton>
          <ToggleButton id="low">Low</ToggleButton>
          <ToggleButton id="medium">Medium</ToggleButton>
          <ToggleButton id="high">High</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Checkbox isSelected={hideCompleted} onChange={setHideCompleted}>
        Hide completed tasks
      </Checkbox>
    </div>
  )
}

export default ToolBar
