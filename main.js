//! Adding new Field

//* Adding functionality to the hobbies field

function addSkillField() {
    let newNode = document.createElement('input');

    newNode.classList.add('form-control');
    newNode.classList.add('mt-2');
    newNode.classList.add('skillField');
    newNode.setAttribute('placeholder', 'Add your skill');

    let skillObject = document.getElementById('skill-container');
    let skillAddButtonObject = document.getElementById("add_skill");

    skillObject.insertBefore(newNode, skillAddButtonObject);
}

//* Adding functinality to the hobbies field

const addHobbyField = () => {
    let newNode = document.createElement('input');

    newNode.classList.add('form-control');
    newNode.classList.add('mt-2');
    newNode.classList.add('hobbiesField');
    newNode.setAttribute('placeholder', 'Add your hobbies');
    let hobbiesObject = document.getElementById('hobbies-container');
    let hobbiesAddButtonOject = document.getElementById('add_hobbies');

    hobbiesObject.insertBefore(newNode, hobbiesAddButtonOject);
}

//* Adding Achievement Field

const addAchievementField = () => {
    let newNode = document.createElement('textarea');

    newNode.classList.add('form-control');
    newNode.classList.add('mt-3');
    newNode.classList.add('achieveField');

    newNode.setAttribute('placeholder', "Add new achievement");
    newNode.setAttribute('rows', 1);

    let achievementObject = document.getElementById('achievement_container');
    let achievementAddButtonObject = document.getElementById('achievement_button');

    achievementObject.insertBefore(newNode, achievementAddButtonObject);
}

const addEdButton = () => {
    let newNode = document.createElement('input');

    newNode.classList.add('form-control');
    newNode.classList.add('mt-2');
    newNode.classList.add('edField');

    newNode.setAttribute('placeholder', 'Add Education Qualification');

    let edObject = document.getElementById('ed-container');
    let edButtonObject = document.getElementById('ed_button');

    edObject.insertBefore(newNode, edButtonObject);

}

//* Generate the resume button

const generate_resume = async () => {


    //! One way to define the object
    let nameField = document.getElementById('firstField').value+" "+document.getElementById('lastField').value;
    let nameT1 = document.getElementById('nameT1');
    nameT1.innerHTML = nameField;

    //! Another way to define the object
    document.getElementById("nameT2").innerHTML = document.getElementById('firstField').value+" "+document.getElementById('lastField').value;
    document.getElementById("emailT").innerHTML = document.getElementById('emailField').value;
    document.getElementById("dobT").innerHTML = document.getElementById('dobField').value;
    document.getElementById('addressT').innerHTML = document.getElementById("addressField").value;
    document.getElementById('githubT').innerHTML = document.getElementById("githubField").value;
    document.getElementById('linkedT').innerHTML = document.getElementById("linkedField").value;
    document.getElementById('twitterT').innerHTML = document.getElementById("twitterField").value;
    document.getElementById('summaryT').innerHTML = document.getElementById('summaryField').value;
    document.getElementById('expT').innerHTML = document.getElementById('expField').value;
    document.getElementById('numT').innerHTML = document.getElementById('numField').value;
    document.getElementById('weT').innerHTML = document.getElementById('example').value;
    document.getElementById('applyForT').innerHTML = document.getElementById('applyForField').value;
    
    //! Skills adding
    let skillField = document.getElementsByClassName('skillField');
    let str = "";
    for (let e of skillField) {
        str = str + `<li> ${e.value} </li>`;
    }
    document.getElementById('skillT').innerHTML = str;
    
    //! Achievement Adding
    const aes = document.getElementsByClassName('achieveField');
    var str1 = "";
    for (var j of aes) {
        str1 += `<li>${j.value}</li>`;
    }
    document.getElementById('achieveT').innerHTML = str1;
    
    //! Hobbies Adding
    const hobbiesAdding = document.getElementsByClassName('hobbiesField');
    let str2 = '';
    for (let m of hobbiesAdding) {
        str2 += `<li>${m.value}</li>`;
    }
    document.getElementById('hobbiesT').innerHTML = str2;
    
    //! Education Qualification
    const edAdding = document.getElementsByClassName('edField');
    let str3 = "";
    for (let a of edAdding) {
        str3 += `<li>${a.value}</li>`
    }
    document.getElementById('eqT').innerHTML = str3;
    
    //! Code for Setting DP
    
    let file =document.getElementById('dpField').files[0].size>1000? document.getElementById('dpField').files[0]:null;
    let signfile =document.getElementById('signField').files[0].size>1000? document.getElementById('signField').files[0]:null;
    // console.log(file);
    //////////////////////////////////////////////////////////////////////
    let reader = new FileReader();
    let signreader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        document.getElementById('dpT').src = reader.result;
    }
    signreader.readAsDataURL(signfile);
    signreader.onloadend = function () {
        document.getElementById('signT').src = signreader.result;
    }
    
    
    
    //* set image to the template

    
    
    //! Code for Generate the Resume
 
}

//! Initializing Froala
// var editor = new FroalaEditor('#example')

//! Print the Resume    
 function print_resume() {
    var prtContent = document.getElementById("printDiv");
var WinPrint = window.open('', '', 'left=0,top=0,width=400,height=900,toolbar=0,scrollbars=0,status=0');
WinPrint.document.write('<html><head>');
WinPrint.document.write('<link rel="stylesheet" href="style.css">');
WinPrint.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">');
WinPrint.document.write('</head><body>');
WinPrint.document.write(prtContent.innerHTML);
WinPrint.document.write('</body></html>');
WinPrint.document.write('<script>print(); close();</script>');
}

