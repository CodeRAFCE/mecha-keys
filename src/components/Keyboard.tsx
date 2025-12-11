"use client";

import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plate: THREE.Mesh;
    Knob: THREE.Mesh;
    PCB: THREE.Mesh;
    ["625u_Wire001"]: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube005_1: THREE.Mesh;
    Top_Case: THREE.Mesh;
    Weight: THREE.Mesh;
    Screen: THREE.Mesh;
    K_LCONTROL: THREE.Mesh;
    K_GRAVE: THREE.Mesh;
    K_A: THREE.Mesh;
    K_Q: THREE.Mesh;
    K_ESC: THREE.Mesh;
    K_SPACE: THREE.Mesh;
    K_Z: THREE.Mesh;
    K_ARROWLEFT: THREE.Mesh;
    K_TAB: THREE.Mesh;
    K_ENTER: THREE.Mesh;
    K_BACKSPACE: THREE.Mesh;
    K_CAPS: THREE.Mesh;
    K_LSHIFT: THREE.Mesh;
    K_RSHIFT: THREE.Mesh;
    K_ARROWDOWN: THREE.Mesh;
    K_ARROWRIGHT: THREE.Mesh;
    K_LALT: THREE.Mesh;
    K_LWIN: THREE.Mesh;
    K_RALT: THREE.Mesh;
    K_FN: THREE.Mesh;
    K_1: THREE.Mesh;
    K_2: THREE.Mesh;
    K_3: THREE.Mesh;
    K_4: THREE.Mesh;
    K_5: THREE.Mesh;
    K_6: THREE.Mesh;
    K_7: THREE.Mesh;
    K_8: THREE.Mesh;
    K_9: THREE.Mesh;
    K_0: THREE.Mesh;
    K_DASH: THREE.Mesh;
    K_EQUAL: THREE.Mesh;
    K_DEL: THREE.Mesh;
    K_S: THREE.Mesh;
    K_D: THREE.Mesh;
    K_F: THREE.Mesh;
    K_G: THREE.Mesh;
    K_H: THREE.Mesh;
    K_J: THREE.Mesh;
    K_K: THREE.Mesh;
    K_L: THREE.Mesh;
    K_SEMICOLON: THREE.Mesh;
    K_QUOTE: THREE.Mesh;
    K_PAGEDOWN: THREE.Mesh;
    K_W: THREE.Mesh;
    K_E: THREE.Mesh;
    K_R: THREE.Mesh;
    K_T: THREE.Mesh;
    K_Y: THREE.Mesh;
    K_U: THREE.Mesh;
    K_I: THREE.Mesh;
    K_O: THREE.Mesh;
    K_P: THREE.Mesh;
    K_LSQUAREBRACKET: THREE.Mesh;
    K_RSQUAREBRACKET: THREE.Mesh;
    K_PAGEUP: THREE.Mesh;
    K_F1: THREE.Mesh;
    K_F2: THREE.Mesh;
    K_F3: THREE.Mesh;
    K_F4: THREE.Mesh;
    K_F5: THREE.Mesh;
    K_F6: THREE.Mesh;
    K_F7: THREE.Mesh;
    K_F8: THREE.Mesh;
    K_F9: THREE.Mesh;
    K_F10: THREE.Mesh;
    K_F11: THREE.Mesh;
    K_F12: THREE.Mesh;
    K_X: THREE.Mesh;
    K_C: THREE.Mesh;
    K_V: THREE.Mesh;
    K_B: THREE.Mesh;
    K_N: THREE.Mesh;
    K_M: THREE.Mesh;
    K_COMMA: THREE.Mesh;
    K_PERIOD: THREE.Mesh;
    K_SLASH: THREE.Mesh;
    K_ARROWUP: THREE.Mesh;
    K_END: THREE.Mesh;
    K_BACKSLASH: THREE.Mesh;
    Switch_Heavy002: THREE.InstancedMesh;
    Switch_Heavy002_1: THREE.InstancedMesh;
    Switch_Heavy002_2: THREE.InstancedMesh;
    Switch_Heavy002_3: THREE.InstancedMesh;
    ["2U_Wires"]: THREE.InstancedMesh;
    Stab_Housing_Instances: THREE.InstancedMesh;
  };
  materials: {
    PC: THREE.MeshStandardMaterial;
    Knob: THREE.MeshStandardMaterial;
    PCB_Black: THREE.MeshStandardMaterial;
    Gold: THREE.MeshStandardMaterial;
    Bottom_Case: THREE.MeshStandardMaterial;
    Feet: THREE.MeshStandardMaterial;
    Top_Case: THREE.MeshStandardMaterial;
    Weight: THREE.MeshStandardMaterial;
    Screen: THREE.MeshPhysicalMaterial;
    Keycaps: THREE.MeshPhysicalMaterial;
    Switch_Bottom_Housing: THREE.MeshStandardMaterial;
    Stem: THREE.MeshStandardMaterial;
    Switch_Top_Housing: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};

export interface KeyboardRefs {
  // Main keyboard structure
  plate: React.RefObject<THREE.Mesh | null>;
  topCase: React.RefObject<THREE.Mesh | null>;
  weight: React.RefObject<THREE.Mesh | null>;
  screen: React.RefObject<THREE.Mesh | null>;
  knob: React.RefObject<THREE.Mesh | null>;

  // Switch groups for wave animation
  switches: {
    functionRow: React.RefObject<THREE.Group | null>;
    numberRow: React.RefObject<THREE.Group | null>;
    topRow: React.RefObject<THREE.Group | null>;
    homeRow: React.RefObject<THREE.Group | null>;
    bottomRow: React.RefObject<THREE.Group | null>;
    modifiers: React.RefObject<THREE.Group | null>;
    arrows: React.RefObject<THREE.Group | null>;
  };

  // Keycap groups for easy animation targeting
  keycaps: {
    functionRow: React.RefObject<THREE.Group | null>;
    numberRow: React.RefObject<THREE.Group | null>;
    topRow: React.RefObject<THREE.Group | null>;
    homeRow: React.RefObject<THREE.Group | null>;
    bottomRow: React.RefObject<THREE.Group | null>;
    modifiers: React.RefObject<THREE.Group | null>;
    arrows: React.RefObject<THREE.Group | null>;
  };

  // Individual keycaps for detailed animations
  keys: React.MutableRefObject<Record<string, THREE.Mesh>>;

  // Main container
  container: React.RefObject<THREE.Group | null>;
}

interface KeyboardProps extends React.ComponentProps<"group"> {
  keycapMaterial?: THREE.Material;
  knobColor?: string;
}

export const Keyboard = forwardRef<KeyboardRefs, KeyboardProps>(
  ({ ...props }, ref) => {
    const { nodes, materials } = useGLTF(
      "/keyboard.gltf",
    ) as unknown as GLTFResult;

    // Main structure refs
    const containerRef = useRef<THREE.Group>(null);
    const plateRef = useRef<THREE.Mesh>(null);
    const topCaseRef = useRef<THREE.Mesh>(null);
    const weightRef = useRef<THREE.Mesh>(null);
    const screenRef = useRef<THREE.Mesh>(null);
    const knobRef = useRef<THREE.Mesh>(null);

    // Switch group refs
    const switchFunctionRowRef = useRef<THREE.Group>(null);
    const switchNumberRowRef = useRef<THREE.Group>(null);
    const switchTopRowRef = useRef<THREE.Group>(null);
    const switchHomeRowRef = useRef<THREE.Group>(null);
    const switchBottomRowRef = useRef<THREE.Group>(null);
    const switchModifiersRef = useRef<THREE.Group>(null);
    const switchArrowsRef = useRef<THREE.Group>(null);

    // Keycap group refs
    const functionRowRef = useRef<THREE.Group>(null);
    const numberRowRef = useRef<THREE.Group>(null);
    const topRowRef = useRef<THREE.Group>(null);
    const homeRowRef = useRef<THREE.Group>(null);
    const bottomRowRef = useRef<THREE.Group>(null);
    const modifiersRef = useRef<THREE.Group>(null);
    const arrowsRef = useRef<THREE.Group>(null);

    // Individual key refs
    const keys = useRef<Record<string, THREE.Mesh>>({});

    // Expose refs through imperative handle
    useImperativeHandle(ref, () => ({
      plate: plateRef,
      topCase: topCaseRef,
      weight: weightRef,
      screen: screenRef,
      knob: knobRef,
      switches: {
        functionRow: switchFunctionRowRef,
        numberRow: switchNumberRowRef,
        topRow: switchTopRowRef,
        homeRow: switchHomeRowRef,
        bottomRow: switchBottomRowRef,
        modifiers: switchModifiersRef,
        arrows: switchArrowsRef,
      },
      keycaps: {
        functionRow: functionRowRef,
        numberRow: numberRowRef,
        topRow: topRowRef,
        homeRow: homeRowRef,
        bottomRow: bottomRowRef,
        modifiers: modifiersRef,
        arrows: arrowsRef,
      },
      keys: keys,
      container: containerRef,
    }));

    const keycapTexture = useTexture("/goodwell_uv.png");
    const clonedTexture = useMemo(() => {
      const t = keycapTexture.clone();
      t.flipY = false;
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }, [keycapTexture]);

    const knurlTexture = useTexture("/Knurl.jpg");
    const clonedKnurlTexture = useMemo(() => {
      const t = knurlTexture.clone();
      t.flipY = false;
      t.colorSpace = THREE.SRGBColorSpace;
      t.repeat.set(6, 6);
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      return t;
    }, [knurlTexture]);

    const screenTexture = useTexture("/screen_uv.png");
    const clonedScreenTexture = useMemo(() => {
      const t = screenTexture.clone();
      t.flipY = false;
      t.repeat.set(-1, -1);
      t.offset.set(1, 1);
      return t;
    }, [screenTexture]);

    const keycapMat = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      map: clonedTexture,
    });

    const knobMat = new THREE.MeshStandardMaterial({
      color: "#e24818",
      roughness: 0.4,
      metalness: 1,
      bumpMap: clonedKnurlTexture,
      bumpScale: 0.8,
    });

    const plateMat = new THREE.MeshStandardMaterial({
      color: "#888888",
      roughness: 0.4,
    });

    const bottomcaseMat = new THREE.MeshStandardMaterial({
      color: "#1e548a",
      roughness: 0.4,
    });

    const topcaseMat = new THREE.MeshStandardMaterial({
      color: "#dddddd",
      roughness: 0.7,
    });

    const screenMat = new THREE.MeshStandardMaterial({
      roughness: 0.4,
      map: clonedScreenTexture,
    });

    const feetMat = new THREE.MeshStandardMaterial({
      color: "#333333",
      roughness: 0.6,
    });

    const switchMat = new THREE.MeshStandardMaterial({
      color: "#cccccc",
      roughness: 0.4,
    });

    const switchStemMat = new THREE.MeshStandardMaterial({
      color: "#bb2222",
      roughness: 0.4,
    });

    const switchContactsMat = new THREE.MeshStandardMaterial({
      color: "#ffcf5f",
      roughness: 0.1,
      metalness: 1,
    });

    return (
      <group {...props} dispose={null} ref={containerRef}>
        <group position={[0.02, 0, 0]}>
          <mesh
            ref={plateRef}
            castShadow
            receiveShadow
            geometry={nodes.Plate.geometry}
            material={plateMat}
            position={[-0.022, -0.006, -0.057]}
          />
          <mesh
            ref={knobRef}
            castShadow
            receiveShadow
            geometry={nodes.Knob.geometry}
            material={knobMat}
            position={[0.121, 0.004, -0.106]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PCB.geometry}
            material={plateMat}
            position={[-0.022, -0.009, -0.057]}
          />

          {/* Switches - organized by rows with individual meshes for animation */}
          {/* Function Row Switches */}
          <group ref={switchFunctionRowRef}>
            {[
              -0.165, -0.145, -0.126, -0.107, -0.088, -0.069, -0.05, -0.031,
              -0.012, 0.007, 0.026, 0.045, 0.064,
            ].map((x, i) => (
              <group key={`switch-f-${i}`} position={[x, -0.002, -0.106]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Number Row Switches */}
          <group ref={switchNumberRowRef}>
            {[
              -0.165, -0.146, -0.127, -0.108, -0.089, -0.07, -0.051, -0.032,
              -0.013, 0.006, 0.025, 0.044, 0.063, 0.092, 0.121,
            ].map((x, i) => (
              <group key={`switch-n-${i}`} position={[x, -0.002, -0.087]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Top Row Switches */}
          <group ref={switchTopRowRef}>
            {[
              -0.16, -0.136, -0.117, -0.098, -0.079, -0.06, -0.041, -0.022,
              -0.003, 0.016, 0.035, 0.054, 0.073, 0.097, 0.121,
            ].map((x, i) => (
              <group key={`switch-t-${i}`} position={[x, -0.002, -0.068]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Home Row Switches */}
          <group ref={switchHomeRowRef}>
            {[
              -0.158, -0.132, -0.113, -0.094, -0.075, -0.056, -0.037, -0.018,
              0.001, 0.02, 0.039, 0.058, 0.09, 0.121,
            ].map((x, i) => (
              <group key={`switch-h-${i}`} position={[x, -0.002, -0.049]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Bottom Row Switches */}
          <group ref={switchBottomRowRef}>
            {[
              -0.153, -0.122, -0.103, -0.084, -0.065, -0.046, -0.027, -0.008,
              0.011, 0.03, 0.049, 0.076, 0.121,
            ].map((x, i) => (
              <group key={`switch-b-${i}`} position={[x, 0.0, -0.03]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Modifier Switches */}
          <group ref={switchModifiersRef}>
            {[
              [-0.162, -0.011],
              [-0.139, -0.011],
              [-0.115, -0.011],
              [-0.043, -0.01], // Space key
              [0.028, -0.011],
              [0.052, -0.011],
            ].map(([x, z], i) => (
              <group key={`switch-m-${i}`} position={[x, -0.002, z]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          {/* Arrow Switches */}
          <group ref={switchArrowsRef}>
            {[
              [0.102, -0.03],
              [0.083, -0.011],
              [0.102, -0.011],
              [0.121, -0.011],
            ].map(([x, z], i) => (
              <group key={`switch-a-${i}`} position={[x, -0.002, z]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002.geometry}
                  material={switchMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_1.geometry}
                  material={switchContactsMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_2.geometry}
                  material={switchStemMat}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Switch_Heavy002_3.geometry}
                  material={switchMat}
                />
              </group>
            ))}
          </group>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes["625u_Wire001"].geometry}
            material={materials.Gold}
            position={[-0.043, -0.001, -0.014]}
            rotation={[Math.PI, 0, Math.PI]}
          />
          <group position={[-0.022, -0.014, -0.057]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube005.geometry}
              material={bottomcaseMat}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube005_1.geometry}
              material={feetMat}
            />
          </group>
          <mesh
            ref={topCaseRef}
            castShadow
            receiveShadow
            geometry={nodes.Top_Case.geometry}
            material={topcaseMat}
            position={[-0.022, -0.014, -0.057]}
          />
          <mesh
            ref={weightRef}
            castShadow
            receiveShadow
            geometry={nodes.Weight.geometry}
            material={keycapMat}
            position={[-0.022, -0.014, -0.057]}
          />
          <mesh
            ref={screenRef}
            castShadow
            receiveShadow
            geometry={nodes.Screen.geometry}
            material={screenMat}
            position={[0.092, 0.001, -0.106]}
            scale={-1}
          />

          {/* Function Row */}
          <group ref={functionRowRef}>
            <mesh
              ref={(el) => {
                if (el) keys.current.esc = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_ESC.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f1 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F1.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f2 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F2.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f3 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F3.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f4 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F4.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f5 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F5.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f6 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F6.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f7 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F7.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f8 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F8.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f9 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F9.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f10 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F10.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f11 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F11.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f12 = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F12.geometry}
              material={keycapMat}
              position={[-0.051, 0.01, -0.106]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.del = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_DEL.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
          </group>

          {/* Number Row */}
          <group ref={numberRowRef}>
            <mesh
              ref={(el) => {
                if (el) keys.current.grave = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_GRAVE.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.one = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_1.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.two = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_2.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.three = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_3.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.four = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_4.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.five = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_5.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.six = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_6.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.seven = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_7.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.eight = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_8.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.nine = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_9.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.zero = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_0.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.dash = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_DASH.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.equal = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_EQUAL.geometry}
              material={keycapMat}
              position={[-0.165, 0.01, -0.087]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.backspace = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_BACKSPACE.geometry}
              material={keycapMat}
              position={[0.092, 0, -0.087]}
            />
          </group>

          {/* Top Row (QWERTY) */}
          <group ref={topRowRef}>
            <mesh
              ref={(el) => {
                if (el) keys.current.tab = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_TAB.geometry}
              material={keycapMat}
              position={[-0.16, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.q = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_Q.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.w = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_W.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.e = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_E.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.r = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_R.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.t = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_T.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.y = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_Y.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.u = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_U.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.i = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_I.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.o = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_O.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.p = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_P.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.lsquarebracket = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_LSQUAREBRACKET.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.rsquarebracket = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_RSQUAREBRACKET.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.backslash = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_BACKSLASH.geometry}
              material={keycapMat}
              position={[-0.16, 0.008, -0.068]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.pageup = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_PAGEUP.geometry}
              material={keycapMat}
              position={[-0.136, 0.008, -0.068]}
            />
          </group>

          {/* Home Row (ASDF) */}
          <group ref={homeRowRef}>
            <mesh
              ref={(el) => {
                if (el) keys.current.caps = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_CAPS.geometry}
              material={keycapMat}
              position={[-0.158, 0, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.a = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_A.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.s = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_S.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.d = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_D.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.f = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_F.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.g = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_G.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.h = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_H.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.j = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_J.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.k = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_K.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.l = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_L.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.semicolon = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_SEMICOLON.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.quote = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_QUOTE.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.enter = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_ENTER.geometry}
              material={keycapMat}
              position={[0.09, 0, -0.049]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.pagedown = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_PAGEDOWN.geometry}
              material={keycapMat}
              position={[-0.132, 0.007, -0.049]}
            />
          </group>

          {/* Bottom Row (ZXCV) */}
          <group ref={bottomRowRef}>
            <mesh
              ref={(el) => {
                if (el) keys.current.lshift = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_LSHIFT.geometry}
              material={keycapMat}
              position={[-0.153, 0, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.z = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_Z.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.x = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_X.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.c = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_C.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.v = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_V.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.b = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_B.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.n = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_N.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.m = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_M.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.comma = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_COMMA.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.period = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_PERIOD.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.slash = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_SLASH.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.rshift = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_RSHIFT.geometry}
              material={keycapMat}
              position={[0.076, 0, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.arrowup = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_ARROWUP.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.end = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_END.geometry}
              material={keycapMat}
              position={[-0.122, 0.008, -0.03]}
            />
          </group>

          {/* Modifiers */}
          <group ref={modifiersRef}>
            <mesh
              ref={(el) => {
                if (el) keys.current.lcontrol = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_LCONTROL.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.lwin = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_LWIN.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.lalt = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_LALT.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.space = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_SPACE.geometry}
              material={keycapMat}
              position={[-0.043, 0, -0.01]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.ralt = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_RALT.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.fn = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_FN.geometry}
              material={keycapMat}
              position={[-0.162, 0.008, -0.011]}
            />
          </group>

          {/* Arrow Keys */}
          <group ref={arrowsRef}>
            <mesh
              ref={(el) => {
                if (el) keys.current.arrowleft = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_ARROWLEFT.geometry}
              material={keycapMat}
              position={[0.083, 0.008, -0.011]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.arrowdown = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_ARROWDOWN.geometry}
              material={keycapMat}
              position={[0.083, 0.008, -0.011]}
            />
            <mesh
              ref={(el) => {
                if (el) keys.current.arrowright = el;
              }}
              castShadow
              receiveShadow
              geometry={nodes.K_ARROWRIGHT.geometry}
              material={keycapMat}
              position={[0.083, 0.008, -0.011]}
            />
          </group>

          <instancedMesh
            args={[nodes["2U_Wires"].geometry, materials.Gold, 3]}
            castShadow
            receiveShadow
            instanceMatrix={nodes["2U_Wires"].instanceMatrix}
            position={[0.092, 0.009, -0.086]}
          />
          <instancedMesh
            args={[nodes.Stab_Housing_Instances.geometry, materials.Stem, 8]}
            castShadow
            receiveShadow
            instanceMatrix={nodes.Stab_Housing_Instances.instanceMatrix}
            position={[0.08, -0.004, -0.085]}
          />
        </group>
      </group>
    );
  },
);

Keyboard.displayName = "Keyboard";

useGLTF.preload("/keyboard.gltf");
