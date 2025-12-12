import { FC, useMemo, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import { Stage, useTexture } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

import { Keyboard } from "@/components/Keyboard";

import { KEYCAP_TEXTURES } from ".";

gsap.registerPlugin(useGSAP);

type SceneProps = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
};

export const Scene: FC<SceneProps> = ({
  selectedTextureId,
  onAnimationComplete,
}) => {
  const keyboardRef = useRef<THREE.Group>(null);
  const texturePaths = KEYCAP_TEXTURES.map((texture) => texture.path);
  const textures = useTexture(texturePaths);

  const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId);

  useGSAP(() => {
    if (!keyboardRef.current || selectedTextureId === currentTextureId) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const keyboard = keyboardRef.current;

      if (!keyboard) return;

      const tl = gsap.timeline({
        onComplete: () => {
          onAnimationComplete();
        },
      });
      tl.to(keyboard.position, {
        y: 0.3,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          setCurrentTextureId(selectedTextureId);
        },
      });
      tl.to(keyboard.position, {
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      setCurrentTextureId(selectedTextureId);
      onAnimationComplete();
    });
  }, [selectedTextureId, currentTextureId]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {};

    KEYCAP_TEXTURES.forEach((textureConfig, index) => {
      const texture = Array.isArray(textures)
        ? textures[index]
        : textures[textureConfig.id];

      if (texture) {
        const clonedTexture = texture.clone();
        clonedTexture.flipY = false;
        clonedTexture.colorSpace = THREE.SRGBColorSpace;
        clonedTexture.needsUpdate = true;

        materialMap[textureConfig.id] = new THREE.MeshStandardMaterial({
          map: clonedTexture,
          roughness: 0.7,
        });
      }
    });

    return materialMap;
  }, [textures]);

  const currentKnobColor = KEYCAP_TEXTURES.find(
    (texture) => texture.id === selectedTextureId,
  )?.knobColor;

  return (
    <Stage environment={"apartment"} intensity={0.09} shadows="contact">
      <group ref={keyboardRef}>
        <Keyboard
          keycapMaterial={materials[currentTextureId]}
          knobColor={currentKnobColor}
        />
      </group>
    </Stage>
  );
};
