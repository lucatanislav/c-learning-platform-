let quizData = [
    {
      question: "Variabila a memorează elementele unui tablou bidimensional cu 5 linii şi 5 coloane(numerotate de la 1 la n), numere întregi. Care este suma elementelor aflate pe diagonala secundară a tabloului construit în urma executării secvenţei de program de mai jos?",
      code: `for(i = 1; i <= 5; i++)
    for(j = 1; j <= 5; j++)
        a[i][j] = i - j;`,
      options: ["0", "1", "2", "3"],
      correct: "0",
    },
    {
      question: "În secvenţa de mai jos, variabila v memorează elementele unei matrice cu liniile şi coloanele numerotate de la 1 la n, iar toate celelalte variabile sunt întregi. Dacă 1≤k<n, atunci executarea secvenţei determină:",
      code: `for ( i = k + 1; i <= n; i++)
  for (j = 1; j <= n; j++)
    v[i-1][j] = v[i][j];
        n = n - 1;`,
      options: ["adăugarea liniei k în matrice", "eliminarea liniei k din matrice", "eliminarea coloanei k din matrice", "adăugarea coloanei k în matrice"],
      correct: "eliminarea liniei k din matrice",
    },
    {
      question: "Fiind dat un tablou bidimensional cu 20 linii şi 20 coloane, câte elemente se găsesc strict deasupra diagonalei secundare a tabloului?",
      code: ``,
      options: ["180", "200", "190", "210"],
      correct: "190"
    },
    {
      question: "În secvenţa de mai jos, variabila a memorează elementele unui tablou bidimensional cu 4 linii (numerotate de la 0 la 3) şi 4 coloane (numerotate de la 0 la 3), iar toate celelalte variabile sunt de tip întreg. Care este suma elementelor de pe diagonala principală a acestui tablou după executarea acestei secvențe de instrucțiuni?",
      code: `x=1;
for (i = 0;i <= 3; i++)
  for (j = 0;j <= 3; j++)
  {
    if (i == j)
      a[i][j]= 2 * x;
    else a[i][j] = x;
        x = x + 1;}`,
      options: ["4 5 6 0 0 0 0 0 0 0", "0 5 0 7 0 9 0 11 0 0", "0 0 3 0 4 0 5 0 6 0", "0 3 0 4 0 5 0 6 0 0"],
      correct: "0 0 3 0 4 0 5 0 6 0",
    },
    {
      question: "Fie a o matrice cu 5 linii şi 5 coloane numerotate de la 1 la 5. Pentru fiecare element a[i][j] (1 ≤ i ≤ 5, 1 ≤ j ≤ 5) expresia a[i][j] == (i - 1) * 5 + j este nenulă. Care este valoarea sumei elementelor de pe diagonala secundară a matricei?",
      code: ``,
      options: ["4", "20", "17", "79"],
      correct: "17"
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
    resultHeading.innerHTML = `Ai răspuns corect la ${score} întrebări din ${MAX_QUESTIONS}`;
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
                                      <div class="user-answer">Răspunsul tău: ${userAnswer || "Fără Răspuns"}</div>
                                      <div class="correct-answer">Răspuns corect: ${correctAnswer}</div>`
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