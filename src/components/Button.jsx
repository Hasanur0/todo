export default function Button({ children, onClick }) {
    return (
        <button
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className="from-gradient-start to-gradient-end rounded-full bg-gradient-to-br px-7 py-2.5 shadow-md transition-all duration-150 active:scale-95"
        >
            {children}
        </button>
    )
}
