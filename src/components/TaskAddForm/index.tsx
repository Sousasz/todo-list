import { FormEvent } from "react"

interface TaskAddFormProps {
  addTask: (event: FormEvent<HTMLFormElement>) => void
}

export function TaskAddForm({ addTask }: TaskAddFormProps) {
  return(
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
  )
}