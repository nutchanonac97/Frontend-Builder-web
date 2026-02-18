// --- 🏡 Modern Floating House Component ---
const FloatingHouse = ({ position = [0, 0, 0], isDark }) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        // Gentle bobbing motion on water
        groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.05;
        // Subtle rocking motion
        groupRef.current.rotation.z = Math.sin(time * 1.2) * 0.01;
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Modern floating platform - dark blue/gray */}
            <mesh position={[0, -0.25, 0]} receiveShadow castShadow>
                <boxGeometry args={[5.5, 0.2, 4.5]} />
                <meshStandardMaterial
                    color="#2C3E50"
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            {/* Platform edge/rim - modern aesthetic */}
            <mesh position={[0, -0.15, 0]}>
                <boxGeometry args={[5.7, 0.08, 4.7]} />
                <meshStandardMaterial
                    color="#34495E"
                    roughness={0.3}
                    metalness={0.4}
                />
            </mesh>

            {/* Water surface - reflective */}
            <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[3.5, 32]} />
                <meshPhysicalMaterial
                    color="#00ACC1"
                    transparent
                    opacity={0.5}
                    metalness={0.3}
                    roughness={0.05}
                    transmission={0.3}
                />
            </mesh>

            {/* Main house structure */}
            <group position={[0, 0.4, 0]}>
                {/* Modern glass walls - floor to ceiling */}
                <group position={[0, 0.65, 0]}>
                    {/* Front glass wall */}
                    <mesh position={[0, 0, 2.15]}>
                        <boxGeometry args={[4.8, 1.5, 0.05]} />
                        <meshPhysicalMaterial
                            color={isDark ? "#FFE082" : "#E3F2FD"}
                            emissive={isDark ? "#FF9800" : "#000000"}
                            emissiveIntensity={isDark ? 0.4 : 0}
                            transparent
                            opacity={0.4}
                            metalness={0.1}
                            roughness={0.05}
                            transmission={0.8}
                        />
                    </mesh>

                    {/* Back glass wall */}
                    <mesh position={[0, 0, -2.15]}>
                        <boxGeometry args={[4.8, 1.5, 0.05]} />
                        <meshPhysicalMaterial
                            color={isDark ? "#FFE082" : "#E3F2FD"}
                            emissive={isDark ? "#FF9800" : "#000000"}
                            emissiveIntensity={isDark ? 0.3 : 0}
                            transparent
                            opacity={0.4}
                            metalness={0.1}
                            roughness={0.05}
                            transmission={0.8}
                        />
                    </mesh>

                    {/* Left glass wall */}
                    <mesh position={[-2.4, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <boxGeometry args={[4.3, 1.5, 0.05]} />
                        <meshPhysicalMaterial
                            color={isDark ? "#FFE082" : "#E3F2FD"}
                            emissive={isDark ? "#FF9800" : "#000000"}
                            emissiveIntensity={isDark ? 0.3 : 0}
                            transparent
                            opacity={0.4}
                            metalness={0.1}
                            roughness={0.05}
                            transmission={0.8}
                        />
                    </mesh>

                    {/* Right glass wall */}
                    <mesh position={[2.4, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <boxGeometry args={[4.3, 1.5, 0.05]} />
                        <meshPhysicalMaterial
                            color={isDark ? "#FFE082" : "#E3F2FD"}
                            emissive={isDark ? "#FF9800" : "#000000"}
                            emissiveIntensity={isDark ? 0.3 : 0}
                            transparent
                            opacity={0.4}
                            metalness={0.1}
                            roughness={0.05}
                            transmission={0.8}
                        />
                    </mesh>
                </group>

                {/* Modern window frames - dark metal */}
                {[
                    [-2.35, 0.65, 0, Math.PI / 2], // Left
                    [2.35, 0.65, 0, Math.PI / 2],  // Right
                    [0, 0.65, -2.1, 0],            // Back
                    [0, 0.65, 2.1, 0],             // Front
                ].map((pos, i) => (
                    <mesh key={`frame-${i}`} position={[pos[0], pos[1], pos[2]]} rotation={[0, pos[3], 0]}>
                        <boxGeometry args={[0.08, 1.6, i < 2 ? 4.3 : 4.8]} />
                        <meshStandardMaterial
                            color="#1A1A1A"
                            roughness={0.3}
                            metalness={0.7}
                        />
                    </mesh>
                ))}

                {/* Modern flat roof - overhanging */}
                <mesh position={[0, 1.5, 0]} castShadow>
                    <boxGeometry args={[6, 0.15, 5]} />
                    <meshStandardMaterial
                        color="#263238"
                        roughness={0.4}
                        metalness={0.2}
                    />
                </mesh>

                {/* Roof overhang bottom - warm color */}
                <mesh position={[0, 1.43, 0]}>
                    <boxGeometry args={[5.9, 0.03, 4.9]} />
                    <meshStandardMaterial
                        color="#8D6E63"
                        roughness={0.6}
                        metalness={0.1}
                        emissive={isDark ? "#5D4037" : "#000000"}
                        emissiveIntensity={isDark ? 0.3 : 0}
                    />
                </mesh>

                {/* Floor - dark wood or concrete */}
                <mesh position={[0, -0.05, 0]} receiveShadow>
                    <boxGeometry args={[4.8, 0.1, 4.3]} />
                    <meshStandardMaterial
                        color="#5D4037"
                        roughness={0.7}
                        metalness={0.1}
                    />
                </mesh>

                {/* Extended deck/terrace */}
                <mesh position={[0, -0.05, 3.2]} receiveShadow castShadow>
                    <boxGeometry args={[4.8, 0.1, 1.7]} />
                    <meshStandardMaterial
                        color="#6D4C41"
                        roughness={0.75}
                        metalness={0.1}
                    />
                </mesh>

                {/* Deck railing - modern minimal */}
                {[-2.35, 2.35].map((x, i) => (
                    <group key={`railing-${i}`}>
                        <mesh position={[x, 0.4, 3.2]}>
                            <boxGeometry args={[0.05, 0.7, 1.7]} />
                            <meshStandardMaterial
                                color="#1A1A1A"
                                roughness={0.3}
                                metalness={0.7}
                            />
                        </mesh>
                    </group>
                ))}

                {/* Horizontal rail */}
                <mesh position={[0, 0.7, 3.2]}>
                    <boxGeometry args={[4.8, 0.05, 0.05]} />
                    <meshStandardMaterial
                        color="#1A1A1A"
                        roughness={0.3}
                        metalness={0.7}
                    />
                </mesh>

                {/* Interior warm glow lights */}
                {isDark && (
                    <>
                        <pointLight position={[-1.5, 0.5, 0]} intensity={2} distance={6} color="#FFA726" />
                        <pointLight position={[1.5, 0.5, 0]} intensity={2} distance={6} color="#FFA726" />
                        <pointLight position={[0, 0.5, -1]} intensity={1.5} distance={5} color="#FF9800" />
                        <pointLight position={[0, 0.5, 2.5]} intensity={1.8} distance={5} color="#FFB74D" />
                    </>
                )}

                {/* Minimalist support pillars (hidden but structural) */}
                {[
                    [-2, -0.6, -1.8],
                    [2, -0.6, -1.8],
                    [-2, -0.6, 1.8],
                    [2, -0.6, 1.8],
                ].map((pos, i) => (
                    <mesh key={`pillar-${i}`} position={pos} castShadow>
                        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
                        <meshStandardMaterial
                            color="#2C3E50"
                            roughness={0.4}
                            metalness={0.5}
                        />
                    </mesh>
                ))}
            </group>

            {/* Water ripples effect */}
            <mesh position={[0, -0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.5, 3.2, 32]} />
                <meshBasicMaterial
                    color="#00BCD4"
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </group>
    );
};

export default FloatingHouse;
