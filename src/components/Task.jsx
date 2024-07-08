import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Task({
    task,
    updateTaskComplete,
    updateTaskStarred,
    deleteTask,
    handleEditTask,
}) {
    const inputRef = useRef()
    const [isEditing, setIsEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const handleDelete = async (e) => {
        e?.stopPropagation()
        setDeleting(true)
        await new Promise((resolve) => setTimeout(resolve, 300))
        deleteTask(task.id)
    }
    const handleEditing = () => {
        if (inputRef.current?.value === '') handleDelete()
        setIsEditing(!isEditing)
    }

    return (
        <AnimatePresence>
            {!deleting && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                        // stiffness: 100,
                    }}
                    className="group relative flex select-none rounded-md bg-task-bg text-text shadow-lg transition-all duration-150 hover:scale-[1.02]"
                    onClick={(e) => {
                        e.stopPropagation()
                        updateTaskComplete(task.id)
                    }}
                >
                    <div className="relative z-10 inline-flex items-center px-1">
                        <label
                            className="relative flex cursor-pointer items-center rounded-full p-2.5"
                            htmlFor={task.id}
                        >
                            <input
                                type="checkbox"
                                checked={task.complete}
                                onChange={() => {}}
                                className="before:content[''] before:bg-blue-gray-500 peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-text bg-gray-900/10 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-text checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                                id={task.id}
                            />
                            <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-accent opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                        </label>
                    </div>
                    <label
                        htmlFor={task.id}
                        className={`${task.complete ? 'line-through' : ''} inset-0 left-0 flex h-full w-full cursor-pointer flex-wrap items-center rounded-md bg-task-bg py-2 pl-0 pr-5 text-lg tracking-wide`}
                        onClick={() => {
                            updateTaskComplete(task.id)
                        }}
                    >
                        {!isEditing ? task.content : ''}
                        {isEditing && (
                            <form
                                className="w-full"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleEditing(e)
                                }}
                            >
                                <input
                                    ref={inputRef}
                                    autoFocus
                                    type="text"
                                    value={task.content}
                                    onBlur={(e) => handleEditing(e)}
                                    className="w-full rounded-sm border border-accent bg-task-bg px-3 py-0.5 outline-none"
                                    onChange={(e) => {
                                        handleEditTask(task.id, e.target.value)
                                    }}
                                />
                            </form>
                        )}
                        <div className="ml-auto flex items-center gap-2 pl-3">
                            <button
                                className="group/btn p-0.5 opacity-0 transition-all  duration-300 group-hover:opacity-100"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleEditing()
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5 transition-all duration-300  group-hover/btn:stroke-accent "
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                </svg>
                            </button>
                            <button
                                className="group/btn p-0.5 opacity-0 transition-all duration-300 group-hover:opacity-100"
                                onClick={handleDelete}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5 transition-all duration-300 group-hover/btn:stroke-accent"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </button>
                            <button
                                className="h-100% group/btn p-0.5"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    updateTaskStarred(task.id)
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    className={`h-6 w-6 ${task.starred ? 'fill-accent stroke-accent group-hover/btn:fill-none group-hover/btn:stroke-current' : 'stroke-current group-hover/btn:fill-accent  group-hover/btn:stroke-accent'} transition-all duration-300 group-hover/btn:fill-accent  group-hover/btn:stroke-accent `}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </label>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
