import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore,collection, addDoc,query, getDocs } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";


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

window.set_data=function set_data(){
  var data=addDoc(collection(db,"resumes"),{
    "FirstName":document.getElementById('firstField').value,
    "LastName":document.getElementById("lastField").value,
    "Email":document.getElementById("emailField").value,
    "PhoneNumber":document.getElementById("numField").value,
    "DateOfBirth":document.getElementById("dobField").value,
    // "ProfilePicture":document.getElementById("profilePicture").value,
    "Address":document.getElementById("addressField").value,
    "Github":document.getElementById("githubField").value,
    "LinkedIn":document.getElementById("linkedField").value,
    "Twitter":document.getElementById("twitterField").value,
    "Hobbies":document.getElementById("hobby").value,
    "Summary":document.getElementById("summaryField").value,
    "Experience":document.getElementById("expField").value,
    "WorkExperience":document.getElementById("example").value,
    "Achievements":document.getElementById("achievementsField").value,
    "skills":document.getElementById("skills").value,
    "PositionApplied":document.getElementById("applyForField").value,
  })  ;
    
  
}
 window.get_data=async function get_data(){
  const q=await query(collection(db,"resumes"));
  const doc=await getDocs(q);
 await console.log(doc.data);
}
