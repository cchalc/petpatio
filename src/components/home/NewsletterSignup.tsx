// src/components/home/NewsletterSignup.tsx
import { useState } from "react";
import {
	Box,
	Container,
	Flex,
	Heading,
	Text,
	TextField,
	Button,
} from "@radix-ui/themes";

export function NewsletterSignup() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// MVP: No backend - just show success state
		setSubmitted(true);
	};

	return (
		<Box style={{ backgroundColor: "var(--accent-9)" }} py="9">
			<Container size="2">
				<Flex
					direction="column"
					gap="4"
					align="center"
					style={{ textAlign: "center" }}
				>
					<Heading size="6" style={{ color: "white" }}>
						Join the Pack
					</Heading>
					<Text size="3" style={{ color: "var(--accent-3)" }}>
						Get 15% off your first order + exclusive pet care tips.
					</Text>

					{submitted ? (
						<Text size="3" style={{ color: "white" }} weight="medium">
							Thanks for subscribing!
						</Text>
					) : (
						<form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
							<Flex gap="2">
								<TextField.Root
									size="3"
									placeholder="Enter your email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									style={{ flex: 1 }}
								/>
								<Button
									size="3"
									variant="solid"
									style={{ backgroundColor: "white", color: "var(--accent-9)" }}
								>
									Subscribe
								</Button>
							</Flex>
						</form>
					)}
				</Flex>
			</Container>
		</Box>
	);
}
