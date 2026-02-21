"use client";

import Navbar from "../../UI/navbar";
import Hero from "../../UI/hero";

import Content from "../../UI/content";
import { motion } from "motion/react";

import Footer from "../../UI/footer";

const sectionAnimation = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function HomePage() {
  return (
    <main>
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <Navbar />
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Content />
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Footer />
      </motion.div>
    </main>
  );
}
