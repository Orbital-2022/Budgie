//import { Button } from "@mui/material";
import React from "react";
import SideNav from "../components/SideNav/SideNav";
import Display from "../components/Display/Display";
import { supabase } from '../config/supabaseClient';

function MainPage() {
    return (
        <div>
            <SideNav />
            <Display user = {supabase.auth.user()}/>            
        </div>
    )
}
export default MainPage;