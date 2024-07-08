import BoxHeading from './BoxHeading'
import SidebarBtn from './SidebarBtn'

const tabs = ['all', 'starred', 'completed', 'incomplete']

export default function Sidebar({
    filter,
    sidebarOpen,
    changeFilter,
    handleSidebar,
}) {
    return (
        <aside
            className={`${sidebarOpen ? 'bo w-full border-2 border-gradient-start px-8 ' : 'w-0'}  absolute z-20 flex h-full  max-w-[370px] grow flex-col gap-6 overflow-hidden rounded-md bg-box py-9 transition-all duration-300 sm:relative sm:w-auto sm:min-w-[250px] sm:border sm:border-none sm:px-8`}
        >
            <BoxHeading>Filters</BoxHeading>
            <ul className="flex flex-col gap-1 ">
                {tabs.map((tab) => (
                    <li key={tab}>
                        <SidebarBtn
                            handleSidebar={handleSidebar}
                            onClick={changeFilter}
                            active={tab === filter}
                        >
                            {tab}
                        </SidebarBtn>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
