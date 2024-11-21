
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cscedmlehzsfhwojcahv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzY2VkbWxlaHpzZmh3b2pjYWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjM1NTEsImV4cCI6MjA0NzY5OTU1MX0.LrjN_vWgXBd-44eLcxjm1RMizAR55QMhATHCAqIjSU8";//Replit code: process.env['SUPABASE_PUBLIC_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

// !AUTHENTICATION! //
// Sign-Up
async function signUp(email, password, userType) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        throw new Error(error.message);
    }

    // Add user role to the database
    const { error: tableError } = await supabase.from(userType).insert([
        {
            s_id: data.user.id,
            f_name: "Jon", // For now
            l_name: "Jones"
        },
    ]);

    if (tableError) {
        throw new Error(tableError.message);
    }

    return data;
}

// Login
async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// Get User Info
async function getUser() {
    const { data } = await supabase.auth.getUser();
    return data?.user;
}

// Logout Function
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}  


// !DATABASE FUNCTIONS! //
//RIGHT NOW, username will have to represent the first name
async function getStudentInfo(username) {
    const { data, error } = await supabase.from("Student")
                                          .select("*")
                                          .eq("f_name", username);

    if(error){
        console.error("Error fetching student info:", error);
    } else {
        console.log("Student fetched:", data);
        return data[0];
    }
}

//Uses student s_id to get classes the student is registered in
async function getStudentClasses(s_id) {
    const { data, error } = await supabase.from("StudentTakes")
                                            //This should act like a join
                                           .select(`c_code, Class(c_name)`)
                                           .eq("s_id", s_id);

    if (error) {
        console.error("Error fetching classes student is enrolled in:", error);
    } else {
        console.log("Student classes fetched:", data);
        return data;
    }
}

async function getAllClassAssignments(c_code){
    const { data, error } = await supabase.from("Assignment")
                                                .select(`*`)
                                                .eq("c_code", c_code);

    if (error) {
        console.error("Error fetching assignments for a class:", error);
    } else {
        console.log("Assignments fetched:", data);
        return data;
    }
}

async function getAllSubmissions(a_id){
    const { data, error } = await supabase.from("Submission")
                                                .select(`*`)
                                                .eq("a_id", a_id);


    if (error) {
        console.error("Error fetching submissions:", error);
    } else {
        console.log("Submissions fetched:", data);
        return data;
    }
}

async function getSubmission(s_id, a_id){
    const { data, error } = await supabase.from("Submission")
                                                .select(`*`)
                                                .eq("s_id", s_id)
                                                .eq("a_id", a_id);

    if (error) {
        console.error("Error fetching submission:", error);
    } else {
        console.log("Submission fetched:", data);
        return data[0];
    }
}

//RIGHT NOW, username will have to represent the first name
async function getTeacherInfo(username) {
    const { data, error } = await supabase.from("Teacher")
                                          .select("*")
                                          .eq("f_name", username);

    if(error){
        console.error("Error fetching teacher info:", error);
    } else {
        console.log("Teacher fetched:", data);
        return data[0];
    }
}

async function getTeacherClasses(t_id){
    const { data, error } = await supabase.from("Classes")
                                            //This should act like a join
                                           .select(`*`)
                                           .eq("t_id", t_id);

    if (error) {
        console.error("Error fetching classes for teacher:", error);
    } else {
        console.log("Teacher classes fetched:", data);
        return data;
    }
}


//TESTING CODE
// const s_id = (await getStudentInfo("John")).s_id;

// console.log(s_id);

// const c_code = (await getStudentClasses(s_id))[0].c_code;

// console.log(c_code);

// const a_id = (await getAllClassAssignments(c_code))[0].a_id;

// console.log(a_id);

// const submissions = await getAllSubmissions(a_id);
// const submission  = await getSubmission(s_id, a_id);

// console.log(submissions[0].video + " " + submission.video);

// const t_id = (await getTeacherInfo("Jane")).t_id;

// console.log(t_id);

// c_code = (await getTeacherClasses(t_id))[0].c_code;

// console.log(c_code);




export default {
    signUp,
    login,
    getStudentInfo,
    getStudentClasses,
    getAllClassAssignments,
    getSubmission,
    getAllSubmissions,
    getTeacherInfo,
    getTeacherClasses
};