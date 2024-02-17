import { UserRole } from "../../entity/user_role";

export interface UserPayload {
    full_name: string;
    email: string;
    number: string;
    aadhaar_number: string;
    role: number;
    password: string;
}

