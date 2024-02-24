 // Get the elements from the document
 const question = document.getElementById("question");
 const options = document.querySelectorAll(".options li");
 const btn = document.getElementById("next-btn");
 const result = document.querySelector(".result");
 const scoreSpan = document.getElementById("score");
 const totalSpan = document.getElementById("total");

 // Initialize the variables
 let score = 0;
 let total = 0;
 let selectedOption = null;
 let currentQuestion = 0;

 // Define the questions and answers
 const questions = [
    
     {
         question: "What is the capital of India?",
         options: ["Mumbai", "Chennai", "New Delhi", "Kolkata"],
         answer: "New Delhi"
     },
     {
         question: "Who is the current Prime Minister of India?",
         options: ["Rahul Gandhi", "Narendra Modi", "Arvind Kejriwal", "Mamata Banerjee"],
         answer: "Narendra Modi"
     },
     {
         question: "Which of these is a programming language?",
         options: ["HTML", "CSS", "JavaScript", "All of the above"],
         answer: "All of the above"
     },
    
 ];

 // Add click event listeners to the options
 options.forEach(option => {
     option.addEventListener("click", () => {
         // Remove the selected class from the previous option
         if (selectedOption) {
             selectedOption.classList.remove("selected");
         }
         // Add the selected class to the current option
         option.classList.add("selected");
         // Enable the next button
         btn.disabled = false;
         // Store the selected option
         selectedOption = option;
     });
 });

 // Add click event listener to the next button
 btn.addEventListener("click", () => {
     // Check if the selected option is correct or wrong
     if (selectedOption.dataset.answer === "correct") {
         // Increase the score
         score++;
         // Add the correct class to the option
         selectedOption.classList.add("correct");
     } else {
         // Add the wrong class to the option
         selectedOption.classList.add("wrong");
     }
     // Increase the total
     total++;
     // Update the score and total
     scoreSpan.textContent = score;
     totalSpan.textContent = total;
     // Disable the next button
     btn.disabled = true;
     // Show the result
     result.style.display = "block";
     // Wait for 2 seconds
     setTimeout(() => {
         // Hide the result
         result.style.display = "none";
         // Remove the correct or wrong class from the option
         selectedOption.classList.remove(selectedOption.dataset.answer);
         // Remove the selected class from the option
         selectedOption.classList.remove("selected");
         // Reset the selected option
         selectedOption = null;
         // Increase the current question
         currentQuestion++;
         // Check if there are more questions
         if (currentQuestion < questions.length) {
             // Load the next question and options
             loadQuestion(currentQuestion);
         } else {
             // End the quiz
             endQuiz();
         }
     }, 2000);
 });

 // Define a function to load a question and options
 function loadQuestion(index) {
     // Get the question and options from the questions array
     const q = questions[index];
     // Set the question text
     question.textContent = q.question;
     // Set the options text and data-answer attribute
     for (let i = 0; i < options.length; i++) {
         options[i].textContent = q.options[i];
         options[i].dataset.answer = q.options[i] === q.answer ? "correct" : "wrong";
     }
 }

 // Define a function to end the quiz
 function endQuiz() {
     // Set the question text to "Quiz Completed"
     question.textContent = "Quiz Completed";
     // Hide the options
     document.getElementById("options").style.display = "none";
     // Hide the next button
     btn.style.display = "none";
     // Show the final result
     result.style.display = "block";
 }

 // Load the first question and options
 loadQuestion(2);