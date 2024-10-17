import { useState, FormEvent, ChangeEvent } from "react"
import TaskAddForm from "./components/TaskAddForm";
import SearchModal from "./components/SearchModal";
import TasksToDo from "./components/TasksToDo";
import CompletedTasks from "./components/completedTasks";
import Logo from "./components/Icons/Logo";

export default function App() {

  const [ allTasks, setAllTasks ] = useState<string[] | undefined>([])
  const [ tasksCompleted, setTasksCompleted ] = useState<string[] | undefined>([]);
  const [ searchResults, setSearchResults ] = useState("")
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
      <Logo />
      <div className="flex gap-2 flex-col ">
        <TaskAddForm 
          addTask={addTask}
          openModal={openModal}
        />

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