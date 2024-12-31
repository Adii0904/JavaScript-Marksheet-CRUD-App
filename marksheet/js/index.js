window.onload = function() {
    window.jsPDF = window.jspdf.jsPDF;
    var doc = jsPDF();

    // Adding subject field
    var addSubjectBtn = document.getElementById("add-subjects");
    addSubjectBtn.onclick = function() {
        var div = document.createElement("div");
        div.id = "horizontal";

        // subject
        var subject = document.createElement("input");
        subject.name = "subject";
        subject.placeholder = "Subject Name";
        subject.type = "text";
        subject.className = "subjects"

        // fullmarks
        var fullmarks = document.createElement("input");
        fullmarks.name = "fullmarks";
        fullmarks.placeholder = "Fullmarks";
        fullmarks.type = "number";
        fullmarks.value = 100;
        fullmarks.className = "fullmarks"

        // obtained marks
        var obtainedMarks = document.createElement("input");
        obtainedMarks.name = "obtainedMarks";
        obtainedMarks.placeholder = "Obtained Marks";
        obtainedMarks.type = "number";
        obtainedMarks.className = "obtained-marks";

        // Delete button
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
        deleteButton.className = "delete-button";
        deleteButton.type = "button";

        // Adding input inside div tag
        div.append(subject);
        div.append(fullmarks);
        div.append(obtainedMarks);
        div.append(deleteButton);

        // Adding div tag to form
        var dynamicArea = document.getElementById("dynamic-area");
        dynamicArea.append(div);

        // Creating subject tr
        var subjectTr = document.createElement("tr");
        subjectTr.style.textAlign = "center";

        var subjectTd = document.createElement("td");
        subjectTd.setAttribute("colspan","3");

        var fullmarksTd = document.createElement("td");
        fullmarksTd.innerHTML = 100;

        var obtainedTd = document.createElement("td");
        obtainedTd.setAttribute("colspan","2");

        subjectTr.append(subjectTd);
        subjectTr.append(fullmarksTd);
        subjectTr.append(obtainedTd);

        var subjectBody = document.getElementById("subject-body");
        subjectBody.append(subjectTr);

        // Live preview subject and marks entry
        subject.oninput = function() {
            subjectTd.innerHTML = this.value;
        }

        fullmarks.oninput = function() {
            fullmarksTd.innerHTML = this.value;
        }

        obtainedMarks.oninput = function() {
            obtainedTd.innerHTML = this.value;

            // Calculate total marks
            var totalMarks = 0;
            var obm = document.getElementsByClassName("obtained-marks");
            for(var i=0; i<obm.length; i++)
            {
                var num = Number(obm[i].value);
                totalMarks = totalMarks+num;
            }

            var totalMarksTd = document.getElementById("total-marks");
            totalMarksTd.innerHTML = totalMarks;

            // Calculate percentage
            var noOfSubjects = obm.length;
            var percentage = parseInt(totalMarks/noOfSubjects);
            var percentageTd = document.getElementById("percentage");
            percentageTd.innerHTML = percentage+'%';

            // Finding grade
            var grade = '';
            if(percentage > 90) grade = 'A+';

            else if(percentage > 80) grade = 'A';

            else if(percentage > 70) grade = 'B+';

            else if(percentage > 60) grade = 'B';

            else if(percentage > 50) grade = 'C';

            else if(percentage > 40) grade = 'D';

            else grade = 'E';

            var gradeTd = document.getElementById("grade");
            gradeTd.innerHTML = grade;
        }


        // Deleting row
        deleteButton.onclick = function() {
            div.remove();
            subjectTr.remove();
        }
    }

    // Upload and Preview student image
    var studentPicInput = document.getElementById("student-pic-input");
    studentPicInput.onchange = function() {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        var studentPic = document.getElementById("student-pic");
        studentPic.src = url;
    }
    
    // Upload and Preview school logo
    var schoolLogoInput = document.getElementById("school-logo-input");
    schoolLogoInput.onchange = function() {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        var schoolLogo = document.getElementById("school-logo");
        schoolLogo.src = url;
    }

    // Live preview school name
    var schoolNameInput = document.getElementById("school-name-input");
    schoolNameInput.oninput = function() {
        var schoolName = document.getElementById("school-name");
        schoolName.innerHTML = this.value;
    }

    // Tagline live preview
    var taglineInput = document.getElementById("tagline");
    taglineInput.oninput = function() {
        var tagline = document.getElementById("tagline-text");
        tagline.innerHTML = this.value;
    }

    // Candidate name live preview
    var candidatenameInput = document.getElementById("candidate-name-input");
    candidatenameInput.oninput = function() {
        var candidateName = document.getElementById("candidate-name");
        candidateName.innerHTML = this.value;
    }

    // Fathers name live preview
    var fathersNameInput = document.getElementById("fathers-name-input");
    fathersNameInput.oninput = function() {
        var fathersName = document.getElementById("fathers-name");
        fathersName.innerHTML = this.value;
    }

    // DOB live preview
    var dobInput = document.getElementById("dob-input");
    dobInput.onchange = function() {
        var dob = document.getElementById("dob");
        dob.innerHTML = this.value;
    }

    // Gender live preview
    var chooseGender = document.getElementById("choose-gender");
    chooseGender.onchange = function() {
        var gender = document.getElementById("gender");
        gender.innerHTML = this.value;
    }

    // Class live preview
    var classInput = document.getElementById("class-input");
    classInput.oninput = function() {
        var classText = document.getElementById("class");
        classText.innerHTML = this.value;
    }

    // Roll live preview
    var rollInput = document.getElementById("roll-input");
    rollInput.oninput = function() {
        var roll = document.getElementById("roll");
        roll.innerHTML = this.value;
    }

    // Getting text width
    var findTextWidth = function(text, fontSize) {
        var textWidth = doc.getTextDimensions(text,{
            fontSize: fontSize
        }).w;
        return textWidth;
    }

    // Exporte to pdf
    var form = document.getElementById("marksheet-form");
    form.onsubmit = function(e) {
        e.preventDefault();
        var elements = form.elements;
        var schoolLogo = elements.schoolLogo.files[0];
        var schoolLogoUrl = URL.createObjectURL(schoolLogo);
        var schoolName = elements.schoolName.value;
        var tagline = elements.tagline.value;
        var candidateName = elements.candidateName.value;
        var fathersName = elements.fatherName.value;
        var dob = elements.dob.value;
        var gender = elements.gender.value;
        var studentsClass = elements.class.value;
        var roll = elements.roll.value;
        
        // Getting subjects values
        var subjects = document.getElementsByClassName("subjects");
        var fullmarks = document.getElementsByClassName("fullmarks");
        var obtainedMarks = document.getElementsByClassName("obtained-marks");

        var subjectsBody = [];

        for(var i=0; i<subjects.length; i++)
        {
            var subject = subjects[i].value;
            var fullmark = fullmarks[i].value;
            var obtainedMark = obtainedMarks[i].value;
            subjectsBody.push([
                subject, 
                fullmark, 
                obtainedMark
            ])
        }

        // Generate pdf

        // Setting School Logo
        var schoolLogoWidth = 30;
        var pageWidth = doc.internal.pageSize.width;
        var schoolLogoLeftMargin = (pageWidth-schoolLogoWidth)/2;
        doc.addImage(schoolLogoUrl, 'PNG', schoolLogoLeftMargin, 5, schoolLogoWidth, 30);
        
        // Setting School name
        var schoolNameFontSize = 28;
        var schoolNameWidth = findTextWidth(schoolName, schoolNameFontSize);
        var schoolNameLeftMargin = (pageWidth-schoolNameWidth)/2;
        doc.setFontSize(schoolNameFontSize);
        doc.text(schoolName, schoolNameLeftMargin, 45);

        // Setting tagline
        var taglineFontSize = 14;
        var taglineWidth = findTextWidth(tagline, taglineFontSize);
        var taglineLeftMargin = (pageWidth-taglineWidth)/2;
        doc.setFontSize(taglineFontSize);
        doc.text(tagline, taglineLeftMargin, 55);

        // Setting student table
        doc.autoTable({
            margin: {top: 70},
            body: [
                [
                    {content: 'Student`s Name', styles: {fontStyle: 'bold', fillColor: '#2E80BA', textColor: 'white'}}, 
                    candidateName, 
                    {content: 'Father`s Name', styles: {fontStyle: 'bold', fillColor: '#2E80BA', textColor: 'white'}}, 
                    fathersName
                ],
                [
                    {content: 'DOB', styles: {fontStyle: 'bold'}}, 
                    dob, 
                    {content: 'Gender', styles: {fontStyle: 'bold'}}, 
                    gender
                ],
                [
                    {content: 'Class', styles: {fontStyle: 'bold', fillColor: '#2E80BA', textColor: 'white'}}, 
                    studentsClass, 
                    {content: 'Roll', styles: {fontStyle: 'bold', fillColor: '#2E80BA', textColor: 'white'}}, 
                    roll
                ]
            ]
        });

        // setting subject table
        doc.autoTable({
            headStyles: {fillColor: '#2E80BA', textColor: 'white'},
            head: [['Subjects', 'Fullmarks', 'Obtained Marks']],
            body: subjectsBody
        })

        // Marks table
        var total = 0;
        for(var i=0; i<obtainedMarks.length; i++)
        {
            total = total+Number(obtainedMarks[i].value)
        }

        var percent = Math.floor(total/obtainedMarks.length);

        // Finding grade
        var grade = '';
        if(percent > 90) grade = 'A+';

        else if(percent > 80) grade = 'A';

        else if(percent > 70) grade = 'B+';

        else if(percent > 60) grade = 'B';

        else if(percent > 50) grade = 'C';

        else if(percent > 40) grade = 'D';

        else grade = 'E';

        doc.autoTable({
            head: [['Grade', 'Percentage', 'Total Marks']],
            body: [[grade, percent+'%', total]]
        })

        // Download pdf
        doc.save("marksheet.pdf");
    }
}
