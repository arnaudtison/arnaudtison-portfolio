/* eslint-disable react/no-unknown-property */
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Center,
  Decal,
  useTexture,
} from '@react-three/drei';

// ... [KEEP ALL YOUR IMPORTED ICONS HERE] ...
// (I am omitting the imports to save space, keep them exactly as you have them)
import iconHTML from '../assets/html1.png';
import iconCSS from '../assets/css1.png';
import iconJAVA from '../assets/java1.png';
import iconJS from '../assets/js.png';
import iconTS from '../assets/ts1.png';
import iconREACT from '../assets/react1.png';
import iconCSHARP from '../assets/csharp1.png';
import iconBLAZOR from '../assets/blazor1.png';
import iconPYTHON from '../assets/python1.png';
import iconSQL from '../assets/mysql.png';
import iconNODE from '../assets/nodejs1.png';
import iconGH from '../assets/github.png';
import fallbackIcon from '../assets/at_logo.png';

const getIcon = (img) => img || fallbackIcon;

const KEYS = [
  // Row 1
  {
    color: '#fff',
    label: 'html',
    icon: getIcon(iconHTML),
    desc: 'Structure & Semantics.',
    details: 'I use HTML as the backbone of every web application I build, focusing heavily on semantic structure and accessibility. I ensure that my markup is clean and SEO-friendly, providing a solid foundation for styling and interactivity across all devices.',
  },
  {
    color: '#fff',
    label: 'css',
    icon: getIcon(iconCSS),
    desc: 'Styling & Layout.',
    details: 'I leverage CSS to transform raw markup into visually engaging interfaces. My workflow typically involves using Flexbox and Grid for responsive layouts, and I am comfortable organizing styles for scalability, whether through raw CSS, modules, or pre-processors.',
  },
  {
    color: '#F7DF1C',
    label: 'javascript',
    icon: getIcon(iconJS),
    desc: 'Interactive Logic.',
    details: 'JavaScript is my primary tool for adding interactivity to the browser. I have extensive experience manipulating the DOM, handling asynchronous data requests, and writing clean, modern ES6+ code to create seamless user experiences without relying solely on frameworks.',
  },
  {
    color: '#397CC7',
    label: 'typescript',
    icon: getIcon(iconTS),
    desc: 'Type-safe JavaScript.',
    details: 'I adopt TypeScript in larger codebases to ensure robustness and maintainability. By defining strict types and interfaces, I can catch errors at compile-time rather than runtime, which significantly speeds up my debugging process and makes refactoring complex features much safer.',
  },
  // Row 2
  {
    color: '#fff',
    label: 'java',
    icon: getIcon(iconJAVA),
    desc: 'Backend & Enterprise.',
    details: 'I have utilized Java for building reliable, high-performance backend systems. My experience includes understanding object-oriented principles and working with typical enterprise architectures, allowing me to manage strict data structures and server-side logic efficiently.',
  },
  {
    color: '#fff',
    label: 'react',
    icon: getIcon(iconREACT),
    desc: 'UI Library.',
    details: 'React is my go-to library for front-end development. I use it to build single-page applications with reusable components and efficient state management. I am proficient with Hooks and the component lifecycle, ensuring my applications are both performant and easy to scale.',
  },
  {
    color: '#fff',
    label: 'c#',
    icon: getIcon(iconCSHARP),
    desc: 'General Purpose.',
    details: 'I use C# primarily within the .NET ecosystem for robust backend development. I appreciate its strong typing and modern syntax features, which I leverage to build secure, scalable APIs and services that integrate seamlessly with Microsoft-based infrastructures.',
  },
  {
    color: '#5B2E8E',
    label: 'blazor',
    icon: getIcon(iconBLAZOR),
    desc: 'C# for the Web.',
    details: 'I have experimented with Blazor to build interactive web UIs using C# instead of JavaScript. It allows me to share logic between client and server, and I enjoy using it for full-stack .NET projects where type consistency across the entire stack is a priority.',
  },
  // Row 3
  {
    color: '#fff',
    label: 'python',
    icon: getIcon(iconPYTHON),
    desc: 'Data & Scripting.',
    details: 'I utilize Python for data analysis, automation scripts, and occasionally backend development. Its readability makes it excellent for rapid prototyping, and I have used it to process datasets and automate repetitive workflows that would be cumbersome in other languages.',
  },
  {
    color: '#fff',
    label: 'sql',
    icon: getIcon(iconSQL),
    desc: 'Database Management.',
    details: 'I use SQL to design and manage relational databases, ensuring data integrity and efficient retrieval. I am comfortable writing complex queries to join tables, aggregate data, and optimize performance for data-driven applications.',
  },
  {
    color: '#80BD00',
    label: 'nodejs',
    icon: getIcon(iconNODE),
    desc: 'JS Runtime.',
    details: 'I use Node.js to bring JavaScript to the server, allowing me to build full-stack applications using a single language. I typically use it to create RESTful APIs and handle real-time data, taking advantage of its non-blocking event loop for high-performance tasks.',
  },
  {
    color: '#fff',
    label: 'github',
    icon: getIcon(iconGH),
    desc: 'Version Control.',
    details: 'GitHub is central to my development workflow. I use it not just for storing code, but for version control, collaboration via pull requests, and tracking issues. It ensures my projects are documented, safe, and easily accessible for team collaboration.',
  },
];

// ... [KEEP gridPositions and roundedRectShape HELPERS AS IS] ...
function gridPositions(count, cols = 4, spacing = 1.05) {
  const rows = Math.ceil(count / cols);
  const width = (cols - 1) * spacing;
  const depth = (rows - 1) * spacing;
  const startX = -width / 2;
  const startZ = -depth / 2;
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return [startX + col * spacing, 0, startZ + (rows - 1 - row) * spacing];
  });
}

function roundedRectShape(w, h, r) {
  const x = -w / 2;
  const y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

// ... [KEEP BasePlate and useTaperedKeycapGeometry AS IS] ...
function BasePlate({ width, depth, thickness = 0.3 }) {
  const geometry = useMemo(() => {
    const shape = roundedRectShape(width, depth, 0.2);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 8,
    });
    g.rotateX(-Math.PI / 2);
    g.computeVertexNormals();
    return g;
  }, [width, depth, thickness]);

  return (
    <mesh position={[0, thickness / 2 - 0.05, 0]} castShadow receiveShadow geometry={geometry}>
      <meshPhysicalMaterial 
        color="#fafafa"        // Almost pure white
        roughness={0.6}        // Smooth, but not a mirror
        metalness={0.1}        // Mostly dielectric (plastic/ceramic)
        clearcoat={0.3}        // Adds a layer of "polish" or "glaze" on top
        clearcoatRoughness={0.1} 
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function useTaperedKeycapGeometry(props) {
  const {
    bottomW = 1.0,
    bottomD = 1.0,
    height = 0.65,
    cornerR = 0.06,
    topScale = 0.82,
    chamfer = 0.03,
  } = props;
  return useMemo(() => {
    const shape = roundedRectShape(bottomW, bottomD, cornerR);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: chamfer,
      bevelSize: chamfer,
      bevelSegments: 5,
      curveSegments: 16,
    });
    g.rotateX(-Math.PI / 2);
    g.computeBoundingBox();
    const bb = g.boundingBox;
    const minY = bb?.min.y || 0;
    const spanY = Math.max(0.0001, (bb?.max.y || height) - minY);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = (v.y - minY) / spanY;
      const s = THREE.MathUtils.lerp(1.0, topScale, t);
      v.x *= s;
      v.z *= s;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    g.translate(0, -minY, 0);
    return g;
  }, [bottomW, bottomD, height, cornerR, topScale, chamfer]);
}

// ----------------------------------------------------
// KEYCAP COMPONENT (Updated with Interaction Props)
// ----------------------------------------------------
function Keycap({
  icon,
  color,
  position,
  bodyGeo,
  keyHeight,
  label,
  desc,
  details,
  setHoveredTech,
}) {
  const group = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pressDepth = 0.2;
  const targetY = hovered ? position[1] - pressDepth : position[1];

  useFrame((_, delta) => {
    if (group.current) {
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        targetY,
        delta * 20,
      );
    }
  });

  const texture = useTexture(icon);
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
    }
  }, [texture]);

  return (
    <group
      ref={group}
      position={position}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
        if (setHoveredTech) {
          // We pass color: "#000" so the text is visible (since keys are white)
          setHoveredTech({ label, desc, color, details });
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
        // CLEAR DATA
        if (setHoveredTech) setHoveredTech(null);
      }}
    >
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={color}
          roughness={0.5}
          metalness={0.2}
          clearcoat={0.4}
          envMapIntensity={0}
        />
        <Decal
          position={[0, keyHeight + 0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.6, 0.6, 0.6]}
          pointerEvents="none"
          raycast={() => null}
        >
          <meshBasicMaterial
            map={texture}
            transparent={true}
            polygonOffset={true}
            polygonOffsetFactor={-1}
            toneMapped={false}
          />
        </Decal>
      </mesh>
    </group>
  );
}

function CameraRig({ target }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(target);
    camera.updateProjectionMatrix();
  }, [camera, target]);
  return null;
}

// ----------------------------------------------------
// SCENE (Passes prop down)
// ----------------------------------------------------
function Scene({ setHoveredTech }) {
  const cols = 4;
  const spacing = 1.05;
  const positions = useMemo(
    () => gridPositions(KEYS.length, cols, spacing),
    [],
  );
  const keyHeight = 0.65;
  const bodyGeo = useTaperedKeycapGeometry({ height: keyHeight });
  const rows = Math.ceil(KEYS.length / cols);
  const baseW = cols * spacing + 0.4;
  const baseD = rows * spacing + 0.4;

  return (
    <Center position={[1, 0.5, 0]}>
      <group
        rotation={[
          THREE.MathUtils.degToRad(20),
          THREE.MathUtils.degToRad(30),
          THREE.MathUtils.degToRad(-10),
        ]}
      >
        <BasePlate width={baseW} depth={baseD} thickness={0.3} />
        {KEYS.map((k, i) => (
          <Keycap
            key={i}
            icon={k.icon}
            color={k.color}
            label={k.label} // Pass label
            desc={k.desc} // Pass desc
            details={k.details}
            setHoveredTech={setHoveredTech} // Pass function
            position={[positions[i][0], 0.32, positions[i][2]]}
            bodyGeo={bodyGeo}
            keyHeight={keyHeight}
          />
        ))}
      </group>
    </Center>
  );
}

// ----------------------------------------------------
// EXPORT
// ----------------------------------------------------
export default function TechKeycaps3D({ setHoveredTech }) {
  return (
    // FIX: Changed 100vw/vh to 100% so it fits in the parent container
    <div
      style={{
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [8, 6, 8], fov: 28 }}
        gl={{ outputColorSpace: THREE.SRGBColorSpace }}
      >
        {/* If you want a transparent background, REMOVE this line below: */}

        <CameraRig target={new THREE.Vector3(0, 0, 0)} />

        <ambientLight intensity={1.0} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, 10, -10]}
          />
        </directionalLight>
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#eef" />

        <Suspense fallback={null}>
          <Scene setHoveredTech={setHoveredTech} />
        </Suspense>
      </Canvas>
    </div>
  );
}
