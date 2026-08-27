import { db } from "@/db/db"
import { CreateTag } from "@/helpers/types"

// ------------------------- Create Tag -------------------------------
function createTag({
  userId,
  tagData,
}: {
  userId: string
  tagData: CreateTag
}) {
  const now = new Date().toISOString()

  return db.tags.add({
    id: crypto.randomUUID(),
    userId,
    name: tagData.name,
    createdAt: now,
  })
}

// ------------------------- Fetch Tags -------------------------------
function getTagsForUser({ userId }: { userId: string }) {
  return db.tags.where("userId").equals(userId).toArray()
}

// ------------------------- Delete Tag If Unused -------------------------------
// Removes the tag only if no task references it anymore.
// The count + delete run in one transaction so a task can't reference the tag
// in between the check and the deletion.
function deleteTagIfUnused({ tagId }: { tagId: string }) {
  return db.transaction("rw", db.tags, db.tasks, async () => {
    const referencingCount = await db.tasks
      .where("tagIds")
      .equals(tagId)
      .count()

    if (referencingCount === 0) {
      await db.tags.delete(tagId)
    }
  })
}

export { createTag, getTagsForUser, deleteTagIfUnused }
