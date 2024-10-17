import { FormEvent } from "react"
import AddIcon from "../Icons/AddIcon"
import SearchIcon from "../Icons/SearchIcon"

interface TaskAddFormProps {
  addTask: (event: FormEvent<HTMLFormElement>) => void,
  openModal: () => void
}

export default function TaskAddForm({ addTask, openModal }: TaskAddFormProps) {
  return(
    <form className="flex flex-col gap-4" onSubmit={addTask}>
      <div className="flex gap-2 flex-col sm:flex-row items-center">
        <input
          autoComplete="off"
          name="tasks"
          className="border-solid border rounded-lg border-purple-950 w-96 outline-none placeholder:text-neutral-500 max-[445px]:w-[85dvw]  px-3 placeholder:py-10 text-white bg-purple-1050 h-10" 
          type="text" 
          placeholder="Add a new task" 
        />

        <div className="flex flex-rowq gap-2">
          <button type="submit" className="bg-violet-500 w-10 h-10 flex rounded-lg justify-center items-center">
            <AddIcon />
          </button>

          <button type="button" onClick={openModal} className="bg-violet-500 h-10 flex rounded-lg justify-center items-center flex-row w-32 gap-2">
            <SearchIcon />
            <span className="text-white">To search</span>
          </button> 
        </div>
      </div>
    </form> 
  )
}