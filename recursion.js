let quizData = [
    {
      question: `Se consideră subprogramul f, definit mai jos. Indicați ce valoare are f(15, 25).`,
      code: `int f(int a,int b)
{ if (b==0) return a;
  else return f(b,a%b);
}`,
     options: ["15", "10", "5", "0"],
     correct: "5"
    },
    {
      question: `Se consideră subprogramele f1 şi f2, definite mai jos.
      Identificaţi subprogramul care, la apel, pentru parametrul n=10, returnează suma primelor 10 numere naturale nenule.`,
      code: `int f1(int n)
{ return n*(n+1)/2;
}
int f2 (int n)
{ if(n>0)
   return n+f2(n-1);
  return 0;
}`,
     options: ["atât f1, cât şi f2", "numai f1", "numai f2", "nici f1, nici f2"],
     correct: "atât f1, cât şi f2"
    },
    {
      question: `Se consideră subprogramele f1 şi f2, definite mai jos.
      La apel, pentru parametrii x=2 şi y=3, returnează xy:`,
      code: `int f1 (int x, int y)
{
return x*y;
}
int f2 (int x, int y)
{ if (y==1) return x;
else return x*f2(x, y-1);
}`,
      options: ["atât f1, cât şi f2", "numai f1", "numai f2", "nici f1, nici f2"],
      correct: "numai f2"
    },
    {
      question: `Se consideră subprogramul f, definit mai jos.
     Indicaţi ce se afişează în urma apelului " f(3); "`,
      code: `void f (int n)
{ if (n!=0)
  { f (n-1);
    cout<<n;
  }
}`,
      options: ["12", "123", "321", "3210"],
      correct: "123"
    },
    {
      question: `Se consideră subprogramul C/C++ f, definit mai jos.
      Ce se afișează în urma apelului " f(9); "`,
      code: `void f(int x)
{ cout<<x;
  if(x>0)
  { if(x%2==0)
      cout<<'*';
    f(x/2);
  }
}`,
      options: ["9421", "9**10", "94210", "94*2*10"],
      correct: "94*2*10"
    },
    {
      question: `Se consideră subprogramule C/C++ recursive C1 și C2, definite mai jos.
      La apel, returnează valoarea celui mai mare divizor comun al celor două numere naturale nenule primite ca parametri:`,
      code: `int C1 (int a, int b)
{ if(a==b) return a;
  else if(a>b) return C1(a-b,b);
       else return C1(a,b-a);
}
int C2 (int a, int b)
{ if(b==0) return a;
  else return C2(b,a%b);
}`,
     options: ["numai C1", "numai C2", "atât C1 cât şi C2", "nici C1 nici C2"],
     correct: "atât C1 cât şi C2"
    },
    {
      question: `Se consideră subprogramul C/C++ p, definit mai jos.
      Valoarea lui p(210, 49) este:`,
      code: `int p(int m, int n)
{ if(n==0) return 1;
  return 1+p(n, m%n);
}`,
      options: ["1", "2", "3", "4"],
      correct: "4"
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
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}`;
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