interface completedTasksProps {
  tasksCompleted: string[] | undefined,
  deleteTaskDone: (isTaskCompleted: string) => void
}

export function CompletedTasks({ tasksCompleted, deleteTaskDone }: completedTasksProps) {
  return (
    <div className=" w-[432px] flex flex-col gap-4">
        <span className="text-white">Done - {tasksCompleted?.length}</span>
          {tasksCompleted?.map((isTaskCompleted, index) => {
            return (
              <div key={isTaskCompleted[index]} className="flex justify-between items-center">
                <div className="bg-purple-1000 h-20 w-full rounded-lg flex justify-between items-center p-6">
                  <s className="text-emerald-200 truncate max-w-80">{isTaskCompleted}</s>

                  <div className="flex flex-row-reverse gap-4">
                    <button onClick={() => deleteTaskDone(isTaskCompleted)}>
                      <img className=" object-cover" src="./src/assets/images/delete-icon.svg" alt="Delete icon" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
  )
}