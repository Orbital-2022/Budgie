//import { Button } from "@mui/material";
import React from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();
    const user = supabase.auth.user();
    if (console.log(user.id) === null) {
        return navigate("./");
    }

    return (
        <div>
            <h1>Hello!</h1>
            <button onClick={()=>navigate("/profile")}/> Profile <button/>
        </div>
    )
}
export default MainPage;