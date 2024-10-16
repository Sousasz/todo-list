interface TasksToDoProps {
  allTasks: string[] | undefined,
  completeTask: (addedTask: string) => void,
  deleteTask: (addedTask: string) => void
}

export default function TasksToDo({ allTasks, completeTask, deleteTask }: TasksToDoProps) {

  if(allTasks === undefined) {
    return null
  }

  console.log(typeof allTasks)

  return (
    <div className="w-[432px] flex flex-col gap-4 py-4">
        <span className="text-white text-center sm:text-start">Tasks to do - {allTasks?.length}</span>
        <div className="flex flex-col items-center gap-4">
          {allTasks.length > 0 ?  (
            allTasks?.map((addedTasks: string) => {
              return(
                <div key={addedTasks} className="bg-purple-1000 w-full max-[470px]:w-[85dvw] h-20 rounded-lg flex justify-between items-center p-6 mx-2">
                  <span className="text-violet-400 truncate max-w-72">{addedTasks}</span>

                  <div className="flex gap-3">
                    <button onClick={() => completeTask(addedTasks)}>
                      <img className="object-cover" src="./src/assets/images/complete-icon.svg" alt="Complete icon" />
                    </button>

                    <button onClick={() => deleteTask(addedTasks)}>
                      <img className=" object-cover" src="./src/assets/images/delete-icon.svg" alt="Delete icon" />
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            null
          )}
        </div>
      </div>
  )
}