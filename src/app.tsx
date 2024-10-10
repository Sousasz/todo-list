import { useState, FormEvent, ChangeEvent } from "react"

export function App() {
  const [ allTasks, setAllTasks ] = useState<string[] | undefined>([])
  const [ tasksCompleted, setTasksCompleted ] = useState<string[] | undefined>([]);
  const [ searchResults, setSearchResults ] = useState<string>("")
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setSearchResults("")
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    let duplicate = false

    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const inputValue = data.get("tasks")?.toString()

    if(inputValue === "" || inputValue === undefined) {
      return undefined
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

  function deleteTaskDone(taskDone: string) {
    const newTaskDoneList = tasksCompleted?.filter((addedTaskDone: string) => {
      return addedTaskDone !== taskDone
    })

    setTasksCompleted([...newTaskDoneList])
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

  function searchTask(event: ChangeEvent<HTMLInputElement>) {
    const searchInputValue = event.target.value
    setSearchResults(searchInputValue)
  }

  return (
    <div className="flex items-center flex-col py-16 gap-16 selection:bg-violet-600">
      <div className="flex flex-row gap-2">
        <form className="flex flex-col gap-4" onSubmit={addTask}>
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

        <button type="button" onClick={openModal} className="bg-violet-500 h-10 flex rounded-lg justify-center items-center flex-row w-32 gap-2">
          <img src="./src/assets/images/search-icon.svg" className="w-5 h-5" alt="Search icon" />
          <span className="text-white">To search</span>
        </button>

        {isModalOpen && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-65">
            <div className="bg-purple-1050 border border-[#2B2730] w-[615px] h-[590px] rounded-[36px] p-14 flex flex-col gap-8">
              <form action="#" className="flex justify-center gap-5">
                <section className="flex flex-col gap-8">
                  <h3 className="text-white font-semibold text-2xl">Search your tasks</h3>

                  <input
                    onChange={searchTask}
                    autoComplete="off"
                    name="search-tasks"
                    className="border-solid border rounded-lg border-purple-950 w-[432px] outline-none placeholder:text-neutral-500 px-3 placeholder:py-10 text-white bg-purple-1050 h-10" 
                    type="text"
                    placeholder="Search a task" 
                  />
                </section>

                <button onClick={closeModal} className="w-5 h-5 -my-2">
                  <img 
                    src="./src/assets/images/close-modal.svg" 
                    alt="Close modal icon" 
                  />
                </button>
              </form>
              
              <section className="flex-1 flex flex-col gap-4 justify-center items-center overflow-y-scroll">
                {searchResults !== "" && allTasks?.length !== 0 ? (
                  allTasks?.filter((addedTask: string) => {
                    return addedTask.toLowerCase().includes(searchResults.toLowerCase()) 
                  }).map((results: string) =>
                    <div key={results} className="bg-purple-1000 w-full h-20 rounded-lg flex justify-between items-center p-6">
                      <span className="text-violet-400 truncate max-w-72">{results}</span>
                    </div>
                  )
                ) : (
                  <>
                    <img src="./src/assets/images/modal-list.svg" alt="to do list image" />
                    <p className="text-neutral-500">Your tasks will appear here</p>
                  </>
                )}
              </section>
            </div>
          </div>
        )}
      </div>
      

      <div className=" w-[432px] flex flex-col gap-4">
        <span className="text-white">Tasks to do - {allTasks?.length}</span>
        {allTasks.length > 0 ? (
          allTasks?.map((addedTasks: string) => {
            return(
              <div key={addedTasks} className="bg-purple-1000 w-full h-20 rounded-lg flex justify-between items-center p-6">
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
    </div>
  )
}