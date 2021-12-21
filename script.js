import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore,collection, addDoc, getDocs,query,where } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";
const firebaseConfig = {
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

window.set_data=async function set_data(){
//upload profilepic and send its data

}
window.get_data=async function get_data(){
  //query data from firebase

  var quer =document.getElementById("searchQuery").value;
  const q = query(collection(db, "resumes"), where("Email", "==", quer));

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
  document.getElementById('skillT').innerHTML = doc.data()["skills"];
    
  //! Achievement Adding
 
  document.getElementById('achieveT').innerHTML = doc.data()["Achievements"];
  
  //! Hobbies Adding

  document.getElementById('hobbiesT').innerHTML =doc.data()["Hobbies"];
  
  document.getElementById('eqT').innerHTML = doc.data()["Education"];
  document.getElementById('dpT').src=doc.data()["ProfilePicture"];
});
document.getElementById('resume-form').style.display = 'none'
document.getElementById('resume-template').style.display = 'flex'
}

window.upload_pic=async function upload_pic(){
  const storage = getStorage();
  const storageRef = ref(storage,"images/"+document.getElementById('dpField').files[0].name);
  
  const uploadTask = uploadBytesResumable(storageRef, document.getElementById('dpField').files[0].size>0? document.getElementById('dpField').files[0]:null);
  
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
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
        var data= addDoc(collection(db,"resumes"),{
          "FirstName":document.getElementById('firstField').value,
          "LastName":document.getElementById("lastField").value,
          "Email":document.getElementById("emailField").value,
          "PhoneNumber":document.getElementById("numField").value,
          "DateOfBirth":document.getElementById("dobField").value,
          "ProfilePicture":downloadURL,
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
          "skills":document.getElementById("skills").value,
          "PositionApplied":document.getElementById("applyForField").value,
        })  ;
          
        document.getElementById('resume-form').style.display = 'none'
        document.getElementById('resume-template').style.display = 'flex'
      });
    }
  );
}
