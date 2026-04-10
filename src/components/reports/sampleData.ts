import type { SnapshotData } from "./types";

// ═══════════════════════════════════════════════════════════════════════════
// Sample data for testing — replace with real data from Supabase
// Shows learner vs leader comparison with some agreement, some variance
// ═══════════════════════════════════════════════════════════════════════════

export const SAMPLE_DATA: SnapshotData = {
  learner: "Sam Chen",
  leader: "Rachel Torres",
  circle: "ESSENTIALS",
  date: "April 2026",
  skillsets: [
    {
      id: "question",
      name: "Question",
      strength: "Curiosity",
      family: "purple",
      objective: "Do you stay curious about people and ideas beyond your immediate work?",
      questions: [
        { id: "CR-QUE-13", title: "Tune into people", text: "Are you interested in how people think and what that means for your work?", score: 66, leaderScore: 66 },
        { id: "CR-QUE-14", title: "Steal like a pirate", text: "Do you actively seek ideas and inspiration from outside what you're doing?", score: 100, leaderScore: 66 },
        { id: "CR-QUE-15", title: "Ask why first", text: "Do you stop and ask why before you ask how?", score: 66, leaderScore: 66 },
      ],
    },
    {
      id: "clarify",
      name: "Clarify",
      strength: "Critical Thinking",
      family: "purple",
      kfg: "focus",
      objective: "Do you take time to clarify the ask and summarise the job before starting?",
      questions: [
        { id: "CT-CLA-01", title: "Clarify the ask", text: "Do you take time to clarify any requests, briefs or feedback?", score: 66, leaderScore: 66 },
        { id: "CT-CLA-02", title: "Spot the blockers", text: "Can you recognise key challenges or constraints up front?", score: 33, leaderScore: 100 },
        { id: "CT-CLA-03", title: "Play it back", text: "Do you clearly summarise what and why before you get started?", score: 66, leaderScore: 66 },
      ],
      leaderNote: "Gets excited and jumps in. Needs to slow down and clarify scope before starting.",
    },
    {
      id: "update",
      name: "Update",
      strength: "Communication",
      family: "teal",
      objective: "Do you respond promptly, share clear updates, and flag changes that impact others?",
      questions: [
        { id: "CO-CON-37", title: "Close the loop", text: "Do you respond to requests and updates in a timely way?", score: 100, leaderScore: 100 },
        { id: "CO-CON-38", title: "Keep it simple", text: "Do you share clear, simple updates that others can easily understand?", score: 66, leaderScore: 66 },
        { id: "CO-CON-39", title: "Raise good flags", text: "Do you let people know quickly when plans change and might affect them?", score: 66, leaderScore: 66 },
      ],
    },
    {
      id: "engage",
      name: "Engage",
      strength: "Collaboration",
      family: "teal",
      kfg: "keep",
      objective: "Do you consistently deliver and use feedback to be a safe pair of hands?",
      questions: [
        { id: "CL-ENG-25", title: "Own your time", text: "Do you manage your time proactively and reliably deliver on deadlines?", score: 100, leaderScore: 100 },
        { id: "CL-ENG-26", title: "Bounce ideas", text: "Do you share your ideas and bounce off others to improve the thinking?", score: 100, leaderScore: 100 },
        { id: "CL-ENG-27", title: "Seek feedback", text: "Do you actively seek feedback and use it to improve your work?", score: 66, leaderScore: 66 },
      ],
      leaderNote: "Rock solid on delivery. Team trusts Sam completely.",
    },
  ],
  growTarget: {
    name: "Challenge",
    strength: "Curiosity",
    circle: "EXPLORING",
    objective: "Do you question how things are done and seek ways to make them better?",
  },
};
