const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));

const ordinal_suffix = (num) => {
  // 1st, 2nd, 3rd, 4th, etc.
  const j = num % 10;
  const k = num % 100;
  switch (true) {
    case j === 1 && k !== 11:
      return num + "st";
    case j === 2 && k !== 12:
      return num + "nd";
    case j === 3 && k !== 13:
      return num + "rd";
    default:
      return num + "th";
  }
};

const textCont = (n, fibNum, time) => {
  const nth = ordinal_suffix(n);
  return `
  <p id='timer'>Time: <span class='bold'>${time} ms</span></p>
  <p><span class="bold" id='nth'>${nth}</span> fibonnaci number: <span class="bold" id='sum'>${fibNum}</span></p>
  `;
};
const errPar = document.getElementById("error");
const btn = document.getElementById("submit-btn");
const input = document.getElementById("number-input");
const resultsContainer = document.getElementById("results-container");

// btn.addEventListener("click", (e) => {
//   errPar.textContent = '';
//   const num = window.Number(input.value);

//   if (num < 2) {
//     errPar.textContent = "Please enter a number greater than 2";
//     return;
//   }

//   const startTime = new Date().getTime();
//   const sum = fib(num);
//   const time = new Date().getTime() - startTime;

//   const resultDiv = document.createElement("div");
//   resultDiv.innerHTML = textCont(num, sum, time);
//   resultDiv.className = "result-div";
//   resultsContainer.appendChild(resultDiv);
// });

// const worker = new window.Worker("./fib-worker.js");
// btn.addEventListener("click", (e) => {
//   errPar.textContent = "";
//   const num = window.Number(input.value);
//   if (num < 2) {
//     errPar.textContent = "Please enter a number greater than 2";
//     return;
//   }

//   worker.postMessage({ num });
//   worker.onerror = (err) => err;
//   worker.onmessage = (e) => {
//     const { time, fibNum } = e.data;
//     const resultDiv = document.createElement("div");
//     resultDiv.innerHTML = textCont(num, fibNum, time);
//     resultDiv.className = "result-div";
//     resultsContainer.appendChild(resultDiv);
//   };
// });

btn.addEventListener("click", (e) => {
  errPar.textContent = "";
  const num = window.Number(input.value);
  
  if (num < 2) {
    errPar.textContent = "Please enter a number greater than 2";
    return;
  }
  
  const worker = new window.Worker("./fib-worker.js");
  worker.postMessage({ num });
  worker.onerror = (err) => err;
  worker.onmessage = (e) => {
    const { time, fibNum } = e.data;
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = textCont(num, fibNum, time);
    resultDiv.className = "result-div";
    resultsContainer.appendChild(resultDiv);
    worker.terminate()
  };
});