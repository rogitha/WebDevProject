
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cscedmlehzsfhwojcahv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzY2VkbWxlaHpzZmh3b2pjYWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjM1NTEsImV4cCI6MjA0NzY5OTU1MX0.LrjN_vWgXBd-44eLcxjm1RMizAR55QMhATHCAqIjSU8";//Replit code: process.env['SUPABASE_PUBLIC_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

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
                                            //This should act like a joing
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


//TESTING CODE
const s_id = (await getStudentInfo("John")).s_id;

console.log(s_id);

const c_code = (await getStudentClasses(s_id))[0].c_code;

console.log(c_code);

const a_id = (await getAllClassAssignments(c_code))[0].a_id;

console.log(a_id);

const submissions = await getAllSubmissions(a_id);
const submission  = await getSubmission(s_id, a_id);

console.log(submissions[0].video + " " + submission.video);




export default {
    getStudentInfo,
    getStudentClasses,
    getAllClassAssignments,
    getSubmission,
    getAllSubmissions,
    getTeacherInfo,
    // getTeacherSubmissions
};