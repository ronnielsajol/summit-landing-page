"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventDetailsSection from "./components/EventDetailsSection";
import ProgramSection from "./components/ProgramSection";
import SpeakerSection from "./components/SpeakerSection";
import VenueSection from "./components/VenueSection";
import CTASection from "./components/CTASection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";

const PageLoader = dynamic(() => import("./components/PageLoader"), { ssr: false });
const CustomCursor = dynamic(() => import("./components/CustomCursor"), { ssr: false });

export default function Home() {
	const [loaded, setLoaded] = useState(false);

	return (
		<>
			<CustomCursor />
			{!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
			<Navigation loaded={loaded} />
			<main>
				<HeroSection loaded={loaded} />
				<AboutSection />
				<SectionDivider variant='dark' />
				<EventDetailsSection />
				<SectionDivider variant='dark' />
				<ProgramSection />
				<SectionDivider variant='dark' />
				<SpeakerSection />
				<SectionDivider variant='dark' />
				<VenueSection />
				<CTASection />
				<ContactSection />
			</main>
			<Footer />
		</>
	);
}
