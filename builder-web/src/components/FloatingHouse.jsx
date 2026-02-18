import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- 💧 คอมโพเนนต์น้ำแบบ Shader สวยงาม ---
const BeautifulWater = () => {
    const ref = useRef();

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.uniforms.time.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh position={[0, -0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[24, 24, 128, 128]} />
            <shaderMaterial
                ref={ref}
                transparent
                uniforms={{
                    time: { value: 0 },
                    color: { value: new THREE.Color('#006d77') },
                }}
                vertexShader={`
          uniform float time;
          varying float vWave;
          varying vec2 vUv;

void main() {
    vUv = uv;
            vec3 pos = position;

            // คลื่นหลัก
            float wave =
        sin(pos.x * 1.5 + time * 1.2) * 0.07 +
        cos(pos.y * 2.0 + time * 1.5) * 0.06;

            // เอฟเฟกต์น้ำกระ (ripples)
            float dist = length(pos.xy);
            float ripple1 = sin(dist * 4.0 - time * 2.0) * 0.03 * (1.0 - dist / 12.0);
            float ripple2 = sin(dist * 6.0 - time * 2.5) * 0.02 * (1.0 - dist / 12.0);
            float ripple3 = cos(dist * 8.0 - time * 3.0) * 0.015 * (1.0 - dist / 12.0);

    pos.z += wave + ripple1 + ripple2 + ripple3;
    vWave = wave + ripple1 + ripple2 + ripple3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`}
                fragmentShader={`
          uniform vec3 color;
          varying float vWave;
          varying vec2 vUv;

void main() {
            // Fresnel effect สำหรับแสงสะท้อน
            float fresnel = pow(1.0 - abs(vWave), 3.0);

            // สีน้ำที่เปลี่ยนตามคลื่น
            vec3 finalColor = color + vWave * 0.4 + fresnel * 0.25;

            // เพิ่มความสว่างตรงขอบ
            float edge = smoothstep(0.0, 0.3, length(vUv - 0.5));
    finalColor += edge * 0.1;

    gl_FragColor = vec4(finalColor, 0.8);
}
`}
            />
        </mesh>
    );
};

// --- 🏡 คอมโพเนนต์บ้านลอยน้ำโมเดิร์นพรีเมียม ---
const FloatingHouse = ({ position = [0, 0, 0], isDark }) => {
    const groupRef = useRef();

    return (
        <group ref={groupRef} position={position} scale={[0.8, 0.8, 0.8]}>
            {/* === ระเบียงและแพ === */}
            {/* ระเบียงไม้ขนาดใหญ่ */}
            <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
                <boxGeometry args={[9, 0.15, 7]} />
                <meshStandardMaterial
                    color="#C9A876"
                    roughness={0.85}
                    metalness={0.05}
                />
            </mesh>

            {/* ลายไม้ระแนงบนระเบียง */}
            {Array.from({ length: 14 }).map((_, i) => (
                <mesh key={`plank - ${i} `} position={[0, -0.07, -3.3 + i * 0.5]} receiveShadow>
                    <boxGeometry args={[9, 0.02, 0.12]} />
                    <meshStandardMaterial
                        color="#B8956A"
                        roughness={0.9}
                    />
                </mesh>
            ))}

            {/* ฐานแพลอยน้ำ - พอดีกับบ้าน */}
            <mesh position={[0, -0.28, 0]} receiveShadow>
                <boxGeometry args={[5.5, 0.15, 5.5]} />
                <meshStandardMaterial
                    color="#2C3E50"
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            {/* พื้นผิวน้ำแบบ Shader แอนิเมชั่น */}
            <BeautifulWater />

            {/* === โครงสร้างบ้านหลัก === */}
            <group position={[1, 0.5, -0.5]}>

                {/* === พื้นบ้าน === */}
                <mesh position={[0, -0.5, 0]} receiveShadow>
                    <boxGeometry args={[4.5, 0.1, 4.5]} />
                    <meshStandardMaterial
                        color="#78909C"
                        roughness={0.7}
                        metalness={0.1}
                    />
                </mesh>

                {/* === ผนังบ้าน === */}
                {/* ผนังด้านหลัง */}
                <mesh position={[0, 0.525, -2.2]} castShadow>
                    <boxGeometry args={[4.5, 1.85, 0.15]} />
                    <meshStandardMaterial
                        color="#FAFAFA"
                        roughness={0.8}
                        metalness={0.1}
                    />
                </mesh>

                {/* ผนังด้านซ้าย - เจาะรูตรงกรอบสีดำพอดี */}
                {/* แถบบน */}
                <mesh position={[-2.2, 1.105, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[4.4, 0.47, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* แถบล่าง (จมพื้นเล็กน้อยเพื่อไม่ให้ลอย) */}
                <mesh position={[-2.2, -0.13, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[4.4, 0.74, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* เสาหลังสุด (ยืดลงพื้น) */}
                <mesh position={[-2.2, 0.3025, -1.775]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[0.85, 1.605, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* เสาระหว่างบาน 1-2 (ยืดลงพื้น) */}
                <mesh position={[-2.2, 0.3025, -0.7]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[0.7, 1.605, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* เสาระหว่างบาน 2-3 (ยืดลงพื้น) */}
                <mesh position={[-2.2, 0.3025, 0.7]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[0.7, 1.605, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* เสาหน้าสุด (ยืดลงพื้น) */}
                <mesh position={[-2.2, 0.3025, 1.775]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[0.85, 1.605, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>

                {/* ผนังด้านขวา (เปลี่ยนเป็นกระจกฝ้าเต็มบาน) */}
                <mesh position={[2.2, 0.475, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[4.4, 1.95, 0.05]} />
                    <meshStandardMaterial
                        color="#FFFFFF"
                        emissive={isDark ? "#FF9800" : "#000000"}
                        emissiveIntensity={isDark ? 0.2 : 0}
                        transparent
                        opacity={0.7}
                        roughness={0.2}
                    />
                </mesh>

                {/* ผนังด้านขวาติดมู่ลี่ */}
                <mesh position={[2.2, 0.525, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <boxGeometry args={[4.4, 1.85, 0.15]} />
                    <meshStandardMaterial
                        color="#ECEFF1"
                        roughness={0.6}
                        metalness={0.1}
                    />
                </mesh>

                {/* === ผนังด้านหน้า (เจาะช่องประตูหน้าต่าง) === */}
                {/* แถบบน (เหนือกรอบหน้าต่าง) */}
                <mesh position={[0, 1.1875, 2.2]} castShadow>
                    <boxGeometry args={[4.5, 0.425, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>

                {/* แถบล่างซ้าย (ใต้หน้าต่างซ้าย) */}
                <mesh position={[-1.2, -0.3125, 2.2]} castShadow>
                    <boxGeometry args={[1.5, 0.425, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* แถบล่างขวา (ใต้หน้าต่างขวา) */}
                <mesh position={[1.2, -0.3125, 2.2]} castShadow>
                    <boxGeometry args={[1.5, 0.425, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>

                {/* เสาซ้ายสุด (ยืดลงพื้น) */}
                <mesh position={[-2.025, 0.3375, 2.2]} castShadow>
                    <boxGeometry args={[0.45, 1.675, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* เสากลางซ้าย (ข้างประตู) */}
                <mesh position={[-0.6, 0.3375, 2.2]} castShadow>
                    <boxGeometry args={[0.3, 1.675, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* เสากลางขวา (ข้างประตู) */}
                <mesh position={[0.6, 0.3375, 2.2]} castShadow>
                    <boxGeometry args={[0.3, 1.675, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* เสาขวาสุด (ยืดลงพื้น) */}
                <mesh position={[2.025, 0.3375, 2.2]} castShadow>
                    <boxGeometry args={[0.45, 1.675, 0.15]} />
                    <meshStandardMaterial color="#FAFAFA" roughness={0.8} metalness={0.1} />
                </mesh>


                {/* === กรอบหน้าต่าง - ด้านซ้าย === */}
                {[-1.4, 0, 1.4].map((z, i) => (
                    <group key={`left - window - ${i} `} position={[-2.23, 0.555, z]} rotation={[0, Math.PI / 2, 0]}>
                        {/* กรอบหลัก */}
                        <mesh>
                            <boxGeometry args={[0.7, 1.1, 0.06]} />
                            <meshStandardMaterial color="#D0D0D0" roughness={0.4} metalness={0.2} />
                        </mesh>
                        {/* กระจกขุ่นเต็มกรอบ */}
                        <mesh position={[0, 0, 0.01]}>
                            <boxGeometry args={[0.68, 1.08, 0.03]} />
                            <meshStandardMaterial
                                color={isDark ? "#FFD54F" : "#E8E8E8"}
                                emissive={isDark ? "#FF9800" : "#000000"}
                                emissiveIntensity={isDark ? 0.35 : 0}
                                transparent
                                opacity={0.85}
                                roughness={0.9}
                            />
                        </mesh>

                    </group>
                ))}

                {/* === ประตูไม้โมเดิร์น === */}
                <group position={[0, 0.3, 2.23]}>
                    {/* วงกบประตู */}
                    <mesh position={[-0.475, 0, 0]}>
                        <boxGeometry args={[0.05, 1.9, 0.05]} />
                        <meshStandardMaterial color="#212121" roughness={0.8} />
                    </mesh>
                    <mesh position={[0.475, 0, 0]}>
                        <boxGeometry args={[0.05, 1.9, 0.05]} />
                        <meshStandardMaterial color="#212121" roughness={0.8} />
                    </mesh>
                    <mesh position={[0, 0.925, 0]}>
                        <boxGeometry args={[1.0, 0.05, 0.05]} />
                        <meshStandardMaterial color="#212121" roughness={0.8} />
                    </mesh>

                    {/* บานประตูไม้จริง */}
                    <mesh position={[0, 0, 0]} castShadow>
                        <boxGeometry args={[0.9, 1.8, 0.06]} />
                        <meshStandardMaterial
                            color="#8D6E63"
                            roughness={0.6}
                            metalness={0.1}
                        />
                    </mesh>

                    {/* ลวดลายร่องแนวตั้ง (เซาะร่อง) */}
                    <mesh position={[-0.2, 0, 0.031]}>
                        <boxGeometry args={[0.02, 1.8, 0.01]} />
                        <meshStandardMaterial color="#5D4037" roughness={0.9} />
                    </mesh>

                    {/* ช่องกระจกยาว (แนวตั้ง) ให้แสงเข้าเล็กน้อย */}
                    <mesh position={[0.2, 0, 0]}>
                        <boxGeometry args={[0.15, 1.6, 0.07]} />
                        <meshPhysicalMaterial
                            color="#E3F2FD"
                            transmission={0} /* ปิด transmission เพื่อแก้ปัญหาจอดำ */
                            transparent
                            opacity={0.7}
                            roughness={0.2}
                            emissive={isDark ? "#FFA726" : "#000000"}
                            emissiveIntensity={isDark ? 0.5 : 0}
                        />
                    </mesh>

                    {/* มือจับประตูสแตนเลส (ทรงแท่งยาว Modern) */}
                    <group position={[0.35, 0, 0.05]}>
                        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
                            <meshStandardMaterial
                                color="#E0E0E0"
                                roughness={0.2}
                                metalness={0.9}
                            />
                        </mesh>
                        <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.01, 0.01, 0.04, 8]} />
                            <meshStandardMaterial color="#BDBDBD" metalness={0.8} />
                        </mesh>
                        <mesh position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.01, 0.01, 0.04, 8]} />
                            <meshStandardMaterial color="#BDBDBD" metalness={0.8} />
                        </mesh>
                    </group>
                </group>

                {/* === มู่ลี่สีดำ - ด้านขวา === */}
                <group position={[2.3, 0.425, 0]}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <mesh key={`louver - ${i} `} position={[0, 0, -1.8 + i * 0.32]} rotation={[0, Math.PI / 2, 0]}>
                            <boxGeometry args={[0.08, 1.5, 0.05]} />
                            <meshStandardMaterial
                                color="#e6dbdbff"
                                roughness={0.3}
                                metalness={0.6}
                            />
                        </mesh>
                    ))}
                </group>



                {/* === หลังคา === */}
                <mesh position={[0.0, 1.57, 0]} castShadow>
                    <boxGeometry args={[5.2, 0.12, 5.2]} />
                    <meshStandardMaterial
                        color="#546E7A"
                        roughness={0.5}
                        metalness={0.2}
                    />
                </mesh>

                {/* ชายคาด้านหน้า */}
                <mesh position={[0.0, 1.5, 2.6]} castShadow>
                    <boxGeometry args={[5.2, 0.08, 0.8]} />
                    <meshStandardMaterial
                        color="#455A64"
                        roughness={0.5}
                        metalness={0.2}
                    />
                </mesh>

                {/* ไฟภายใน */}
                {isDark && (
                    <>
                        <pointLight position={[-1, 0.5, 0]} intensity={2.8} distance={5} color="#FFA726" />
                        <pointLight position={[1, 0.5, 0]} intensity={2.8} distance={5} color="#FFB74D" />
                        <pointLight position={[0, 0.5, 0.8]} intensity={2.5} distance={4} color="#FFCC80" />
                    </>
                )}
            </group>

            {/* === เฟอร์นิเจอร์ภายนอก === */}
            <group position={[-3, 0, 2]}>
                {/* โต๊ะกลางสมัยใหม่ */}
                <group position={[0, 0.25, 0]}>
                    <mesh>
                        <boxGeometry args={[0.9, 0.05, 0.9]} />
                        <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.5} />
                    </mesh>
                    {[[-0.4, -0.2, -0.4], [0.4, -0.2, -0.4], [-0.4, -0.2, 0.4], [0.4, -0.2, 0.4]].map((pos, i) => (
                        <mesh key={`table - leg - ${i} `} position={pos}>
                            <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
                            <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.7} />
                        </mesh>
                    ))}
                    {/* จุดเน้นสีส้ม */}
                    <mesh position={[0, 0.03, 0]}>
                        <boxGeometry args={[0.3, 0.05, 0.2]} />
                        <meshStandardMaterial
                            color="#FF6F00"
                            emissive="#FF6F00"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                </group>

                {/* เก้าอี้สมัยใหม่ */}
                {[[-1, 0, 0], [1, 0, 0]].map((pos, i) => (
                    <group key={`chair - ${i} `} position={pos}>
                        <mesh position={[0, 0.15, 0]}>
                            <boxGeometry args={[0.5, 0.08, 0.5]} />
                            <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
                        </mesh>
                        <mesh position={[0, 0.35, -0.2]} rotation={[0.2, 0, 0]}>
                            <boxGeometry args={[0.5, 0.45, 0.08]} />
                            <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
                        </mesh>
                        {[[-0.2, 0, -0.2], [0.2, 0, -0.2], [-0.2, 0, 0.2], [0.2, 0, 0.2]].map((legPos, j) => (
                            <mesh key={`leg - ${j} `} position={legPos}>
                                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                                <meshStandardMaterial color="#2C2C2C" roughness={0.3} metalness={0.6} />
                            </mesh>
                        ))}
                    </group>
                ))}
            </group>

            {/* === ต้นไม้ในกระถาง === */}
            {[[-3.5, 0, -1.8], [-3.5, 0, -0.6], [-3.5, 0, 0.6]].map((pos, i) => (
                <group key={`plant - ${i} `} position={pos}>
                    <mesh position={[0, 0.15, 0]}>
                        <cylinderGeometry args={[0.16, 0.13, 0.3, 8]} />
                        <meshStandardMaterial color="#263238" roughness={0.7} />
                    </mesh>
                    <mesh position={[0, 0.42, 0]}>
                        <sphereGeometry args={[0.22, 10, 10]} />
                        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
                    </mesh>
                    {Array.from({ length: 4 }).map((_, j) => (
                        <mesh
                            key={`leaf - ${j} `}
                            position={[
                                Math.cos(j * 1.5) * 0.16,
                                0.42 + Math.sin(j) * 0.12,
                                Math.sin(j * 1.5) * 0.16
                            ]}
                        >
                            <sphereGeometry args={[0.13, 6, 6]} />
                            <meshStandardMaterial color="#388E3C" roughness={0.8} />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* === บันไดลงน้ำ === */}
            <group position={[0, -0.15, 3.4]}>
                {[-0.2, 0.2].map((x, i) => (
                    <mesh key={`rail - ${i} `} position={[x, -0.45, 0]}>
                        <cylinderGeometry args={[0.03, 0.03, 1.1, 8]} />
                        <meshStandardMaterial
                            color="#B0BEC5"
                            roughness={0.4}
                            metalness={0.6}
                        />
                    </mesh>
                ))}
                {[0, -0.3, -0.6].map((y, i) => (
                    <mesh key={`step - ${i} `} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
                        <meshStandardMaterial
                            color="#B0BEC5"
                            roughness={0.4}
                            metalness={0.6}
                        />
                    </mesh>
                ))}
            </group>

        </group>
    );
};

export default FloatingHouse;
