const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lint_results.json', 'utf8'));
for (const file of data) {
  if (file.errorCount > 0) {
    console.log('File:', file.filePath);
    for (const msg of file.messages) {
      if (msg.severity === 2) { // 2 means error
        console.log(`  Line ${msg.line}: ${msg.message}`);
      }
    }
  }
}
