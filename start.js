// start.js
const { exec } = require('child_process');

// Comando per avviare il frontend
const frontend = exec('npm start --prefix frontend', (error, stdout, stderr) => {
  if (error) {
    console.error(`Errore frontend: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Errore frontend: ${stderr}`);
    return;
  }
  console.log(`Frontend: ${stdout}`);
});

// Comando per avviare il backend
const backend = exec('npm start --prefix backend', (error, stdout, stderr) => {
  if (error) {
    console.error(`Errore backend: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Errore backend: ${stderr}`);
    return;
  }
  console.log(`Backend: ${stdout}`);
});

// Gestisci l'output del terminale per renderlo più leggibile
frontend.stdout.on('data', (data) => {
  console.log(`[Frontend] ${data}`);
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend] ${data}`);
});
