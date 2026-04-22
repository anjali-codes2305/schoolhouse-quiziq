const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lint_results.json', 'utf8'));
let output = '';
for (const file of data) {
  if (file.errorCount > 0) {
    output += 'File: ' + file.filePath + '\n';
    for (const msg of file.messages) {
      if (msg.severity === 2) {
        output += `  Line ${msg.line}: ${msg.message}\n`;
      }
    }
  }
}
fs.writeFileSync('lint_errors.txt', output, 'utf8');
