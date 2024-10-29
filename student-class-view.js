function goStudentHome(){
    //This is temporary
    window.location.href = "dashboard.html";
}

let videoDropArea = document.getElementById("drop-area");
let videoPlayer = document.getElementById("video-player");

videoDropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    videoDropArea.style.borderColor = "blue"; 
});

videoDropArea.addEventListener("dragleave", () => {
    videoDropArea.style.borderColor = "grey"; 
});

function displayVideo(files){
    if(files.length > 1){
        alert("Cannot submit more than one file");
        return;
    } else if(files.length < 1){
        alert("No files submitted");
        return;
    } else if(!files[0].type.startsWith("video/")){
        alert("Please submit a video file");
        return;
    }

    videoPlayer.src = URL.createObjectURL(files[0]);
    videoDropArea.style.display = "none";
    videoPlayer.style.display = "block";
    document.getElementById("submission-control").style.visibility = "visible";
}

videoDropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    videoDropArea.style.borderColor = "grey";
    displayVideo(e.dataTransfer.files);
});

document.getElementById("assignment-video").addEventListener("change", (e) => {
    displayVideo(e.target.files);
});

function submitVideo(){
    //To be implemented
    alert("Assignment submitted");
    document.getElementById("grade-status").style.display = "block";
}

function removeVideo(){
    videoPlayer.src = null;
    videoPlayer.style.display = "none"

    videoDropArea.style.display = "flex"
    document.getElementById("submission-control").style.visibility = "hidden";
}


//Assuming these are coming from a database
let assignments = [
    ["A01", "11/30", "11:59pm", null],
    ["A02", "11/30", "11:59pm", null],
    ["A03", "11/30", "11:59pm", null],
    ["A04", "11/30", "11:59pm", null],
    ["A05", "11/30", "11:59pm", null],
    ["A06", "11/30", "11:59pm", null],
    ["A07", "11/30", "11:59pm", null],
    ["A08", "11/30", "11:59pm", null],
    ["A09", "11/30", "11:59pm", null],
    ["A10", "11/30", "11:59pm", null],
    ["A11", "11/30", "11:59pm", "A"],
    ["A12", "11/30", "11:59pm", null],
    ["A13", "11/30", "11:59pm", null],
    ["A14", "11/30", "11:59pm", null],
    ["A15", "11/30", "11:59pm", null],
    ["A16", "11/30", "11:59pm", null],
    ["A17", "11/30", "11:59pm", null],
    ["A18", "11/30", "11:59pm", null],
    ["A19", "11/30", "11:59pm", null],
    ["A20", "11/30", "11:59pm", null],
    ["A21", "11/30", "11:59pm", null],
    ["A22", "11/30", "11:59pm", null],
    ["A26", "11/30", "11:59pm", null]
];

function displayAssignment(assignmentName){
    let assignment = assignments.find(a => a[0] === assignmentName);
    if(assignment === undefined){
        alert("Error: assignment not found");
        return;
    }
    document.getElementById("assignment-name").innerText = assignment[0];
    document.getElementById("due-date").innerText = `Due: ${assignment[1]} ${assignment[2]}`;
    //Check if assignment has a grade
    document.getElementById("grade-status").innerText = assignment[3] === null ? "Not Graded" : `Grade: ${assignment[3]}`;
    document.getElementById("assignment-submission").style.display = "flex";
    document.getElementById("placeholder").style.display = "none";

}

function displayAllAssignments(){
    let assignmentList = document.getElementById("assignment-list");
    for(a of assignments){
        assignmentList.innerHTML += `
        <button class="assignment" onclick="displayAssignment('${a[0]}')">
            ${a[0]}
        </button>
        `;
    }
}

function showAssignmentTab(){
    document.getElementsByClassName("assignment-area")[0].style.display = 'block';
    document.getElementById("assignment-submission").style.display = 'none';
}

function showSubmissionTab(){
    document.getElementsByClassName("assignment-area")[0].style.display = 'none';
    document.getElementById("assignment-submission").style.display = 'block';
}

displayAllAssignments();