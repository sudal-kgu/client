const Terrain = () => (
    <group>
        <mesh position={[0, -4, 0]} receiveShadow castShadow>
            <cylinderGeometry args={[11, 14, 10, 24]} />
            <meshLambertMaterial color="#8B7355" />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[11.5, 12.5, 1.2, 24]} />
            <meshLambertMaterial color="#d4b896" />
        </mesh>
        <mesh position={[0, 1.25, 0]} receiveShadow>
            <cylinderGeometry args={[10.5, 11, 0.5, 24]} />
            <meshLambertMaterial color="#5a7a35" />
        </mesh>
    </group>
);

export default Terrain;
