export default function SidebarBtn({
    children,
    active,
    onClick,
    handleSidebar,
}) {
    // console.log(active)
    return (
        <button
            onClick={() => {
                handleSidebar()
                onClick(children)
            }}
            className={`capitalize ${active ? 'bg-task-bg' : ''} w-full rounded-md px-4 py-1.5 text-left text-lg text-accent-light transition-all duration-300 hover:bg-task-bg/70 active:scale-95`}
        >
            {children}
        </button>
    )
}
