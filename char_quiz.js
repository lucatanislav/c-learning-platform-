let quizData = [
    {
      question: "Care este valoarea expresiei strlen(s) pentru variabila s de tip şir de caractere, declarată şi iniţializată astfel: char s[15]=”Proba_E”;",
      code: ``,
      options: ["7", "15", "6", "5"],
      correct: "7",
    },
    {
      question: "Ce se va afişa în urma executării secvenţei următoare, în care variabila c memorează un şir cu cel mult 20 de caractere, iar i este o variabilă de tip întreg?",
      code: `char c[21] = "tamara", *p;
for(i = 0 ;i < strlen(c);i = i + 1)
{ p = strchr(c,'a');
 cout << p - c;}`,
      options: ["0", "34", "21", "50"],
      correct: "34",
    },
    {
      question: "În secvenţa de instrucţiuni de mai jos, variabila s memorează un şir de caractere format doar din litere ale alfabetului englez, iar variabilele i şi n sunt de tip int. Ştiind că în urma executării secvenţei s-a afişat succesiunea de caractere eied*eael* scrieţi care este şirul de caractere memorat de variabila s.",
      code: `n = strlen(s);
for(i = 0;i < n; i++)
  if (s[i] == ’ e ’) cout << ’ * ’;
  else cout << ' e ' << s[i];`,
      options: ["ideale", "poru", "dalele", "cale"],
      correct: "ideale"
    },
    {
      question: "Ce se va afişa în urma executării secvenţei de program de mai jos ştiind că variabila a memorează un şir cu cel mult 100 de caractere, iar variabilele i şi k sunt de tip întreg?",
      code: `k = ’ a ’ - ’ A ’;
strcpy(a, ”clasa a-XII-a A”);
for(i = 0;i < strlen(a); i++)
 if(a[i] >= ’ a ’ && a[i] <= ’ z ’) a[i] = a[i] - k;
cout << a;`,
      options: ["clAsa A-XII-A a", "CLASA A-XII-A A", "clasa a_xii-a A", "CLASA a-xii-a A"],
      correct: "CLASA A-XII-A A",
    },
    {
      question: "Ce se va afişa în urma executării secvenţei de program următoare ştiind că variabila a memorează un şir cu cel mult 100 de caractere, iar variabila i este de tip întreg?",
      code: `strcpy(a, ” bacalaureat ”);
for(i = 0;i < strlen(a); i++)
  if(strchr(” aeiou ”, a[i]) != 0)
    cout << ’ * ’;`,
      options: ["******", "**aa", "***", "aeiou"],
      correct: "******"
    },
    {
      question: "Ce se va afişa în urma executării secvenţei de program de mai jos, ştiind că variabila x memorează un şir cu cel mult 100 de caractere, iar variabila i este de tip întreg?",
      code: `strcpy(x,” bac2009 ”);
for(i = 0;i < strlen(x); i++)
  if (strchr(“ 0123456789 ”, x[i]) == 0)
    cout << x[i];`,
      options: ["2009", "bac", "bac2009", "bacbac"],
      correct: "bac"
    },
    {
      question: "Care din următoarele expresii are valoarea 1 dacă şi numai dacă şirul de caractere s, format din exact 10 caractere, este obţinut prin concatenarea a două şiruri identice?",
      code: ``,
      options: ["strcmp(s,s+5)==0", "s==strstr(s,s+5)", "s==s+5", "strcmp(s,strcat(s,s+5))==0"],
      correct: "s==strstr(s,s+5)"
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
                                      <div class="correct-answer">Correct: ${correctAnswer}</div>`
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