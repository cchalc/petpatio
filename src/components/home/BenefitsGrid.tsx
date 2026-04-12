// src/components/home/BenefitsGrid.tsx
import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Leaf, RefreshCw, Sparkles } from "lucide-react";

const benefits = [
	{
		icon: Leaf,
		title: "Plant-Based",
		description:
			"100% natural coconut coir fibers. Sustainable and biodegradable.",
	},
	{
		icon: RefreshCw,
		title: "Reusable",
		description:
			"Machine washable up to 100+ times. One pad replaces thousands of disposables.",
	},
	{
		icon: Sparkles,
		title: "Odor Control",
		description:
			"Natural antimicrobial properties neutralize odors at the source.",
	},
];

export function BenefitsGrid() {
	return (
		<Box py="9">
			<Container size="4">
				<Grid columns={{ initial: "1", md: "3" }} gap="6">
					{benefits.map((benefit) => {
						const Icon = benefit.icon;
						return (
							<Flex
								key={benefit.title}
								direction="column"
								align="center"
								gap="3"
								style={{ textAlign: "center" }}
							>
								<Box
									style={{
										width: 64,
										height: 64,
										borderRadius: "50%",
										backgroundColor: "var(--accent-3)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Icon size={28} style={{ color: "var(--accent-9)" }} />
								</Box>
								<Heading size="4">{benefit.title}</Heading>
								<Text size="2" color="gray">
									{benefit.description}
								</Text>
							</Flex>
						);
					})}
				</Grid>
			</Container>
		</Box>
	);
}
