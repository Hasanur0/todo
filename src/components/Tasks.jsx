import BoxHeading from './BoxHeading'
import Button from './Button'
import Task from './Task'

export default function Tasks({
    tasks,
    handleModal,
    updateTaskComplete,
    updateTaskStarred,
    deleteTask,
    handleEditTask,
}) {
    return (
        <section className="flex min-h-[700px] grow flex-col gap-6 overflow-hidden rounded-md bg-box px-8 py-9">
            <BoxHeading>Tasks</BoxHeading>

            <div className="grid gap-3">
                {tasks.length === 0 && (
                    <div>
                        <span>Click the </span>
                        <Button onClick={handleModal}>Add Task</Button>{' '}
                        <span>button below to get started</span>
                    </div>
                )}
                {tasks.map((task) => (
                    <Task
                        layout
                        key={task.id}
                        task={task}
                        updateTaskComplete={updateTaskComplete}
                        updateTaskStarred={updateTaskStarred}
                        deleteTask={deleteTask}
                        handleEditTask={handleEditTask}
                    />
                ))}
            </div>
            <div className="mt-auto flex justify-end">
                <Button onClick={handleModal}>Add Task</Button>
            </div>
        </section>
    )
}
