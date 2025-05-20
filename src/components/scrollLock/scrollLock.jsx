import { useEffect } from "react";

function scrollLock(WrappedComponent) {
    return function ScrollLockWrapper(props) {
        const { open, onClose } = props;

        useEffect(() => {
            const handleKeyDown = (event) => {
                if (event.key === "Escape" && open) {
                    onClose(); // Call the close function when Escape is pressed
                }
            };

            if (open) {
                document.body.classList.add("no-scroll");
                window.addEventListener("keydown", handleKeyDown);
            }

            return () => {
                document.body.classList.remove("no-scroll");
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [open, onClose]);

        return <WrappedComponent {...props} />;
    };
}

export default scrollLock;