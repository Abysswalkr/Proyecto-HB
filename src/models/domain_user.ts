import { User } from "@supabase/supabase-js";

export interface DomainUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    user: User;
}