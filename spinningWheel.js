function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* 
    Je ne suis pas très douée pour les noms, 
    et il serait injuste de n'écrire les noms 
    que de la moitié des étudiants, désolée.
  */
    const options = [
    'Nikita', 'Rachel', 'Yvan',
    'Alfonso', 'Ama', 'Bernard', 
    'Christelle', 'Daryl', 'Jonathan', 
    'Kevin', 'Michel'    
  ];
  const angleStep = (2 * Math.PI) / options.length;

  // Draw the wheel
  for (let i = 0; i < options.length; i++) {
    const startAngle = i * angleStep - (Math.PI / 2); 
    const endAngle = startAngle + angleStep;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    
    // Use HSL to generate a color
    ctx.fillStyle = `hsl(${i/options.length*360}, 100%, 75%)`;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
  }

  // Draw the options
  ctx.font = 'bold 14px Arial';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < options.length; i++) {
    const angle = (i * angleStep) - (Math.PI / 2);
    const x = centerX + Math.sin(angle) * (radius - 30);
    const y = centerY - Math.cos(angle) * (radius - 30);
    ctx.fillText(options[i], x, y);
  }

  // Draw the hand
  const handAngle = (Math.random() * 2 * Math.PI);
  drawHand(ctx, centerX, centerY, handAngle, radius * 0.7, 4);

  return handAngle;
}
  
  function drawHand(ctx, centerX, centerY, angle, length, width) {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    const x = centerX + Math.sin(angle) * length;
    const y = centerY - Math.cos(angle) * length;
    ctx.lineTo(x, y);
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.stroke();
  }
  
  // Attach event listener to the button
  const spinButton = document.getElementById('spinButton');
  spinButton.addEventListener('click', spinWheel);
  
  function spinWheel() {
    const result = document.getElementById('result');
    result.textContent = '';
  
    // Disable the button during spinning
    spinButton.disabled = true;
  
    const numSpins = Math.floor(Math.random() * 10) + 8;
    let currentSpin = 0;
    let handAngle = 0; 
    let intervalId = setInterval(spin, 100);
  
    function spin() {
      handAngle = drawWheel();
      currentSpin++;
  
      if (currentSpin >= numSpins) {
        clearInterval(intervalId);
        const options = [
          'Alfonso', 'Ama', 'Bernard', 
          'Christelle', 'Daryl', 'Jonathan', 
          'Kevin', 'Michel', 'Nikita', 
          'Rachel', 'Yvan'
        ];
        
        // Determine the selected option based on the final hand angle
        const fraction = handAngle / (2 * Math.PI);
        const index = Math.floor(fraction * options.length);
        const selectedOption = options[index];
  
        result.textContent = `${selectedOption}`;
        spinButton.disabled = false;
      }
    }
  }
  
  // Draw the initial wheel
  drawWheel();
  