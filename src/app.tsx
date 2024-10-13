import { useState, FormEvent, ChangeEvent, useEffect } from "react"
import { TaskAddForm } from "./components/TaskAddForm";
import { SearchModal } from "./components/SearchModal";
import { TasksToDo } from "./components/TasksToDo";
import { CompletedTasks } from "./components/completedTasks";

export function App() {

  const [ allTasks, setAllTasks ] = useState<string[] | undefined>([])
  const [ tasksCompleted, setTasksCompleted ] = useState<string[] | undefined>([]);
  const [ searchResults, setSearchResults ] = useState("")
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  useEffect(() => {
    const tasksToDo = localStorage.getItem("tasks")
    const convertTaskToDo = JSON.parse(tasksToDo)


    if(convertTaskToDo) {
      setAllTasks(convertTaskToDo)
    } else {
      setAllTasks([])
    }
  }, [])

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
      return null
    }

    allTasks?.forEach((tasks: string) => {
      if(inputValue === tasks) {
        duplicate = true
      }
    })

    if(allTasks === undefined) {
      return null
    }

    if(duplicate) { 
      return null
    } else {
      setAllTasks([...allTasks, inputValue])
    }

    localStorage.setItem("tasks", JSON.stringify([...allTasks, inputValue]))  
    event.currentTarget.reset()
  }

  function deleteTaskDone(taskDone: string) {
    const newTaskDoneList = tasksCompleted?.filter((addedTaskDone: string) => {
      return addedTaskDone !== taskDone
    })

    if(newTaskDoneList === undefined) {
      return null
    }

    setTasksCompleted([...newTaskDoneList])

  }

  function deleteTask(deletedTask: string) {
    const newTasksList = allTasks?.filter((addedTask: string) => {
      return addedTask !== deletedTask;
    })

    if(newTasksList === undefined) {
      return null
    }

    setAllTasks([...newTasksList])
  } 

  function completeTask(taskInList: string) {
    const newTasksListForDone = allTasks?.filter(taskDone => {
      return taskDone !== taskInList
    })

    allTasks?.forEach((taskDone) => {
      if(taskDone === taskInList) {
        if(tasksCompleted === undefined) {
          return null
        }

        setTasksCompleted([...tasksCompleted, taskDone])
      }
    })

    

    if(newTasksListForDone === undefined) {
      return null
    }

    setAllTasks([...newTasksListForDone])
  }

  function searchTask(event: ChangeEvent<HTMLInputElement>) {
    const searchInputValue = event.target.value
    setSearchResults(searchInputValue)
  }

  return (
    <div className="flex items-center flex-col py-16 gap-16 selection:bg-violet-600">
      <img src="./src/assets/images/Logo.svg" alt="Logo" />
      <div className="flex flex-row gap-2">
        <TaskAddForm 
          addTask={addTask}
        />

        <button type="button" onClick={openModal} className="bg-violet-500 h-10 flex rounded-lg justify-center items-center flex-row w-32 gap-2">
          <img src="./src/assets/images/search-icon.svg" className="w-5 h-5" alt="Search icon" />
          <span className="text-white">To search</span>
        </button>

        {isModalOpen && (
          <SearchModal
            searchTask={searchTask}
            closeModal={closeModal}
            searchResults={searchResults}
            allTasks={allTasks}
          />
        )}
      </div>
      
      <TasksToDo 
        allTasks={allTasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
      />

      <CompletedTasks
        tasksCompleted={tasksCompleted}
        deleteTaskDone={deleteTaskDone}
      />
    </div>
  )
}