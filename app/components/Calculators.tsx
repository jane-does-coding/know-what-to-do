"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";

type Gender = "male" | "female";

// Calculation functions
const calculateBMI = (weight: number, height: number) =>
	(weight / (height * height)).toFixed(2);

const calculateBMR = (
	weight: number,
	height: number,
	age: number,
	gender: Gender
) => {
	return gender === "male"
		? (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age).toFixed(2)
		: (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age).toFixed(2);
};

const calculateBodyFatPercentage = (
	bmi: number,
	age: number,
	gender: Gender
) => {
	const factor1 = gender === "male" ? 1.2 : 1.07;
	const factor2 = gender === "male" ? 16.2 : 5.4;
	return (bmi * factor1 + 0.23 * age - factor2).toFixed(2);
};

const calculateLeanBodyMass = (weight: number, bodyFatPercentage: number) => {
	return (weight - (weight * bodyFatPercentage) / 100).toFixed(2);
};

export function Calculators() {
	const [bmiResult, setBmiResult] = useState<string | null>(null);
	const [bmrResult, setBmrResult] = useState<string | null>(null);
	const [bodyFatResult, setBodyFatResult] = useState<string | null>(null);
	const [leanBodyMassResult, setLeanBodyMassResult] = useState<string | null>(
		null
	);
	const [useMetric, setUseMetric] = useState<boolean>(true);
	const [gender, setGender] = useState<Gender>("male");

	const unitLabel = useMetric
		? { weight: "kg", height: "cm" }
		: { weight: "lbs", height: "ft/in" };
	const heightConversionFactor = useMetric ? 0.01 : 0.3048; // cm to meters and feet to meters
	const weightConversionFactor = useMetric ? 1 : 0.453592; // pounds to kg

	return (
		<div className="h-[80vh] flex items-center justify-center pb-10">
			<Tabs
				defaultValue="bmi"
				className="w-[50vw] mx-auto mt-10 pb-10 text-white"
			>
				<div className="m-2 md:m-6 flex gap-1 md:gap-3  py-2 pr-8">
					Imperial
					<label htmlFor="weightToggle">
						<input
							id="weightToggle"
							type="checkbox"
							onChange={() => setUseMetric(!useMetric)}
							checked={useMetric}
						/>
					</label>
					Metric
				</div>
				<TabsList className="grid w-full grid-cols-4 bg-neutral-800">
					<TabsTrigger value="bmi" className="text-white">
						BMI
					</TabsTrigger>
					<TabsTrigger value="bmr" className="text-white">
						BMR
					</TabsTrigger>
					<TabsTrigger value="bodyFat" className="text-white">
						Body Fat
					</TabsTrigger>
					<TabsTrigger value="leanBodyMass" className="text-white">
						Lean Body Mass
					</TabsTrigger>
				</TabsList>

				{/* BMI Calculator */}
				<TabsContent value="bmi">
					<Card className="bg-neutral-800 text-white">
						<CardHeader>
							<CardTitle>BMI Calculator</CardTitle>
							<CardDescription>
								Calculate your Body Mass Index (BMI).
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="bmi-weight">Weight ({unitLabel.weight})</Label>

								<Input
									id="bmi-weight"
									type="number"
									className="text-white"
									placeholder="Weight"
								/>
							</div>
							{useMetric ? (
								<div className="mb-8">
									<Label htmlFor="bmi-height">Height (cm)</Label>
									<Input
										id="bmi-height"
										type="number"
										className="text-white "
										placeholder="Height"
									/>
								</div>
							) : (
								<>
									<Label htmlFor="" className="">
										Height
									</Label>
									<div className="flex gap-4">
										<Input
											id="bmi-height-feet"
											type="number"
											className="text-black"
											placeholder="Feet"
										/>
										<Input
											id="bmi-height-inches"
											type="number"
											className="text-black"
											placeholder="Inches"
										/>
									</div>
								</>
							)}
						</CardContent>
						<CardFooter className="flex items-center justify-start">
							<Button
								onClick={() => {
									const weight =
										parseFloat(
											(
												document.getElementById(
													"bmi-weight"
												) as HTMLInputElement
											).value
										) * weightConversionFactor;
									const height = useMetric
										? parseFloat(
												(
													document.getElementById(
														"bmi-height"
													) as HTMLInputElement
												).value
										  ) * heightConversionFactor
										: parseFloat(
												(
													document.getElementById(
														"bmi-height-feet"
													) as HTMLInputElement
												).value
										  ) *
												0.3048 +
										  parseFloat(
												(
													document.getElementById(
														"bmi-height-inches"
													) as HTMLInputElement
												).value
										  ) *
												0.0254;
									setBmiResult(calculateBMI(weight, height));
								}}
							>
								Calculate BMI
							</Button>
							<p className="ml-4">
								{bmiResult && (
									<span className="mt-4">Your BMI: {bmiResult}</span>
								)}
							</p>
						</CardFooter>
					</Card>
				</TabsContent>

				{/* BMR Calculator */}
				<TabsContent value="bmr">
					<Card className="bg-neutral-800 text-white">
						<CardHeader>
							<CardTitle>BMR Calculator</CardTitle>
							<CardDescription>
								Calculate your Basal Metabolic Rate (BMR).
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="bmr-weight">Weight ({unitLabel.weight})</Label>
								<Input
									id="bmr-weight"
									type="number"
									className="text-white"
									placeholder="Weight"
								/>
							</div>
							<div>
								{useMetric ? (
									<Label htmlFor="bmr-height">Height</Label>
								) : (
									<>
										<Label htmlFor="bmr-height">Height</Label>
									</>
								)}
								<Input
									id="bmr-height"
									type="number"
									className="text-white"
									placeholder="Height"
								/>
							</div>
							<div>
								<Label htmlFor="bmr-age">Age</Label>
								<Input
									id="bmr-age"
									type="number"
									className="text-white"
									placeholder="Age"
								/>
							</div>
							<div>
								<Label htmlFor="bmr-gender">Gender</Label>
								<select
									id="bmr-gender"
									className="flex h-10 w-full rounded-md border border-neutral-900 bg-neutral-900/50 px-3 py-2 text-sm ring-offset-neutral-500 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300  text-neutral-100"
									value={gender}
									onChange={(e) => setGender(e.target.value as Gender)}
								>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>
						</CardContent>
						<CardFooter className="flex items-center justify-start">
							<Button
								onClick={() => {
									const weight =
										parseFloat(
											(
												document.getElementById(
													"bmr-weight"
												) as HTMLInputElement
											).value
										) * weightConversionFactor;
									const height = useMetric
										? parseFloat(
												(
													document.getElementById(
														"bmr-height"
													) as HTMLInputElement
												).value
										  ) / 100
										: parseFloat(
												(
													document.getElementById(
														"bmr-height"
													) as HTMLInputElement
												).value
										  ) * 0.0254;
									const age = parseInt(
										(document.getElementById("bmr-age") as HTMLInputElement)
											.value,
										10
									);
									setBmrResult(calculateBMR(weight, height, age, gender));
								}}
							>
								Calculate BMR
							</Button>
							<p className="ml-4">
								{bmrResult && (
									<span className="mt-4">Your BMR: {bmrResult} kcal/day</span>
								)}
							</p>
						</CardFooter>
					</Card>
				</TabsContent>

				{/* Body Fat Calculator */}
				<TabsContent value="bodyFat">
					<Card className="bg-neutral-800 text-white">
						<CardHeader>
							<CardTitle>Body Fat Calculator</CardTitle>
							<CardDescription>
								Estimate your body fat percentage.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="bf-bmi">BMI</Label>
								<Input
									id="bf-bmi"
									type="number"
									className="text-white"
									placeholder="BMI"
								/>
							</div>
							<div>
								<Label htmlFor="bf-age">Age</Label>
								<Input
									id="bf-age"
									type="number"
									placeholder="Age"
									className="text-white"
								/>
							</div>
							<Label htmlFor="bf-gender">Gender</Label>
							<select
								id="bf-gender"
								className="flex h-10 w-full rounded-md border border-neutral-900 bg-neutral-900/50 px-3 py-2 text-sm ring-offset-neutral-500 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300  text-neutral-100"
								value={gender}
								onChange={(e) => setGender(e.target.value as Gender)}
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</CardContent>
						<CardFooter>
							<Button
								onClick={() => {
									const bmi = parseFloat(
										(document.getElementById("bf-bmi") as HTMLInputElement)
											.value
									);
									const age = parseInt(
										(document.getElementById("bf-age") as HTMLInputElement)
											.value,
										10
									);
									setBodyFatResult(
										calculateBodyFatPercentage(bmi, age, gender)
									);
								}}
							>
								Calculate Body Fat
							</Button>
							{bodyFatResult && (
								<p className="mt-4">Your Body Fat: {bodyFatResult}%</p>
							)}
						</CardFooter>
					</Card>
				</TabsContent>

				{/* Lean Body Mass Calculator */}
				<TabsContent value="leanBodyMass">
					<Card className="bg-neutral-800 text-white">
						<CardHeader>
							<CardTitle>Lean Body Mass Calculator</CardTitle>
							<CardDescription>Estimate your lean body mass.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="lbm-weight">Weight ({unitLabel.weight})</Label>
								<Input
									id="lbm-weight"
									type="number"
									placeholder="Weight"
									className="text-white"
								/>
							</div>
							<div>
								<Label htmlFor="lbm-bodyFat">Body Fat (%)</Label>
								<Input
									id="lbm-bodyFat"
									type="number"
									className="text-white"
									placeholder="Body Fat Percentage"
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button
								onClick={() => {
									const weight =
										parseFloat(
											(
												document.getElementById(
													"lbm-weight"
												) as HTMLInputElement
											).value
										) * weightConversionFactor;
									const bodyFatPercentage = parseFloat(
										(document.getElementById("lbm-bodyFat") as HTMLInputElement)
											.value
									);
									setLeanBodyMassResult(
										calculateLeanBodyMass(weight, bodyFatPercentage)
									);
								}}
							>
								Calculate Lean Body Mass
							</Button>
							{leanBodyMassResult && (
								<p className="mt-4">
									Your Lean Body Mass: {leanBodyMassResult} kg
								</p>
							)}
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
