import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Slider, Typography } from '@mui/material';

// Define types for the state
interface Boid {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
}

const Boids: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numBoids, setNumBoids] = useState<number>(50);
  const [speed, setSpeed] = useState<number>(2);
  const [alignment, setAlignment] = useState<number>(1);
  const [cohesion, setCohesion] = useState<number>(1);
  const [separation, setSeparation] = useState<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 500;

    class BoidClass implements Boid {
      position: { x: number; y: number };
      velocity: { x: number; y: number };
      acceleration: { x: number; y: number };

      constructor(x: number, y: number) {
        this.position = { x, y };
        this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
        this.acceleration = { x: 0, y: 0 };
      }

      update() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.acceleration.x = 0;
        this.acceleration.y = 0;

        // Boundary conditions
        if (this.position.x > canvas!.width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = canvas!.width;
        if (this.position.y > canvas!.height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = canvas!.height;
      }

      applyForce(force: { x: number; y: number }) {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
      }

      align(boids: BoidClass[]): { x: number; y: number } {
        let perceptionRadius = 50;
        let steering = { x: 0, y: 0 };
        let total = 0;
        boids.forEach(other => {
          const d = this.distance(other);
          if (other !== this && d < perceptionRadius) {
            steering.x += other.velocity.x;
            steering.y += other.velocity.y;
            total++;
          }
        });
        if (total > 0) {
          steering.x /= total;
          steering.y /= total;
          steering = this.setMagnitude(steering, speed);
          steering.x -= this.velocity.x;
          steering.y -= this.velocity.y;
          steering = this.limit(steering, alignment);
        }
        return steering;
      }

      cohere(boids: BoidClass[]): { x: number; y: number } {
        let perceptionRadius = 50;
        let steering = { x: 0, y: 0 };
        let total = 0;
        boids.forEach(other => {
          const d = this.distance(other);
          if (other !== this && d < perceptionRadius) {
            steering.x += other.position.x;
            steering.y += other.position.y;
            total++;
          }
        });
        if (total > 0) {
          steering.x /= total;
          steering.y /= total;
          steering.x -= this.position.x;
          steering.y -= this.position.y;
          steering = this.setMagnitude(steering, speed);
          steering.x -= this.velocity.x;
          steering.y -= this.velocity.y;
          steering = this.limit(steering, cohesion);
        }
        return steering;
      }

      separate(boids: BoidClass[]): { x: number; y: number } {
        let perceptionRadius = 50;
        let steering = { x: 0, y: 0 };
        let total = 0;
        boids.forEach(other => {
          const d = this.distance(other);
          if (other !== this && d < perceptionRadius) {
            let diff = { x: this.position.x - other.position.x, y: this.position.y - other.position.y };
            diff = this.setMagnitude(diff, 1 / d);
            steering.x += diff.x;
            steering.y += diff.y;
            total++;
          }
        });
        if (total > 0) {
          steering.x /= total;
          steering.y /= total;
          steering = this.setMagnitude(steering, speed);
          steering.x -= this.velocity.x;
          steering.y -= this.velocity.y;
          steering = this.limit(steering, separation);
        }
        return steering;
      }

      distance(other: BoidClass): number {
        return Math.sqrt(
          (this.position.x - other.position.x) ** 2 + (this.position.y - other.position.y) ** 2
        );
      }

      setMagnitude(vector: { x: number; y: number }, mag: number): { x: number; y: number } {
        const length = Math.sqrt(vector.x ** 2 + vector.y ** 2);
        if (length > 0) {
          return { x: (vector.x / length) * mag, y: (vector.y / length) * mag };
        }
        return { x: 0, y: 0 };
      }

      limit(vector: { x: number; y: number }, max: number): { x: number; y: number } {
        if (Math.sqrt(vector.x ** 2 + vector.y ** 2) > max) {
          return this.setMagnitude(vector, max);
        }
        return vector;
      }
    }

    let boids: BoidClass[] = [];
    for (let i = 0; i < numBoids; i++) {
      boids.push(new BoidClass(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      boids.forEach(boid => {
        ctx.beginPath();
        ctx.arc(boid.position.x, boid.position.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
      });
    };

    const updateBoids = () => {
      boids.forEach(boid => {
        const alignmentForce = boid.align(boids);
        const cohesionForce = boid.cohere(boids);
        const separationForce = boid.separate(boids);

        boid.applyForce(alignmentForce);
        boid.applyForce(cohesionForce);
        boid.applyForce(separationForce);

        boid.update();
      });
    };

    const animate = () => {
      draw();
      updateBoids();
      requestAnimationFrame(animate);
    };

    animate();
  }, [numBoids, speed, alignment, cohesion, separation]);

  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <canvas ref={canvasRef} />
        <Typography variant="h6">Boids Simulation Controls</Typography>
        <Box display="flex" flexDirection="column" width="100%" gap={2}>
          <Typography gutterBottom>Number of Boids</Typography>
          <Slider value={numBoids} onChange={(e, val) => setNumBoids(val as number)} min={10} max={100} />
          <Typography gutterBottom>Speed</Typography>
          <Slider value={speed} onChange={(e, val) => setSpeed(val as number)} min={1} max={5} step={0.1} />
          <Typography gutterBottom>Alignment</Typography>
          <Slider value={alignment} onChange={(e, val) => setAlignment(val as number)} min={0} max={2} step={0.1} />
          <Typography gutterBottom>Cohesion</Typography>
          <Slider value={cohesion} onChange={(e, val) => setCohesion(val as number)} min={0} max={2} step={0.1} />
          <Typography gutterBottom>Separation</Typography>
          <Slider value={separation} onChange={(e, val) => setSeparation(val as number)} min={0} max={2} step={0.1} />
        </Box>
      </Box>
    </Paper>
  );
};

export default Boids;
