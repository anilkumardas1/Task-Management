import { useSelector } from "react-redux";

export const useUser = () => {
    return useSelector((state) => state.userSliceName?.user || null);
}