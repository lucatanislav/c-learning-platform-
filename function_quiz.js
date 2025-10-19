let quizData = [
    {
      question: `Subprogramul C++ f realizează interschimbarea valorilor a două variabile întregi transmise prin intermediul parametrilor x şi y. Care este antetul corect al subprogramului f?`,
      code: "",
      options: ["void f(int &x, int &y)", "int f(int x,int y)", "void f(int x, int &y)", "void f(int &x, int y)"],
      correct: "void f(int &x, int &y)"
    },
    {
      question: `Este definită o funcție smax care primește două valori întregi prin intermediul a doi parametri și returnează suma tuturor cifrelor celor două numere. De exemplu, smax(73, 608) returnează 24 (7+3+6+0+8). Stabiliți în ce mod se poate apela smax pentru a determina suma cifrelor unui număr întreg n.`,
      code: "",
      options: ["smax(n, n)", "smax(n, 0)", "smax(n, 1)", "nu se poate utiliza"],
      correct: "smax(n, 0)"
    },
    {
      question: `Subprogramul P este definit mai jos.
      Ştiind că valoarea variabilei întregi a este înainte de apel 4, care este valoarea ei imediat după apelul P(a);?`,
      code: "",
      options: ["10", "4", "9", "5"],
      correct: "9"
    },
    {
      question: `Subprogramul fct este definit mai jos, parțial.
      Iniţial, variabile întregi a, b şi c au valorile a=8, b=31 şi c=9, iar după apelul fct(a,b,c), valorile celor trei variabile sunt a=9, b=31 şi c=39. Care poate fi antetul subprogramului fct?`,
      code: "",
      options: ["void fct(int &x,int &y,int &z)", "void fct(int x,int &y,int &z)", "void fct(int x,int y,int z)", "void fct(int &x,int y,int &z)"],
      correct: "void fct(int &x,int y,int &z)"
    },
    {
      question: `Care este antetul corect al subprogramului C/C++ cifre, care primeşte prin intermediul primului parametru, x, un număr natural şi furnizează prin intermediul celui de-al doilea parametru, y, suma cifrelor numărului natural x?`,
      code: "",
      options: ["void cifre(int x, int &y)", "int cifre(int x)", "void cifre(int x, int y)", "void cifre(int &x, int y)"],
      correct: "void cifre(int x, int &y)"
    },
    {
      question: `Care este antetul corect al subprogramului C/C++ elimin_impar care primeşte prin intermediul parametrului x un număr natural și furnizează prin intermediul aceluiași parametru x numărul obținut prin eliminarea tuturor cifrelor impare din x, fara a returna alte valori?`,
      code: "",
      options: ["int elimin_impar(int &x)", "void elimin_impar(int x)", "void elimin_impar(int &x)", "int elimin_impar(int x)"],
      correct: "void elimin_impar(int &x)"
    },
    {
      question: `Se presupune că este definită o funcție min care primește două valori reale prin intermediul a doi parametri și returnează cea mai mică dintre cele două valori. Stabiliți care dintre următoarele expresii este egală cu cea mai mare dintre valorile reale a și b.`,
      code: "",
      options: ["a-min(a,b)+b-min(b,a)", "min(a,b)", "min(a,b)-a-b", "a+b-min(a,b)"],
      correct: "a+b-min(a,b)"
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