import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore,collection,doc, addDoc,setDoc, getDocs,query,where } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";
const firebaseConfig = {
        apiKey: "AIzaSyAwQZPQGg_69uKhXPXUgWCXgtLf3KDw2sA",
    authDomain: "my-first-real-project-b401a.firebaseapp.com",
    projectId: "my-first-real-project-b401a",
    storageBucket: "my-first-real-project-b401a.appspot.com",
    messagingSenderId: "744001694892",
    appId: "1:744001694892:web:7a45e62dec510cc82c8309",
    measurementId: "G-KSMH1LMYT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);


window.get_data=async function get_data(){
  //query data from firebase

  var quer =document.getElementById("searchQuery").value;
  const q = query(collection(db, "resumes"), where("Email", "==", quer));
  const skills=querySnapshot.docs[i].data()["skills"];
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(`${doc.id} => ${doc.data()["Email"]}`);
  document.getElementById("nameT1").innerHTML = doc.data()["FirstName"]+" "+ doc.data()["LastName"];
  document.getElementById("nameT2").innerHTML = doc.data()["FirstName"]+" "+ doc.data()["LastName"];
  document.getElementById("emailT").innerHTML = doc.data()["Email"];
  document.getElementById("dobT").innerHTML = doc.data()["DateOfBirth"];
  document.getElementById('addressT').innerHTML =doc.data()["Address"];
  document.getElementById('githubT').innerHTML = doc.data()["Github"];
  document.getElementById('linkedT').innerHTML = doc.data()["LinkedIn"];
  document.getElementById('twitterT').innerHTML =doc.data()["Twitter"];
  document.getElementById('summaryT').innerHTML = doc.data()["Summary"];
  document.getElementById('expT').innerHTML = doc.data()["Experience"];
  document.getElementById('numT').innerHTML = doc.data()["PhoneNumber"];
  document.getElementById('weT').innerHTML = doc.data()["WorkExperience"];
  document.getElementById('applyForT').innerHTML = doc.data()["PositionApplied"];
  document.getElementById('skillT').innerHTML =skills.join(" , ");
    
  //! Achievement Adding
 
  document.getElementById('achieveT').innerHTML = doc.data()["Achievements"];
  
  //! Hobbies Adding

  document.getElementById('hobbiesT').innerHTML =doc.data()["Hobbies"];
  
  document.getElementById('eqT').innerHTML = doc.data()["Education"];
  document.getElementById('dpT').src=doc.data()["ProfilePicture"];
  document.getElementById('signT').src=doc.data()["Signature"];

});
document.getElementById('resume-form').style.display = 'none'
document.getElementById('resume-template').style.display = 'flex'
}

window.upload_pic=async function upload_pic(){
  const storage = getStorage();
  const storageRef = ref(storage,"images/"+document.getElementById('dpField').files[0].name);
  const  storageSignRef=ref(storage,"images/"+document.getElementById('signField').files[0].name)
  const uploadTask = uploadBytesResumable(storageRef, document.getElementById('dpField').files[0].size>0? document.getElementById('dpField').files[0]:null);
  const uploadSignTask= uploadBytesResumable(storageSignRef, document.getElementById('signField').files[0].size>0? document.getElementById('signField').files[0]:null);
  var signLink;
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  await uploadSignTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Sign upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Sign upload is paused');
        break;
      case 'running':
        console.log('Sign upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    
    getDownloadURL(uploadSignTask.snapshot.ref).then((downloadURL) => {
      signLink=downloadURL;
      console.log('Sign File available at', downloadURL);
      
    });
  }
);
  await uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...

      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        
        console.log('File available at', downloadURL);
        const skills = document.getElementById("skills").value.split(',');
        var data= setDoc( doc(db,"resumes",document.getElementById("emailField").value),{
          "FirstName":document.getElementById('firstField').value,
          "LastName":document.getElementById("lastField").value,
          "Email":document.getElementById("emailField").value,
          "PhoneNumber":document.getElementById("numField").value,
          "DateOfBirth":document.getElementById("dobField").value,
          "ProfilePicture":downloadURL,
          "Signature":signLink,
          "Address":document.getElementById("addressField").value,
          "Github":document.getElementById("githubField").value,
          "LinkedIn":document.getElementById("linkedField").value,
          "Twitter":document.getElementById("twitterField").value,
          "Hobbies":document.getElementById("hobby").value,
          "Education":document.getElementById("educationField").value,
          "Summary":document.getElementById("summaryField").value,
          "Experience":document.getElementById("expField").value,
          "WorkExperience":document.getElementById("example").value,
          "Achievements":document.getElementById("achievementsField").value,
          "skills":skills,
          "PositionApplied":document.getElementById("applyForField").value,
        },{merge:true})  ;
          
        document.getElementById('resume-form').style.display = 'none'
        document.getElementById('resume-template').style.display = 'flex'
      });
    }
  );
}
let i=0;
let querySnapshot;
window.search_data=async function search_data(){
  //query data from firebase

  var quer =document.getElementById("searchForField").value;
  const q = query(collection(db, "resumes"), where("PositionApplied", "==", quer));

 querySnapshot = await getDocs(q);

const skills=querySnapshot.docs[i].data()["skills"];
  // doc.data() is never undefined for query doc snapshots
  console.log(`${"document : "} => ${querySnapshot.docs[i].data()["Email"]}`);
  document.getElementById("nameT1").innerHTML = querySnapshot.docs[i].data()["FirstName"]+" "+querySnapshot.docs[i].data()["LastName"];
  document.getElementById("nameT2").innerHTML =  querySnapshot.docs[i].data()["FirstName"]+" "+  querySnapshot.docs[i].data()["LastName"];
  document.getElementById("emailT").innerHTML =  querySnapshot.docs[i].data()["Email"];
  document.getElementById("dobT").innerHTML =  querySnapshot.docs[i].data()["DateOfBirth"];
  document.getElementById('addressT').innerHTML = querySnapshot.docs[i].data()["Address"];
  document.getElementById('githubT').innerHTML =  querySnapshot.docs[i].data()["Github"];
  document.getElementById('linkedT').innerHTML =  querySnapshot.docs[i].data()["LinkedIn"];
  document.getElementById('twitterT').innerHTML = querySnapshot.docs[i].data()["Twitter"];
  document.getElementById('summaryT').innerHTML =  querySnapshot.docs[i].data()["Summary"];
  document.getElementById('expT').innerHTML =  querySnapshot.docs[i].data()["Experience"];
  document.getElementById('numT').innerHTML =  querySnapshot.docs[i].data()["PhoneNumber"];
  document.getElementById('weT').innerHTML =  querySnapshot.docs[i].data()["WorkExperience"];
  document.getElementById('applyForT').innerHTML =  querySnapshot.docs[i].data()["PositionApplied"];
  document.getElementById('skillT').innerHTML =  skills.join(" , ");
    
  //! Achievement Adding
 
  document.getElementById('achieveT').innerHTML =  querySnapshot.docs[i].data()["Achievements"];
  
  //! Hobbies Adding

  document.getElementById('hobbiesT').innerHTML = querySnapshot.docs[i].data()["Hobbies"];
  
  document.getElementById('eqT').innerHTML =  querySnapshot.docs[i].data()["Education"];
  document.getElementById('dpT').src= querySnapshot.docs[i].data()["ProfilePicture"];
  document.getElementById('signT').src=querySnapshot.docs[i].data()["Signature"];

// document.getElementById('resume-form').style.display = 'none'
// document.getElementById('resume-template').style.display = 'flex'
}
window.search_skill=async function search_skill(){
  //query data from firebase

  var quer =document.getElementById("skillsearchField").value;
  const q = query(collection(db, "resumes"), where("skills", "array-contains-any", quer.split(",")));

 querySnapshot = await getDocs(q);

const skills=querySnapshot.docs[i].data()["skills"];
  // doc.data() is never undefined for query doc snapshots
  console.log(`${"document : "} => ${querySnapshot.docs[i].data()["Email"]}`);
  document.getElementById("nameT1").innerHTML = querySnapshot.docs[i].data()["FirstName"]+" "+querySnapshot.docs[i].data()["LastName"];
  document.getElementById("nameT2").innerHTML =  querySnapshot.docs[i].data()["FirstName"]+" "+  querySnapshot.docs[i].data()["LastName"];
  document.getElementById("emailT").innerHTML =  querySnapshot.docs[i].data()["Email"];
  document.getElementById("dobT").innerHTML =  querySnapshot.docs[i].data()["DateOfBirth"];
  document.getElementById('addressT').innerHTML = querySnapshot.docs[i].data()["Address"];
  document.getElementById('githubT').innerHTML =  querySnapshot.docs[i].data()["Github"];
  document.getElementById('linkedT').innerHTML =  querySnapshot.docs[i].data()["LinkedIn"];
  document.getElementById('twitterT').innerHTML = querySnapshot.docs[i].data()["Twitter"];
  document.getElementById('summaryT').innerHTML =  querySnapshot.docs[i].data()["Summary"];
  document.getElementById('expT').innerHTML =  querySnapshot.docs[i].data()["Experience"];
  document.getElementById('numT').innerHTML =  querySnapshot.docs[i].data()["PhoneNumber"];
  document.getElementById('weT').innerHTML =  querySnapshot.docs[i].data()["WorkExperience"];
  document.getElementById('applyForT').innerHTML =  querySnapshot.docs[i].data()["PositionApplied"];
  document.getElementById('skillT').innerHTML =  skills.join(" , ");
    
  //! Achievement Adding
 
  document.getElementById('achieveT').innerHTML =  querySnapshot.docs[i].data()["Achievements"];
  
  //! Hobbies Adding

  document.getElementById('hobbiesT').innerHTML = querySnapshot.docs[i].data()["Hobbies"];
  
  document.getElementById('eqT').innerHTML =  querySnapshot.docs[i].data()["Education"];
  document.getElementById('dpT').src= querySnapshot.docs[i].data()["ProfilePicture"];
  document.getElementById('signT').src=querySnapshot.docs[i].data()["Signature"];

// document.getElementById('resume-form').style.display = 'none'
// document.getElementById('resume-template').style.display = 'flex'
}







window.increment=function increment(){

 
  if(i<querySnapshot.size-1){
    i++;
    const skills=querySnapshot.docs[i].data()["skills"];
  document.getElementById("nameT1").innerHTML = querySnapshot.docs[i].data()["FirstName"]+" "+querySnapshot.docs[i].data()["LastName"];
  document.getElementById("nameT2").innerHTML =  querySnapshot.docs[i].data()["FirstName"]+" "+  querySnapshot.docs[i].data()["LastName"];
  document.getElementById("emailT").innerHTML =  querySnapshot.docs[i].data()["Email"];
  document.getElementById("dobT").innerHTML =  querySnapshot.docs[i].data()["DateOfBirth"];
  document.getElementById('addressT').innerHTML = querySnapshot.docs[i].data()["Address"];
  document.getElementById('githubT').innerHTML =  querySnapshot.docs[i].data()["Github"];
  document.getElementById('linkedT').innerHTML =  querySnapshot.docs[i].data()["LinkedIn"];
  document.getElementById('twitterT').innerHTML = querySnapshot.docs[i].data()["Twitter"];
  document.getElementById('summaryT').innerHTML =  querySnapshot.docs[i].data()["Summary"];
  document.getElementById('expT').innerHTML =  querySnapshot.docs[i].data()["Experience"];
  document.getElementById('numT').innerHTML =  querySnapshot.docs[i].data()["PhoneNumber"];
  document.getElementById('weT').innerHTML =  querySnapshot.docs[i].data()["WorkExperience"];
  document.getElementById('applyForT').innerHTML =  querySnapshot.docs[i].data()["PositionApplied"];
  document.getElementById('skillT').innerHTML =  skills.join(" , ");
    
  //! Achievement Adding
 
  document.getElementById('achieveT').innerHTML =  querySnapshot.docs[i].data()["Achievements"];
  
  //! Hobbies Adding

  document.getElementById('hobbiesT').innerHTML = querySnapshot.docs[i].data()["Hobbies"];
  
  document.getElementById('eqT').innerHTML =  querySnapshot.docs[i].data()["Education"];
  document.getElementById('dpT').src= querySnapshot.docs[i].data()["ProfilePicture"];
  document.getElementById('signT').src=querySnapshot.docs[i].data()["Signature"];
  }
}
window.decrement=function decrement(){
 
  if(i>0){
    i--;
    const skills=querySnapshot.docs[i].data()["skills"];
  document.getElementById("nameT1").innerHTML = querySnapshot.docs[i].data()["FirstName"]+" "+querySnapshot.docs[i].data()["LastName"];
  document.getElementById("nameT2").innerHTML =  querySnapshot.docs[i].data()["FirstName"]+" "+  querySnapshot.docs[i].data()["LastName"];
  document.getElementById("emailT").innerHTML =  querySnapshot.docs[i].data()["Email"];
  document.getElementById("dobT").innerHTML =  querySnapshot.docs[i].data()["DateOfBirth"];
  document.getElementById('addressT').innerHTML = querySnapshot.docs[i].data()["Address"];
  document.getElementById('githubT').innerHTML =  querySnapshot.docs[i].data()["Github"];
  document.getElementById('linkedT').innerHTML =  querySnapshot.docs[i].data()["LinkedIn"];
  document.getElementById('twitterT').innerHTML = querySnapshot.docs[i].data()["Twitter"];
  document.getElementById('summaryT').innerHTML =  querySnapshot.docs[i].data()["Summary"];
  document.getElementById('expT').innerHTML =  querySnapshot.docs[i].data()["Experience"];
  document.getElementById('numT').innerHTML =  querySnapshot.docs[i].data()["PhoneNumber"];
  document.getElementById('weT').innerHTML =  querySnapshot.docs[i].data()["WorkExperience"];
  document.getElementById('applyForT').innerHTML =  querySnapshot.docs[i].data()["PositionApplied"];
  document.getElementById('skillT').innerHTML =  skills.join(" , ");
    
  //! Achievement Adding
 
  document.getElementById('achieveT').innerHTML =  querySnapshot.docs[i].data()["Achievements"];
  
  //! Hobbies Adding

  document.getElementById('hobbiesT').innerHTML = querySnapshot.docs[i].data()["Hobbies"];
  
  document.getElementById('eqT').innerHTML =  querySnapshot.docs[i].data()["Education"];
  document.getElementById('dpT').src= querySnapshot.docs[i].data()["ProfilePicture"];
  document.getElementById('signT').src=querySnapshot.docs[i].data()["Signature"];
  }
}