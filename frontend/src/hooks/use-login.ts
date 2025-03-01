import { useNavigate } from "react-router-dom";

export const useLoginHandler = () => {
    const navigate = useNavigate();

    return () => {
        navigate('/signin');
    };
};
