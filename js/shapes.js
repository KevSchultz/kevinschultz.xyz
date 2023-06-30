export function triangle(ctx, x, y, heading, size, color) {
    var c = .433;
    var dx = (size/2);
    var dy = (size * c);
    ctx.translate(x, y); //translate to center of shape
    ctx.rotate(heading); //rotate 
    ctx.translate(-x, -y); //translate center back to 0,0
    ctx.beginPath();
    ctx.moveTo(x, y - dy * 2);
    ctx.lineTo(x + dx, y + dy);
    ctx.lineTo(x - dx, y + dy);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
}

export function circle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.fill();
}

export function rectangle(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

export function line(ctx, x1, y1, x2, y2, lineWidth, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export function angleLine(ctx, x, y, angle, length, lineWidth, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(angle), y - length * Math.sin(angle));
    ctx.stroke();
}

export function drawText(ctx, x, y, font, color, text) {
    ctx.font = font;
    ctx.fillStyle = color
    ctx.fillText(text, x, y);
}

export function drawSmile(ctx, x, y, radius) {
      // Draw the face
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI); // Outer circle
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();

      // Calculate the position and size of the eyes and mouth relative to the face radius
      var eyeRadius = radius * 0.15;
      var eyeOffsetX = radius * 0.3;
      var eyeOffsetY = radius * 0.25;
      var mouthOffsetY = radius * 0.1;
      var mouthRadius = radius * 0.5;

      // Draw the eyes
      ctx.beginPath();
      ctx.arc(x - eyeOffsetX, y - eyeOffsetY, eyeRadius, 0, 2 * Math.PI); // Left eye
      ctx.fillStyle = "black";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + eyeOffsetX, y - eyeOffsetY, eyeRadius, 0, 2 * Math.PI); // Right eye
      ctx.fillStyle = "black";
      ctx.fill();

      // Draw the mouth
      ctx.beginPath();
      ctx.arc(x, y + mouthOffsetY, mouthRadius, Math.PI * 0.25, Math.PI * 0.75); // Mouth
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();
}