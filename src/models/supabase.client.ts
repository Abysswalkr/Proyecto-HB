import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { environment } from "../environments/environment";

export class Supabase {
    private static instance: SupabaseClient;

    private constructor() { }

    public static getInstance(): SupabaseClient {
        if (!Supabase.instance) {
            Supabase.instance = createClient(environment.supabaseUrl, environment.supabaseKey);
        }

        return Supabase.instance;
    }
}