import { ChangeEvent } from "react"

interface SearchModalProps {
  searchTask: (event: ChangeEvent<HTMLInputElement>) => void,
  closeModal: () => void,
  searchResults: string,
  allTasks: string[] | undefined
}

export function SearchModal({ searchTask, closeModal, searchResults, allTasks }: SearchModalProps) {
  return (  
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
  )
}