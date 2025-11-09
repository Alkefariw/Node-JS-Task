const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

const message = `
Dear Ahmed,

Quick update on the Node.js task. I did not forget it - I chased IT for three weeks, and they only approved my access yesterday.

Why did it take so long? Because they did not even know what Node.js is. When I mentioned downloading it, they thought it was a coffee shop at KAFD. And when they finally approved it, they said, [No libraries. No IDE. Just plain JS.

You asked for [Hello World], but I decided to get creative and turned my email into the server itself (and apologies for the delay - it was out of my hands).

Best,
Waleed
`;

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Waleed’s Calculator!</h1>
    <h2>${message}</h2>
    <form action="/calculate" method="POST">
      <input type="number" name="num1" placeholder="Enter first number" required />
      <input type="number" name="num2" placeholder="Enter second number" required />
      <select name="operation">
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">×</option>
        <option value="divide">÷</option>
      </select>
      <button type="submit">Calculate</button>
    </form>
  `);
});

app.post('/calculate', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operation = req.body.operation;
  let result;

  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
      break;
    default:
      result = 'Invalid operation';
  }

  res.send(`
    <h2>Result</h2>
    <p>${num1} ${operation === 'add' ? '+' : operation === 'subtract' ? '-' : operation === 'multiply' ? '×' : '÷'} ${num2} = ${result}</p>
    <a href="/">Back</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
