import { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import AddTaskModal from './components/AddTaskModal'
import { AnimatePresence, motion } from 'framer-motion'

export default function App() {
    const [tasks, setTasks] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        if (localStorage.getItem('tasks') && tasks.length > 0)
            saveTasksToLocalStorage(tasks)
    }, [tasks])

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks))
        }
        // if (tasks.length > 0) saveTasksToLocalStorage(tasks)
    }, [])

    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }
    const handleModal = () => {
        setModalOpen(!modalOpen)
    }
    const updateTaskComplete = (id) => {
        setTasks((prev) => {
            return prev.map((task) => {
                if (task.id === id) return { ...task, complete: !task.complete }
                else return task
            })
        })
    }
    const updateTaskStarred = (id) => {
        setTasks((prev) => {
            return prev.map((task) => {
                if (task.id === id) return { ...task, starred: !task.starred }
                else return task
            })
        })
    }
    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
        saveTasksToLocalStorage(tasks.filter((task) => task.id !== id))
    }
    const addTask = ({ task, isImportant }) => {
        console.log(task, isImportant)
        const newTask = {
            id: Math.random(),
            content: task,
            complete: false,
            starred: isImportant,
        }
        setTasks((prev) => [newTask, ...prev])
    }
    const handleEditTask = (id, content) => {
        setTasks((prev) => {
            return prev.map((task) => {
                if (task.id === id) return { ...task, content: content }
                else return task
            })
        })
    }
    const changeFilter = (filter) => {
        console.log(filter)
        setFilter(filter)
    }
    const filterTasks = (tasks) => {
        return tasks.filter((task) => {
            if (filter === 'all') return true
            if (filter === 'starred') return task.starred
            if (filter === 'completed') return task.complete === true
            if (filter === 'incomplete') return task.complete === false
        })
    }
    return (
        <div className="min-h-dvh bg-bg text-text">
            <div className="container mx-auto grid max-w-[1100px] gap-12 px-6 py-6">
                <Header
                    sidebarOpen={sidebarOpen}
                    handleSidebar={handleSidebar}
                />
                <Main>
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        filter={filter}
                        handleSidebar={handleSidebar}
                        changeFilter={changeFilter}
                    />
                    <Tasks
                        tasks={filterTasks(tasks)}
                        updateTaskComplete={updateTaskComplete}
                        handleModal={handleModal}
                        updateTaskStarred={updateTaskStarred}
                        deleteTask={deleteTask}
                        handleEditTask={handleEditTask}
                    />
                </Main>
            </div>
            <AnimatePresence mode="sync">
                {modalOpen && (
                    <AddTaskModal handleModal={handleModal} addTask={addTask} />
                )}
            </AnimatePresence>
        </div>
    )
}
