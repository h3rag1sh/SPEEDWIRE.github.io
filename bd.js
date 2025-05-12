
const firebaseConfig = {
    apiKey: "AIzaSyAR0aUPCOtAu4YlRD9sji1Kn2pXttNiVc8",
    authDomain: "speedwire-5cc52.firebaseapp.com",
    databaseURL: "https://speedwire-5cc52-default-rtdb.firebaseio.com",
    projectId: "speedwire-5cc52",
    storageBucket: "speedwire-5cc52.appspot.com",
    messagingSenderId: "318233896638",
    appId: "1:318233896638:web:cf75288e9ecb8d3756a0ef"
};

firebase.initializeApp(firebaseConfig);
const commentsDB = firebase.database().ref("speedwire");

document.getElementById('comment-form').addEventListener("submit", submitForm);

loadReviews();


function submitForm(e) {
    e.preventDefault();
    const text = document.getElementById('comment-input').value.trim();

    if (text === "") return; 

    saveMessage(text);
    document.getElementById('comment-form').reset(); 
}


function saveMessage(text) {
    const newComment = commentsDB.push();
    newComment.set({
        text: text,
        timestamp: Date.now()
    });
}


function loadReviews() {
    commentsDB.orderByChild("timestamp").limitToLast(20).on("value", function(snapshot) {
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = ""; 

        snapshot.forEach(function(childSnapshot) {
            const data = childSnapshot.val();
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.textContent = data.text;
            commentsList.prepend(commentDiv); 
        });
    });
}
