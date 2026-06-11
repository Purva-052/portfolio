// Custom 2D Physics Engine for Interactive Skills Canvas
// Implements Verlet/Euler integration, elastic collisions, friction, and mouse drag/throw physics.

class SkillNode {
  constructor(name, x, y, radius, color, textColor) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.mass = radius * 0.1; // Mass proportional to radius
    this.color = color;
    this.textColor = textColor;
    this.isGrabbed = false;
    this.elasticity = 0.65; // Bounce absorption factor (restitution)
  }
}

class SkillsPhysicsEngine {
  constructor(canvasId, skillsList) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    
    this.skillsData = skillsList;
    this.nodes = [];
    
    this.gravityX = 0;
    this.gravityY = 0.5; // Standard downward gravity
    this.friction = 0.985; // Air resistance
    
    this.activeGrabbedNode = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.mouseHistory = []; // Tracks velocities for smooth throwing
    
    this.isPlaying = false;
    this.initNodes();
    this.setupEvents();
    this.draw();
  }

  initNodes() {
    this.resizeCanvas();
    this.nodes = [];
    
    // Distribute skills evenly at start
    const columns = Math.ceil(Math.sqrt(this.skillsData.length));
    const gapX = this.canvas.width / (columns + 1);
    
    this.skillsData.forEach((skill, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      
      const x = gapX * (col + 1) + (Math.random() - 0.5) * 20;
      const y = 80 + row * 60 + (Math.random() - 0.5) * 20;
      
      // Calculate radius based on text length
      const radius = Math.max(38, this.ctx.measureText(skill.name).width + 22);
      
      const node = new SkillNode(
        skill.name,
        x,
        y,
        radius,
        skill.color || "#1f1f2e",
        skill.textColor || "#c2a4ff"
      );
      this.nodes.push(node);
    });
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight || 450;
  }

  setupEvents() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      // Keep nodes inside boundaries after resize
      this.nodes.forEach(node => {
        node.x = Math.max(node.radius, Math.min(this.canvas.width - node.radius, node.x));
        node.y = Math.max(node.radius, Math.min(this.canvas.height - node.radius, node.y));
      });
    });

    const getMousePos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleStart = (e) => {
      const pos = getMousePos(e);
      this.mouseX = pos.x;
      this.mouseY = pos.y;
      this.lastMouseX = pos.x;
      this.lastMouseY = pos.y;
      this.mouseHistory = [];

      // Check if mouse hits a node (prioritize top rendered node)
      for (let i = this.nodes.length - 1; i >= 0; i--) {
        const node = this.nodes[i];
        const dx = node.x - pos.x;
        const dy = node.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= node.radius) {
          node.isGrabbed = true;
          this.activeGrabbedNode = node;
          
          // Micro audio sound feedback on grab
          if (window.PortfolioAudio) {
            window.PortfolioAudio.playHover();
          }
          break;
        }
      }
    };

    const handleMove = (e) => {
      if (!this.activeGrabbedNode) return;
      // Prevent scrolling on mobile during grab
      if (e.cancelable) e.preventDefault();

      const pos = getMousePos(e);
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
      this.mouseX = pos.x;
      this.mouseY = pos.y;

      // Track mouse coordinates over frames for velocity estimation
      this.mouseHistory.push({ x: this.mouseX, y: this.mouseY, time: Date.now() });
      if (this.mouseHistory.length > 5) this.mouseHistory.shift();

      this.activeGrabbedNode.x = this.mouseX;
      this.activeGrabbedNode.y = this.mouseY;
      this.activeGrabbedNode.vx = 0;
      this.activeGrabbedNode.vy = 0;
    };

    const handleEnd = () => {
      if (!this.activeGrabbedNode) return;
      
      const node = this.activeGrabbedNode;
      node.isGrabbed = false;

      // Calculate throw velocity based on recent drag speed
      if (this.mouseHistory.length >= 2) {
        const startPos = this.mouseHistory[0];
        const endPos = this.mouseHistory[this.mouseHistory.length - 1];
        const dt = (endPos.time - startPos.time) / 1000; // time in seconds

        if (dt > 0) {
          node.vx = ((endPos.x - startPos.x) / dt) * 0.016; // scaled down to frame-rate velocity
          node.vy = ((endPos.y - startPos.y) / dt) * 0.016;
          
          // Clamp massive velocities to avoid glitching
          const maxVel = 25;
          node.vx = Math.max(-maxVel, Math.min(maxVel, node.vx));
          node.vy = Math.max(-maxVel, Math.min(maxVel, node.vy));
        }
      }

      // Micro click audio on release/throw
      if (window.PortfolioAudio) {
        window.PortfolioAudio.playClick(1.2);
      }

      this.activeGrabbedNode = null;
    };

    // Mouse bindings
    this.canvas.addEventListener("mousedown", handleStart);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    // Touch bindings
    this.canvas.addEventListener("touchstart", handleStart, { passive: false });
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
  }

  setGravity(type) {
    if (type === "down") {
      this.gravityX = 0;
      this.gravityY = 0.5;
    } else if (type === "up") {
      this.gravityX = 0;
      this.gravityY = -0.5;
    } else if (type === "left") {
      this.gravityX = -0.5;
      this.gravityY = 0;
    } else if (type === "right") {
      this.gravityX = 0.5;
      this.gravityY = 0;
    } else if (type === "zero") {
      this.gravityX = 0;
      this.gravityY = 0;
    }
  }

  // Physics engine step updates
  update() {
    const width = this.canvas.width;
    const height = this.canvas.height;

    // 1. Move elements and apply forces
    this.nodes.forEach(node => {
      if (node.isGrabbed) return;

      // Apply Gravity
      node.vx += this.gravityX;
      node.vy += this.gravityY;

      // Apply Air Resistance
      node.vx *= this.friction;
      node.vy *= this.friction;

      // Move Node
      node.x += node.vx;
      node.y += node.vy;

      // 2. Wall Collisions (Clamp position to boundary and reverse speed)
      if (node.x - node.radius < 0) {
        node.x = node.radius;
        node.vx = -node.vx * node.elasticity;
      } else if (node.x + node.radius > width) {
        node.x = width - node.radius;
        node.vx = -node.vx * node.elasticity;
      }

      if (node.y - node.radius < 0) {
        node.y = node.radius;
        node.vy = -node.vy * node.elasticity;
      } else if (node.y + node.radius > height) {
        node.y = height - node.radius;
        node.vy = -node.vy * node.elasticity;
        
        // Add soft sliding friction when hitting the bottom floor
        node.vx *= 0.95;
      }
    });

    // 3. Elastic Circle-to-Circle Collisions (Double Loop)
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];

        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = n1.radius + n2.radius;

        if (dist < minDist) {
          // Resolve overlap (static resolution)
          const overlap = minDist - dist;
          const nx = dx / dist; // Collision normal X
          const ny = dy / dist; // Collision normal Y

          // Distribute corrective displacement based on mass
          const totalMass = n1.mass + n2.mass;
          const correctionX = nx * overlap;
          const correctionY = ny * overlap;

          if (!n1.isGrabbed) {
            n1.x -= correctionX * (n2.mass / totalMass);
            n1.y -= correctionY * (n2.mass / totalMass);
          }
          if (!n2.isGrabbed) {
            n2.x += correctionX * (n1.mass / totalMass);
            n2.y += correctionY * (n1.mass / totalMass);
          }

          // Dynamic Resolution: Elastic impulse response
          const kx = n1.vx - n2.vx;
          const ky = n1.vy - n2.vy;
          const relativeVelocity = kx * nx + ky * ny;

          // Only calculate if nodes are moving towards each other
          if (relativeVelocity > 0) {
            const restitution = Math.min(n1.elasticity, n2.elasticity);
            const impulse = ((1 + restitution) * relativeVelocity) / (1 / n1.mass + 1 / n2.mass);
            
            const impulseX = impulse * nx;
            const impulseY = impulse * ny;

            if (!n1.isGrabbed) {
              n1.vx -= impulseX / n1.mass;
              n1.vy -= impulseY / n1.mass;
            }
            if (!n2.isGrabbed) {
              n2.vx += impulseX / n2.mass;
              n2.vy += impulseY / n2.mass;
            }
          }
        }
      }
    }
  }

  // Draw nodes on canvas
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connecting lines if nodes are close to each other
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "rgba(194, 164, 255, 0.1)"; // faint purple
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          this.ctx.beginPath();
          this.ctx.moveTo(n1.x, n1.y);
          this.ctx.lineTo(n2.x, n2.y);
          this.ctx.stroke();
        }
      }
    }

    // Draw individual nodes
    this.nodes.forEach(node => {
      this.ctx.save();
      
      // Node circle glow
      this.ctx.shadowBlur = node.isGrabbed ? 15 : 4;
      this.ctx.shadowColor = node.textColor;
      
      // Node circle body
      this.ctx.fillStyle = node.color;
      this.ctx.strokeStyle = node.textColor;
      this.ctx.lineWidth = 2.5;
      
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      
      // Node Text
      this.ctx.shadowBlur = 0; // disable shadow for text sharpness
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 13px 'JetBrains Mono', 'Courier New', monospace";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(node.name, node.x, node.y);
      
      this.ctx.restore();
    });
  }

  // Start engine loop
  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    
    const loop = () => {
      if (!this.isPlaying) return;
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() {
    this.isPlaying = false;
  }
}

// Bind to window to allow global activation
window.SkillsPhysicsEngine = SkillsPhysicsEngine;
