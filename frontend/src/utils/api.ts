import axios from "axios";
import { apiUrl } from "../config";

export const signInRequest = async (email: string, password: string, userType: string) => {
    try {
        const type = userType === 'Organisation' ? 'org' : 'user';
        const res = await axios.post(`${apiUrl}/${type}/signin`, {
            email,
            password,
        });

        if (res.data.success) {
            return { success: true, token: res.data.token };
        } else {
            return { success: false, message: res.data.message };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred" };
    }
};


export const signupRequest = async ({email, password, userType, orgName, orgSector, orgUniqueID, state, fullName}:{email: string, password: string, userType: string, state: string, fullName?: string, orgName?: string, orgUniqueID?: string, orgSector?: string}) => {
    try {
        const type = userType === 'Organisation' ? 'org' : 'user';
        const res = await axios.post(`${apiUrl}/${type}/signup`, {
            email,
            password,
            state,
            fullName,
            orgName,
            orgUniqueID,
            orgSector,
        });

        if (res.data.success) {
            return { success: true, token: res.data.token };
        } else {
            return { success: false, message: res.data.message };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred" };
    }
};
