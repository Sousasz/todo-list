import { Trash } from "lucide-react"

interface CompletedTasksProps {
  tasksCompleted: string[] | undefined,
  deleteTaskDone: (isTaskCompleted: string) => void
}

export default function CompletedTasks({ tasksCompleted, deleteTaskDone }: CompletedTasksProps) {
  return (
    <div className="w-[432px] flex flex-col gap-4 py-4">
        <span className="text-white text-center sm:text-start">Done - {tasksCompleted?.length}</span>
          <div className="flex flex-col items-center gap-4">
            {tasksCompleted?.map((isTaskCompleted: string, index) => {
              return (
                <div key={index} className="bg-purple-1000 w-full h-20 rounded-lg max-[470px]:w-[85dvw] flex justify-between items-center p-6">
                  <s className="text-emerald-200 truncate max-[465px]:max-w-[250px] max-[375px]:max-w-[190px] max-[310px]:max-w-[120px] max-w-80">{isTaskCompleted}</s>

                  <div className="flex flex-row-reverse gap-4">
                    <button onClick={() => deleteTaskDone(isTaskCompleted)}>
                      <Trash className="object-cover text-violet-500" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
      </div>
  )
}