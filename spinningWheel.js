function drawWheel(handAngle) {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const options = [
    'Alfonso', 'Ama', 'Bernard', 
    'Christelle', 'Daryl', 'Jonathan', 
    'Kevin', 'Michel', 'Nikita', 
    'Rachel', 'Yvan'
  ];
  const angleStep = (2 * Math.PI) / options.length;

  // Draw the wedges
  for (let i = 0; i < options.length; i++) {
    const startAngle = i * angleStep; 
    const endAngle = startAngle + angleStep;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    
    // Use HSL to generate a color
    ctx.fillStyle = `hsl(${i / options.length * 360}, 100%, 75%)`;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
  }

  // Draw the option text
  for (let i = 0; i < options.length; i++) {
    ctx.save();
    ctx.translate(centerX, centerY);

    // Calculate the angle in the middle of the wedge
    const textAngle = (i * angleStep) + angleStep / 2;

    // Rotate the canvas to the correct angle
    ctx.rotate(textAngle);

    // Position the text a little closer to the center if necessary
    const textRadius = radius * 0.8; // Adjust this as needed

    // Draw the text
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(options[i], 1, -textRadius);

    ctx.restore();
  }

  drawHand(ctx, centerX, centerY, handAngle, radius * 0.7, 4);
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
  const totalRotation = numSpins * 2 * Math.PI; // Total rotation for the wheel
  let currentRotation = 0;
  const spinDuration = 2000; // 2 seconds for the spin
  const startTime = Date.now();
  
  // Introduce a random offset for the final angle
  const randomOffset = Math.random() * 2 * Math.PI;
  let handAngle = 0;

  function animateSpin() {
    const elapsedTime = Date.now() - startTime;
    const progress = elapsedTime / spinDuration;
    
    // Ease out effect for smoother stop
    const easedProgress = easeOut(progress);

    currentRotation = totalRotation * easedProgress;
    handAngle = (currentRotation + randomOffset) % (2 * Math.PI);

    drawWheel(handAngle);

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
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

  requestAnimationFrame(animateSpin);
}

// Ease out function for smoother stop
function easeOut(t) {
  return t * (2 - t);
}

drawWheel(0);
