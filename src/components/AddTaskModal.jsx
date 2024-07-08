import { useRef, useState } from 'react'
import Button from './Button'
import { motion } from 'framer-motion'

export default function AddTaskModal({ addTask, handleModal }) {
    const [task, setTask] = useState('')
    const [isImportant, setIsImportant] = useState(false)
    const modalBgRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (task === '') return
        addTask({ task, isImportant })
        handleModal()
    }
    const handleCloseModal = (e) => {
        if (e.target === modalBgRef.current) handleModal()
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-hidden bg-slate-50/10 px-6 backdrop-blur-sm"
            ref={modalBgRef}
            onClick={handleCloseModal}
        >
            <motion.form
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                transition={{ duration: 0.3, type: 'spring', bounce: 0.3 }}
                onSubmit={handleSubmit}
                className="flex w-full max-w-[400px] flex-col gap-20 rounded-md bg-box px-8 py-6 pt-12"
            >
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        autoFocus
                        className="focus:custom-shadow w-full rounded-md border-accent bg-task-bg px-6 py-2 text-lg outline-none transition-all duration-150"
                        placeholder="Task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />

                    <div className="relative z-10 flex items-center gap-1 px-1">
                        <label
                            className="relative flex cursor-pointer items-center rounded-full p-1"
                            htmlFor={'important'}
                        >
                            <input
                                type="checkbox"
                                checked={isImportant}
                                onChange={() => setIsImportant(!isImportant)}
                                className="before:content[''] before:bg-blue-gray-500 peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-text bg-gray-900/10 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-6 before:w-6 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-text checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                                id={'important'}
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
                        <label htmlFor="important" className=" cursor-pointer">
                            Important
                        </label>
                    </div>
                </div>
                <div className=" flex justify-between">
                    <button onClick={handleModal} type="button">
                        Cancel
                    </button>
                    <Button>Add</Button>
                </div>
            </motion.form>
        </motion.div>
    )
}
