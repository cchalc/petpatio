// src/components/home/FAQPreview.tsx
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
	{
		question: "How do I clean CocoTurf?",
		answer:
			"Simply rinse with water after each use. For a deep clean, machine wash on cold and air dry. It's that easy.",
	},
	{
		question: "What sizes are available?",
		answer:
			"We offer Small (for dogs up to 15 lbs), Medium (15-30 lbs), and Large (30+ lbs) to fit any space and any pup.",
	},
	{
		question: "How long does it last?",
		answer:
			"With proper care, CocoTurf lasts 1-2 years. That's hundreds of uses and zero waste compared to disposables.",
	},
];

export function FAQPreview() {
	return (
		<Box py="9">
			<Container size="2">
				<Flex direction="column" gap="6" align="center">
					<Heading size="6" align="center">
						Frequently Asked Questions
					</Heading>

					<Accordion.Root
						type="single"
						collapsible
						style={{ width: "100%" }}
					>
						{faqs.map((faq, index) => (
							<Accordion.Item
								key={index}
								value={`item-${index}`}
								style={{ borderBottom: "1px solid var(--gray-4)" }}
							>
								<Accordion.Trigger
									style={{
										width: "100%",
										padding: "16px 0",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										background: "none",
										border: "none",
										cursor: "pointer",
										textAlign: "left",
									}}
								>
									<Text size="3" weight="medium">
										{faq.question}
									</Text>
									<ChevronDown size={20} style={{ color: "var(--gray-9)" }} />
								</Accordion.Trigger>
								<Accordion.Content style={{ paddingBottom: 16 }}>
									<Text size="2" color="gray">
										{faq.answer}
									</Text>
								</Accordion.Content>
							</Accordion.Item>
						))}
					</Accordion.Root>

					<Link to={"/pages/faq" as string}>
						<Button variant="ghost">View All FAQ →</Button>
					</Link>
				</Flex>
			</Container>
		</Box>
	);
}
