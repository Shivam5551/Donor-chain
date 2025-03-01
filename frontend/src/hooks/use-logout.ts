import { useNavigate } from "react-router-dom";

export const useLogoutHandler = () => {
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };
};
