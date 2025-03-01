import { useEffect } from "react";

export const useMenu = (setIsOpen: (value: boolean) => void, menuRef: React.RefObject<HTMLDivElement>) => {

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen, menuRef]);
};
