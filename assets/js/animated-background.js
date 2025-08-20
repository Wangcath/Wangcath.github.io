/**
 * Animated Background with Dots and Lines
 * Creates a subtle animated background with moving dots and connecting lines
 */

class AnimatedBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.dots = [];
        this.animationId = null;
        this.maxDots = 60;
        this.maxDistance = 120;
        this.dotSpeed = 0.3;
        
        this.init();
    }
    
    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'animated-background';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            opacity: 0.3;
        `;
        
        // Add canvas to body
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resize();
        
        // Initialize dots
        this.createDots();
        
        // Start animation
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
        
        // Pause animation when page is not visible (battery saving)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.animationId = null;
                }
            } else {
                if (!this.animationId) {
                    this.animate();
                }
            }
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createDots() {
        this.dots = [];
        const area = this.canvas.width * this.canvas.height;
        const dotCount = Math.min(this.maxDots, Math.floor(area / 20000));
        
        // Reduce dots on mobile devices
        const isMobile = window.innerWidth < 768;
        const finalDotCount = isMobile ? Math.floor(dotCount * 0.6) : dotCount;
        
        for (let i = 0; i < finalDotCount; i++) {
            this.dots.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.dotSpeed,
                vy: (Math.random() - 0.5) * this.dotSpeed,
                radius: Math.random() * 1.5 + 0.8,
                opacity: Math.random() * 0.4 + 0.2,
                life: Math.random() * 100 + 50
            });
        }
    }
    
    updateDots() {
        for (let i = this.dots.length - 1; i >= 0; i--) {
            const dot = this.dots[i];
            
            // Update position
            dot.x += dot.vx;
            dot.y += dot.vy;
            
            // Bounce off edges
            if (dot.x <= 0 || dot.x >= this.canvas.width) {
                dot.vx *= -1;
                dot.x = Math.max(0, Math.min(this.canvas.width, dot.x));
            }
            if (dot.y <= 0 || dot.y >= this.canvas.height) {
                dot.vy *= -1;
                dot.y = Math.max(0, Math.min(this.canvas.height, dot.y));
            }
            
            // Update life
            dot.life--;
            if (dot.life <= 0) {
                this.dots.splice(i, 1);
                // Create new dot
                this.dots.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * this.dotSpeed,
                    vy: (Math.random() - 0.5) * this.dotSpeed,
                    radius: Math.random() * 1.5 + 0.8,
                    opacity: Math.random() * 0.4 + 0.2,
                    life: Math.random() * 100 + 50
                });
            }
        }
    }
    
    drawDots() {
        for (const dot of this.dots) {
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${dot.opacity})`;
            this.ctx.fill();
        }
    }
    
    drawLines() {
        for (let i = 0; i < this.dots.length; i++) {
            for (let j = i + 1; j < this.dots.length; j++) {
                const dx = this.dots[i].x - this.dots[j].x;
                const dy = this.dots[i].y - this.dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    const opacity = (1 - distance / this.maxDistance) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.dots[i].x, this.dots[i].y);
                    this.ctx.lineTo(this.dots[j].x, this.dots[j].y);
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw
        this.updateDots();
        this.drawLines();
        this.drawDots();
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize when DOM is ready
let animationInstance = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        animationInstance = new AnimatedBackground();
    });
} else {
    animationInstance = new AnimatedBackground();
}