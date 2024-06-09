"use client";
import { useCallback, useEffect, useState } from "react";
import Model, { IExerciseData, IMuscleStats } from "react-body-highlighter";
import mydata from "../data.json";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MuscleModels() {
	const data: any[] = mydata;

	// Specify types explicitly
	const [results, setResult] = useState<string[]>([]);
	const [muscle, setMuscle] = useState<string>("");

	const handleClick = useCallback(
		({ muscle, data }: IMuscleStats) => {
			const { exercises, frequency } = data;
			console.log(data);
			console.log(`You clicked the ${muscle}!`);
			setMuscle(muscle);
			setResult(exercises); // assuming exercises is a string[]
		},
		[data]
	);

	return (
		<>
			{" "}
			<Alert className="w-[80vw] ml-[10vw] bg-neutral-800 text-white border-neutral-700">
				<AlertTitle>Guess What!</AlertTitle>
				<AlertDescription>
					You can learn more by clicking on a muscle!{" "}
				</AlertDescription>
			</Alert>
			<div className="flex justify-center items-center min-h-screen">
				<div className="flex flex-row items-center">
					<Model
						data={data}
						style={{ width: "30vw", padding: "3rem" }}
						onClick={handleClick}
						highlightedColors={["rgb(255, 255, 255)", "rgb(255, 255, 255)"]}
						bodyColor="rgb(255, 255, 255)"
					/>
					<Model
						type="posterior"
						data={data}
						style={{ width: "30vw", padding: "3rem" }}
						onClick={handleClick}
						highlightedColors={["rgb(255, 255, 255)", "rgb(255, 255, 255)"]}
						bodyColor="rgb(255, 255, 255)"
					/>
				</div>
				<motion.div
					className="flex flex-col items-center h-[90vh] overflow-auto w-[25vw] bg-neutral-800 rounded-xl"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{results.length > 0 ? (
						<>
							<h1 className="text-white text-3xl my-2 pb-4 border-b-2 border-neutral-400 w-full text-center mt-6">
								{muscle}
							</h1>
							{results.map((result, i) => (
								<h2
									className="text-xl w-full px-8 my-2 text-neutral-300"
									key={i}
								>
									{result}
								</h2>
							))}
						</>
					) : (
						<p className="text-xl my-8 text-neutral-200">Nothing was found</p>
					)}
				</motion.div>
			</div>
		</>
	);
}
