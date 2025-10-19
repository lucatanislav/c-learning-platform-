let quizData = [
    {
      question:`În secvenţa de mai jos, variabila a memorează un tablou bidimensional cu 20 de linii şi 20 de coloane, numerotate de la 1 la 20, cu elementele reale. Variabila p este reală, iar i este de tip întreg.
        Care dintre instrucţiunile de mai jos poate înlocui punctele de suspensie din secvenţa de program următoare astfel încât executarea acesteia să determine memorarea în variabila p a valorii produsului celor 40 de elemente aflate pe diagonalele matricei.`,
        code:`p=1;
for(i=1;i<=20;i++)
    ....`,
        options: ["p = p * a[21 - i][i] * a[i][21 - i];", "p = p * a[i][i] * a[i][20 - i];", "p = p * a[i][i] * a[21 - i][21 - i];", "p = p * a[21 - i][21 - i] * a[i][21 - i];"],
        correct: "p = p * a[21 - i][21 - i] * a[i][21 - i];"
    },
    {
      question:`Într-un tablou bidimensional A, cu n linii şi n coloane, notăm cu Aij elementul aflat pe linia i şi coloana j (1≤i≤n, 1≤j≤n). Care este valoarea expresiei j-i dacă elementul Aij este situat pe diagonala principală a tabloului A?`,
      code: ``,
      options: ["0", "1", "2", "100"],
      correct: "0"
    },
    {
      question: "Fiind dat un tablou bidimensional cu 20 linii şi 20 coloane, câte elemente se găsesc strict deasupra diagonalei secundare a tabloului?",
      code: ``,
      options: ["180", "200", "190", "210"],
      correct: "190"
    },
    {
      question: `Într-un tablou bidimensional A, cu n linii şi n coloane, notăm cu Aij elementul aflat pe linia i şi coloana j (1≤i≤n, 1≤j≤n). Care este valoarea expresiei j+i dacă elementul Aij este situat pe diagonala secundară a tabloului A?`,
      code: ``,
      options: ["n", "n - 1", "n + 1", "2 * n"],
      correct: "n + 1"
    },
    {
      question: `Variabila a memorează un tablou bidimensional cu 5 linii și 5 coloane, numerotate de la 1 la 5, ale cărui elemente sunt numere întregi. Care este cea mai mare valoare, memorată în tablou, deasupra diagonalei principale a tabloului construit în urma executării secvenţei de program de mai jos?`,
      code: `for(i=1;i<=5;i++)
  for(j=1;j<=5;j++)
    a[i][j]=j%i+i%j;`,
      options: ["0", "3", "4", "5"],
      correct: "5"
    },
    {
      question: "În secvenţa de program următoare, variabila t memorează o matrice cu 5 linii şi 5 coloane, numerotate de la 0 la 4, cu elemente numere întregi, iar celelalte variabile sunt întregi. Executarea acestei secvenţe determină memorarea în variabila x a sumei elementelor situate:",
      code: `x=0;
for(i = 0; i < 5; i++)
  for(j = i + 1; j < 5; j++)
    x = x + t[i][j];`,
      options: ["deasupra diagonalei principale cat si diagonala principală", "strict deasupra diagonalei principale", "strict sub diagonala principală", "strict deasupra diagonalei secundare"],
      correct: "strict deasupra diagonalei principale"
    },
    {
      question: "Pentru o matrice t cu 8 linii şi 8 coloane, numerotate de la 0 la 7, cu elemente numere întregi, secvenţa de program de mai jos, în care variabilele z, i şi j sunt de tip întreg, determină, în urma executării ei, memorarea în z a sumei tuturor elementelor situate:",
      code: `z=0;
for(i = 0; i < 8; i++)
  for(j = 0; j < i; j++)
    z = z + t[i][j];`,
      options: ["strict sub diagonala principală", "deasupra diagonalei principale, cat si diagonala principală", "strict deasupra diagonalei principale", "strict deasupra diagonalei secundare"],
      correct: "strict sub diagonala principală"
    },
  ];
  
  const quizContainer = document.querySelector(".quiz-container");
  const question = document.querySelector(".quiz-container .question");
  const question_code = document.querySelector(".quiz-container pre code");
  const options = document.querySelector(".quiz-container .options");
  const nextBtn = document.querySelector(".quiz-container .next-btn");
  const quizResult = document.querySelector(".quiz-result");
  
  let questionNumber = 0;
  let MAX_QUESTIONS = 6;
  let score = 0;
  
  const shuffleArray = array => {
      return array.slice().sort(() => Math.random() - 0.5);
  };
  
  const resetLocalStorage = () => {
    for(let i = 0; i < MAX_QUESTIONS; i++){
      localStorage.removeItem(`userAnswer_${i}`);
  
    }
  };
  
  resetLocalStorage();
  
  quizData = shuffleArray(quizData);
  
  const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct){
      score++;
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("incorrect");
    }
  
    localStorage.setItem(`userAnswer_${questionNumber}` , userAnswer);
  
    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach(o => {
      o.classList.add("disabled");
    });
  };
  
  const createQuestion = () => {
  
     options.innerHTML = "";
      question.innerHTML = `<span class='question-number'>${questionNumber + 1} / ${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;
      question_code.innerHTML = quizData[questionNumber].code;
  
      const shuffleOptions = shuffleArray(quizData[questionNumber].options);
  
      shuffleOptions.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) => {
          checkAnswer(e);
        })
        options.appendChild(option);
      })
  }
  
  const retakeQuiz = () => {
      questionNumber = 0;
      score = 0;
      quizData = shuffleArray(quizData);
      resetLocalStorage();
  
      createQuestion();
      quizResult.style.display = "none";
      quizContainer.style.display = "block";
  }
  
  const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";
  
    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `Ai răspuns corect la ${score} întrabări din ${MAX_QUESTIONS}`;
    quizResult.appendChild(resultHeading);
  
    for(let i = 0; i < MAX_QUESTIONS; i++){
      const resultItem = document.createElement("div");
      resultItem.classList.add("question-container");
  
      const userAnswer = localStorage.getItem(`userAnswer_${i}`);
      const correctAnswer = quizData[i].correct;
  
      let answeredCorrectly = userAnswer === correctAnswer;
  
      if(!answeredCorrectly){
        resultItem.classList.add("incorrect");
      }
  
      resultItem.innerHTML =  `<div class="question">
                                          <p>Întrebarea ${i + 1}: ${quizData[i].question}</p>
                                          <pre><code>${quizData[i].code}</code></pre>
                                      </div>
                                      <div class="user-answer">Răspunsul tău: ${userAnswer || "Fără răspuns"}</div>
                                      <div class="correct-answer">Răspunsul corect: ${correctAnswer}</div>`
      quizResult.appendChild(resultItem);
  
      }
  
      const retakeBtn = document.createElement("button");
      retakeBtn.classList.add("retake-btn");
      retakeBtn.innerHTML = 'Retake Quiz';
      retakeBtn.addEventListener("click", retakeQuiz);
      quizResult.appendChild(retakeBtn);
  };
  
  createQuestion();
  
  
  const displayNextquestion = () => {
      if(questionNumber >= MAX_QUESTIONS - 1) {
        displayQuizResult();
        return;
      }
  
      questionNumber++;
      createQuestion();
  }
  
  nextBtn.addEventListener("click", displayNextquestion);