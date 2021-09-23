let operator, previousEntry, currentEntry
let tempResult = false
const previousEntryEl = document.querySelector("#previousEntry")
const currentEntryEl = document.querySelector("#currentEntry")
const equalsBtnEl = document.querySelector("#equalsBtn")
const clearBtnEl = document.querySelector("#clear")
const plusMinusBtnEl = document.querySelector("#plusMinus")
const piBtnEl = document.querySelector("#pi")
const numBtnEls = document.querySelectorAll(".numBtn")
const orangeBtns = document.querySelectorAll(".orangeBtn")

// EVENT LISTENERS
equalsBtnEl.addEventListener("click", (e) => {
  if (operator && previousEntry && currentEntry) compute()
})
clearBtnEl.addEventListener("click", clear)
numBtnEls.forEach((numBtn) => {
  numBtn.addEventListener("click", (e) => {
    if (tempResult) {
      currentEntry = null
      tempResult = false
    }
    let clickedText = numBtn.textContent
    if (currentEntry && currentEntry.length > 8) return
    if (clickedText === ".") {
      if (!currentEntry) {
        clickedText = "0."
      }
      if (currentEntry.toString().includes(".")) return
    }
    currentEntry = currentEntry ? (currentEntry += clickedText) : clickedText
    currentEntryEl.textContent = currentEntry
  })
})
plusMinusBtnEl.addEventListener("click", (e) => {
  if (!currentEntry) return
  const currFloat = parseFloat(currentEntry)
  currentEntry = currFloat > 0 ? -Math.abs(currFloat) : Math.abs(currFloat)
  currentEntryEl.textContent = currentEntry
})
piBtnEl.addEventListener("click", (e) => {
  currentEntry = Math.PI
  currentEntryEl.textContent = currentEntry
})
orangeBtns.forEach((orangeBtn) => {
  if (orangeBtn.textContent === "=") return
  orangeBtn.addEventListener("click", lockEntry)
})

function lockEntry(e) {
  const clickedOp = e.target.textContent
  const opName = getOpName(clickedOp)
  if (opName) {
    operator = opName
  }
  if (operator && previousEntry && currentEntry) {
    compute()
  }
  previousEntry = currentEntryEl.textContent
  operator = opName
  previousEntryEl.textContent = `${previousEntry} ${clickedOp}`
  currentEntry = null
}

function getOpName(clickedOp) {
  switch (clickedOp) {
    case "+":
      return "add"
    case "-":
      return "subtract"
    case "*":
      return "multiply"
    case "/":
      return "divide"
    default:
      return null
  }
}

function compute() {
  const fullResult = operate(operator, previousEntry, currentEntry).toString()
  const result = fullResult.length > 8 ? fullResult.slice(0, 9) : fullResult
  previousEntry = null
  currentEntry = result
  operator = null
  previousEntryEl.textContent = ""
  currentEntryEl.textContent = result
  tempResult = true
}

function operate(operator, input1, input2) {
  const result = this[operator](parseFloat(input1), parseFloat(input2))
  console.log(result)
  return result
}

function clear() {
  previousEntry = null
  currentEntry = null
  operator = null
  previousEntryEl.textContent = ""
  currentEntryEl.textContent = "0"
}

function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}
