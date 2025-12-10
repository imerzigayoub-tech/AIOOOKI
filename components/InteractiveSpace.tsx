import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveSpaceProps {
  variant?: 'hero' | 'interior' | 'graphic';
  className?: string;
}

const InteractiveSpace: React.FC<InteractiveSpaceProps> = ({ variant = 'hero', className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Get container dimensions
    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    if (variant === 'hero') {
      scene.fog = new THREE.FogExp2(0x050505, 0.002);
    }

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // --- Objects based on Variant ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    let mainMesh: THREE.Mesh;
    let coreMesh: THREE.Mesh | null = null;
    let ringMesh: THREE.Mesh | null = null;

    if (variant === 'hero') {
        // Hero: Glass Sphere
        const geometry = new THREE.IcosahedronGeometry(1.8, 10);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0,
            metalness: 0.1,
            transmission: 0.95,
            thickness: 1.5,
            ior: 1.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
        });
        mainMesh = new THREE.Mesh(geometry, material);
        
        const coreGeo = new THREE.IcosahedronGeometry(0.8, 4);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, wireframe: true });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        mainMesh.add(coreMesh);

        const ringGeo = new THREE.TorusGeometry(3.5, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.3 });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        scene.add(ringMesh);

    } else if (variant === 'interior') {
        // Interior: Architectural Cube Structure
        const geometry = new THREE.BoxGeometry(2.2, 2.2, 2.2);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xcd7f32, // Bronze/Wood tone
            roughness: 0.1,
            metalness: 0.4,
            transmission: 0.2,
            clearcoat: 1,
            transparent: true,
            opacity: 0.9
        });
        mainMesh = new THREE.Mesh(geometry, material);
        
        // Architectural wireframe edges
        const edges = new THREE.EdgesGeometry(geometry); 
        const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        wireframe.scale.set(1.1, 1.1, 1.1);
        mainMesh.add(wireframe);

        // Inner core
        const coreGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true });
        coreMesh = new THREE.Mesh(coreGeo, coreMat);
        mainMesh.add(coreMesh);

    } else { // graphic
        // Graphic: Abstract Digital Knot
        const geometry = new THREE.OctahedronGeometry(1.8, 0);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x22d3ee, // Cyan
            roughness: 0.2,
            metalness: 0.9,
            transmission: 0.5,
            flatShading: true
        });
        mainMesh = new THREE.Mesh(geometry, material);

        // Orbiting digital ring
        const ringGeo = new THREE.TorusGeometry(2.8, 0.03, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xd946ef, wireframe: true });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        mainGroup.add(ringMesh);
    }
    
    mainGroup.add(mainMesh);

    // --- Starfield (Common) ---
    const starGeo = new THREE.BufferGeometry();
    const starCount = variant === 'hero' ? 1500 : 800;
    const posArray = new Float32Array(starCount * 3);
    for(let i = 0; i < starCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 60; 
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMat = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xffffff,
        transparent: true,
        opacity: variant === 'hero' ? 0.6 : 0.4,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(variant === 'interior' ? 0xffaa00 : 0xd946ef, 2); 
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(variant === 'graphic' ? 0x00ffff : 0x3b82f6, 2);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // --- Interaction ---
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position relative to center of screen for parallax
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };
    document.addEventListener('mousemove', onMouseMove);

    // --- Animation ---
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mainGroup.rotation.y += 0.005;
      mainGroup.rotation.x += 0.002;

      // Mouse Parallax
      mainGroup.position.x += (mouseX * 2 - mainGroup.position.x) * 0.05;
      mainGroup.position.y += (-mouseY * 2 - mainGroup.position.y) * 0.05;

      if (coreMesh) {
          coreMesh.rotation.y -= 0.01;
          coreMesh.rotation.x -= 0.01;
      }
      if (ringMesh) {
          ringMesh.rotation.x = (Math.PI / 2) + (mouseY * 0.5);
          ringMesh.rotation.y = mouseX * 0.5;
      }

      stars.rotation.y -= 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const handleResize = () => {
        if (!mountRef.current) return;
        width = mountRef.current.clientWidth;
        height = mountRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      if(mountRef.current && renderer.domElement.parentNode === mountRef.current) {
         mountRef.current.removeChild(renderer.domElement);
      }
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Cleanup
      mainMesh.geometry.dispose();
      (mainMesh.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [variant]);

  return <div ref={mountRef} className={`absolute inset-0 z-0 bg-transparent overflow-hidden ${className}`} />;
};

export default InteractiveSpace;