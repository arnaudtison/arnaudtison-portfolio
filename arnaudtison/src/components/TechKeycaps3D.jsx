// TechKeycaps3D.jsx
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Decal,
  Environment,
  useTexture,
} from "@react-three/drei";

// ... [KEEP ALL YOUR IMPORTED ICONS HERE] ...
// (I am omitting the imports to save space, keep them exactly as you have them)
import iconHTML from "../assets/html.png";
import iconCSS from "../assets/css.png";
import iconJAVA from "../assets/java.png";
import iconJS from "../assets/js.png";
import iconTS from "../assets/ts.png";
import iconREACT from "../assets/react-logo.png";
import iconCSHARP from "../assets/csharp.png";
import iconBLAZOR from "../assets/blazor.png";
import iconPYTHON from "../assets/python.png";
import iconSQL from "../assets/sql.png";
import iconNODE from "../assets/nodejs.png";
import iconGH from "../assets/github.png";
import fallbackIcon from "../assets/at_logo.png";

const getIcon = (img) => img || fallbackIcon;

const KEYS = [
  // Row 1
  { label: "HTML", icon: getIcon(iconHTML), desc: "The structure of the web." },
  { label: "CSS", icon: getIcon(iconCSS),desc: "Styling and layout." },
  { label: "JS", icon: getIcon(iconJS), desc: "Interactive logic." },
  { label: "TS", icon: getIcon(iconTS), desc: "Type-safe JavaScript." },
  // Row 2
  { label: "JAVA", icon: getIcon(iconJAVA), desc: "Backend & Enterprise." },
  { label: "REACT", icon: getIcon(iconREACT), desc: "UI Library." },
  { label: "C#", icon: getIcon(iconCSHARP), desc: "General purpose." },
  { label: "BLAZOR", icon: getIcon(iconBLAZOR), desc: "C# for the web." },
  // Row 3
  { label: "PYTHON", icon: getIcon(iconPYTHON), desc: "Data & Scripting." },
  { label: "SQL", icon: getIcon(iconSQL), desc: "Database management." },
  { label: "NODE", icon: getIcon(iconNODE), desc: "JS Runtime." },
  { label: "GITHUB", icon: getIcon(iconGH), desc: "Version Control." },
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
      <meshPhysicalMaterial color="#1a1a1a" roughness={0.8} metalness={0.1} envMapIntensity={0.3} />
    </mesh>
  );
}

function useTaperedKeycapGeometry(props) {
  const { bottomW = 1.0, bottomD = 1.0, height = 0.65, cornerR = 0.06, topScale = 0.82, chamfer = 0.03 } = props;
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
function Keycap({ icon, color, position, bodyGeo, keyHeight, label, desc, setHoveredTech }) {
  const group = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pressDepth = 0.2;
  const targetY = hovered ? position[1] - pressDepth : position[1];

  useFrame((_, delta) => {
    if (group.current) {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, delta * 20);
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
        document.body.style.cursor = "pointer";
        // PASS DATA UP TO PARENT
        if (setHoveredTech) setHoveredTech({ label, desc, color });
      }}
      onPointerLeave={(e) => {
        setHovered(false);
        document.body.style.cursor = "default";
        // CLEAR DATA
        if (setHoveredTech) setHoveredTech(null);
      }}
    >
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshPhysicalMaterial color={color} roughness={0.75} metalness={0.0} clearcoat={0.0} envMapIntensity={0.5} />
        <Decal
          position={[0, keyHeight + 0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.6, 0.6, 0.6]}
          pointerEvents="none" 
          raycast={() => null} 
        >
          <meshBasicMaterial map={texture} transparent={true} polygonOffset={true} polygonOffsetFactor={-1} toneMapped={false} />
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
  const positions = useMemo(() => gridPositions(KEYS.length, cols, spacing), []);
  const keyHeight = 0.65;
  const bodyGeo = useTaperedKeycapGeometry({ height: keyHeight });
  const rows = Math.ceil(KEYS.length / cols);
  const baseW = cols * spacing + 0.4;
  const baseD = rows * spacing + 0.4;

  return (
    <Center position={[1, 0.5, 0]}>
      <group rotation={[THREE.MathUtils.degToRad(20), THREE.MathUtils.degToRad(30), THREE.MathUtils.degToRad(-10)]}>
        <BasePlate width={baseW} depth={baseD} thickness={0.3} />
        {KEYS.map((k, i) => (
          <Keycap
            key={i}
            icon={k.icon}
            color="#959494ff"
            label={k.label} // Pass label
            desc={k.desc}   // Pass desc
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
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Canvas
        transparent
        shadows
        dpr={[1, 2]}
        camera={{ position: [7, 5, 7], fov: 25 }}
        gl={{ outputColorSpace: THREE.SRGBColorSpace }}
      >
        <CameraRig target={new THREE.Vector3(0, -0.5, 0)} />
        <directionalLight position={[10, 12, 5]} intensity={2} color="#fffdfa" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#d0e0ff" />
        <ambientLight intensity={0.5} />
        <Environment preset="city" environmentIntensity={0.5} />

        <Suspense fallback={null}>
          <Scene setHoveredTech={setHoveredTech} />
        </Suspense>
      </Canvas>
    </div>
  );
}