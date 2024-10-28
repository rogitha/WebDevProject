function goStudentHome(){
    //This is temporary
    window.location.href = "dashboard.html";
}


function displayVideo(files){
    //To be implemented
    return;
}

//Assuming these are coming from a database
let submissions = [
    ["A01", "11/30", "11:00pm", "John Doe", null],
    ["A01", "11/30", "11:00pm", "John Doe", null],
    ["A01", "11/30", "11:00pm", "John Doe", null],
    ["A01", "11/30", "11:00pm", "John Doe", null],
    ["A01", "11/30", "11:00pm", "John Doe", null],
    ["A01", "11/30", "11:00pm", "John Doe", null],
    ["A07", "11/30", "11:00pm", "John Doe", null],
    ["A08", "11/30", "11:00pm", "John Doe", null],
    ["A09", "11/30", "11:00pm", "John Doe", null],
    ["A10", "11/30", "11:00pm", "John Doe", null],
    ["A11", "11/30", "11:00pm", "John Doe", null],
    ["A12", "11/30", "11:00pm", "John Doe", null],
    ["A13", "11/30", "11:00pm", "John Doe", null],
    ["A14", "11/30", "11:00pm", "John Doe", null],
    ["A15", "11/30", "11:00pm", "John Doe", null],
    ["A16", "11/30", "11:00pm", "John Doe", null],
    ["A17", "11/30", "11:00pm", "John Doe", null],
    ["A18", "11/30", "11:00pm", "John Doe", null],
    ["A19", "11/30", "11:00pm", "John Doe", null],
    ["A20", "11/30", "11:00pm", "John Doe", null],
    ["A21", "11/30", "11:00pm", "John Doe", null],
    ["A22", "11/30", "11:00pm", "John Doe", null],
    ["A26", "11/30", "11:00pm", "John Doe", null]
];

function displayAssignment(assignmentName){
    let submission = submissions.filter(s => s[0] === assignmentName);
    if(submission === undefined){
        alert("Error: no submissions found");
        return;
    }
    document.getElementById("assignment-name").innerText = assignmentName;
    //This will have to get changed based on our database
    document.getElementById("due-date").innerText = `Due: ${submission[0][1]} ${submission[0][2]}`;

    displayAllSubmissions(submission);

    document.getElementById("assignment-submission").style.display = "flex";
    document.getElementById("placeholder").style.display = "none";
}

function displayAllAssignments(){
    let assignmentList = document.getElementById("assignment-list");
    for(a of submissions){
        assignmentList.innerHTML += `
        <button class="assignment" onclick="displayAssignment('${a[0]}')">
            ${a[0]}
        </button>
        `;
    }
}

function displaySubmission(submission){
    //To be implemented
    return;
}

function displayAllSubmissions(submission){
    let submissionList = document.getElementById("submission-list");
    //Clear the submission list
    submissionList.innerHTML = '';
    for(s of submission){
        submissionList.innerHTML +=  `<button class="submission" onclick="displaySubmission('${s[3]}')">
                                        <div style="display:flex; justify-content: space-between; padding:5px;"><h5>${s[3]}</h5> ${s[1]} ${s[2]}</div>
                                    </button>
                                    `;
    }
}

displayAllAssignments();
