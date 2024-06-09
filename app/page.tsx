import Image from "next/image";
import MuscleModels from "./components/MuscleModels";
import { Calculators } from "./components/Calculators";

export default function Home() {
	return (
		<div className="bg-neutral-900 pt-8">
			<MuscleModels />
			<Calculators />
		</div>
	);
}
