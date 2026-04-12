// src/components/home/Testimonials.tsx
import {
	Box,
	Card,
	Container,
	Flex,
	Grid,
	Heading,
	Text,
} from "@radix-ui/themes";
import { Star } from "lucide-react";

const testimonials = [
	{
		name: "Sarah M.",
		rating: 5,
		text: "Game changer for our apartment! No more plastic waste and it actually works better than disposables.",
	},
	{
		name: "Mike T.",
		rating: 5,
		text: "My Frenchie took to it immediately. Easy to clean and no odor. Worth every penny.",
	},
	{
		name: "Jessica L.",
		rating: 4,
		text: "Takes a few washes to fully break in, but now it's perfect. Love that it's plant-based.",
	},
];

function StarRating({ rating }: { rating: number }) {
	return (
		<Flex gap="1">
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					size={16}
					fill={star <= rating ? "var(--accent-9)" : "none"}
					stroke={star <= rating ? "var(--accent-9)" : "var(--gray-6)"}
				/>
			))}
		</Flex>
	);
}

export function Testimonials() {
	return (
		<Box style={{ backgroundColor: "var(--accent-2)" }} py="9">
			<Container size="4">
				<Flex direction="column" gap="6" align="center">
					<Heading size="6" align="center">
						What Customers Say
					</Heading>
					<Grid
						columns={{ initial: "1", md: "3" }}
						gap="6"
						style={{ width: "100%" }}
					>
						{testimonials.map((testimonial, index) => (
							<Card key={index}>
								<Flex direction="column" gap="3" p="4">
									<StarRating rating={testimonial.rating} />
									<Text size="2" style={{ fontStyle: "italic" }}>
										"{testimonial.text}"
									</Text>
									<Text size="2" weight="medium" color="gray">
										— {testimonial.name}
									</Text>
								</Flex>
							</Card>
						))}
					</Grid>
				</Flex>
			</Container>
		</Box>
	);
}
