import { useState, FormEvent } from "react"

export function App() {
  const [ allTasks, setAllTasks ] = useState<string[] | undefined>([])
  const [ tasksCompleted, setTasksCompleted ] = useState<string[] | undefined>([]);

  localStorage.setItem("tasks", JSON.stringify(allTasks))
  localStorage.setItem("tasksDone", JSON.stringify(tasksCompleted))

  function addTask(event: FormEvent<HTMLFormElement>) {
    let duplicate = false

    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const inputValue = data.get("tasks")?.toString()

    if(inputValue === undefined) {
      return null
    }

    if(inputValue === '') {
      return
    }

    allTasks?.forEach((tasks: string) => {
      if(inputValue === tasks) {
        duplicate = true
      }
    })

    if(duplicate) {
      return null
    } else {
      setAllTasks([...allTasks, inputValue])
    }
    
    event.currentTarget.reset()
  }

  function deleteTask(deletedTask: string) {
    const newTasksList = allTasks?.filter((addedTask: string) => {
      return addedTask !== deletedTask;
    })

    setAllTasks([...newTasksList])
  } 

  function completeTask(taskInList: string) {
    const newTasksListForDone = allTasks?.filter(taskDone => {
      return taskDone !== taskInList
    })

    allTasks?.forEach((taskDone) => {
      if(taskDone === taskInList) {
        setTasksCompleted([...tasksCompleted, taskDone])
      }
    })

    setAllTasks([...newTasksListForDone])
  }

  return (
    <div className="flex items-center flex-col py-16 gap-16 selection:bg-violet-600">
      <form onSubmit={addTask}>
        <div className="flex gap-2">
          <input
            autoComplete="off"
            name="tasks"
            className="border-solid border rounded-lg border-purple-950 w-96 outline-none placeholder:text-neutral-500  px-3 placeholder:py-10 text-white bg-purple-1050 h-10" 
            type="text" 
            placeholder="Add a new task" 
          />
          <button type="submit" className="bg-violet-500 w-10 h-10 flex rounded-lg justify-center items-center">
            <img src="./src/assets/images/add-icon.svg" alt="Add icon" />
          </button>
        </div>
      </form>

      <div className=" w-[432px] flex flex-col gap-4">
        <span className="text-white">Tasks to do - {allTasks?.length}</span>
        {allTasks.length > 0 ? (
          allTasks?.map(addedTasks => {
            return(
              <div key={addedTasks} className="bg-purple-1000 w-full h-20 rounded-lg flex justify-between items-center p-6">
                <span className="text-violet-400 truncate">{addedTasks}</span>

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

      <div className=" w-[432px] flex flex-col gap-4">
        <span className="text-white">Done - {tasksCompleted?.length}</span>
          {tasksCompleted?.map(isTaskCompleted => {
            return (
              <div key={isTaskCompleted} className="bg-purple-1000 w-full h-20 rounded-lg flex justify-between items-center p-6">
                <s className="text-emerald-200 truncate">{isTaskCompleted}</s>
              </div>
            )
          })}
      </div>
    </div>
  )
}