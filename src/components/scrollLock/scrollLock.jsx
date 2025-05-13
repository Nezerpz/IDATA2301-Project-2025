import { useEffect } from "react";

function scrollLock(WrappedComponent) {
    return function ScrollLockWrapper(props) {
        const { open } = props;

        useEffect(() => {
            if (open) document.body.classList.add("no-scroll");
            return () => document.body.classList.remove("no-scroll");
        }, [open]);

        return <WrappedComponent {...props} />;
    };
}

export default scrollLock;