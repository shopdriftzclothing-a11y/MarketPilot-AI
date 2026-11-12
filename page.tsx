"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { AI_EMPLOYEES } from "@/lib/ai";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo size="md" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#workforce" className="hover:text-white transition">AI Workforce</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <Link href="/login" className="hover:text-white transition">Log in</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="rounded-lg bg-gradient-to-r from-[#087BFF] to-[#00D5FF] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#087BFF]/15 via-transparent to-transparent" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#792BFF]/10 blur-[120px] rounded-full" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-cyan mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            Powered by MarketPilot Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            YOUR ENTIRE
            <br />
            <span className="gradient-text">AI WORKFORCE.</span>
            <br />
            ONE PLATFORM.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Give your business the power of an intelligent AI team. Automate everyday
            operations, grow your sales and manage your business from one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#087BFF] via-[#00D5FF] to-[#792BFF] px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/30 hover:opacity-95 transition glow-blue"
            >
              Get Started Free
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-medium text-white hover:bg-white/10 transition"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Dashboard preview mock */}
        <div className="relative mx-auto mt-20 max-w-5xl px-6">
          <div className="rounded-2xl border border-white/10 bg-[#101116] p-1 shadow-2xl glow-blue">
            <div className="rounded-xl bg-[#0a0a0f] overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-muted">MarketPilot AI – Dashboard</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {[
                  { label: "Tasks Completed", value: "128", sub: "+24% this month" },
                  { label: "Active AI Employees", value: "5", sub: "All systems online" },
                  { label: "Leads Generated", value: "47", sub: "This week" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <p className="text-sm text-muted">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-cyan">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Workforce */}
      <section id="workforce" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Meet Your <span className="gradient-text">AI Workforce</span>
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              Five specialised AI employees, all powered by MarketPilot Intelligence.
              Each has its own expertise, personality and workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AI_EMPLOYEES.map((emp) => (
              <div
                key={emp.id}
                className="group rounded-2xl border border-white/8 bg-[#101116] p-6 hover:border-white/15 transition hover:bg-[#12141c]"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold"
                  style={{ backgroundColor: `${emp.color}22`, color: emp.color }}
                >
                  {emp.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-white">{emp.role}</h3>
                <p className="mt-1 text-sm text-cyan/80">{emp.name}</p>
                <p className="mt-3 text-sm text-muted leading-relaxed">{emp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#08080c]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything your business needs
            </h2>
            <p className="mt-4 text-muted">One platform. Full operational coverage.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "MarketPilot Intelligence",
                desc: "Central AI engine that understands your business, coordinates specialists and delivers strategic answers.",
              },
              {
                title: "Shared Business Memory",
                desc: "Upload documents and define your brand so every AI employee works with the same context.",
              },
              {
                title: "Dedicated Workspaces",
                desc: "Each AI employee has its own chat, history, settings and activity feed.",
              },
              {
                title: "Open-Source Model Ready",
                desc: "Connect Ollama, Llama, Qwen or any compatible endpoint. No proprietary lock-in.",
              },
              {
                title: "Integrations Hub",
                desc: "Connect Gmail, Shopify, Stripe, Slack, social platforms and more.",
              },
              {
                title: "Usage & Billing Control",
                desc: "Clear plan limits, usage tracking and upgrade paths that scale with you.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/8 bg-[#101116] p-6">
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "£29",
                desc: "For solopreneurs getting started",
                features: ["1 AI employee", "Basic marketing tools", "Limited monthly usage", "Core dashboard"],
              },
              {
                name: "Professional",
                price: "£79",
                desc: "For growing teams",
                features: ["2 AI employees", "Marketing + Sales tools", "Advanced content gen", "Business analytics", "Higher usage"],
                popular: true,
              },
              {
                name: "Business",
                price: "£199",
                desc: "Full AI workforce",
                features: ["All 5 AI employees", "Advanced automation", "Full analytics", "Integrations", "Priority support"],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 ${
                  plan.popular
                    ? "border-primary/50 bg-gradient-to-b from-primary/10 to-[#101116] glow-blue"
                    : "border-white/10 bg-[#101116]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.desc}</p>
                <p className="mt-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted">/month</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted">
                      <svg className="h-4 w-4 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#087BFF] to-[#00D5FF] text-white"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Start with {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Do I need an OpenAI or ChatGPT API key?",
                a: "No. MarketPilot AI is built around open-source models. Connect Ollama, Llama, Qwen or any compatible endpoint. You stay in control of your AI infrastructure.",
              },
              {
                q: "Can I use my own hosted models?",
                a: "Yes. The platform is designed so MarketPilot Intelligence can run against independently hosted models. Configure the base URL and model name in Settings.",
              },
              {
                q: "Is my business data private?",
                a: "Yes. Each customer’s business profile, documents and conversations are isolated. You can review and delete stored information at any time.",
              },
              {
                q: "What happens if I exceed my plan limits?",
                a: "You will receive clear usage notifications. You can upgrade your plan or wait until the next billing cycle. Critical actions always require your approval.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-white/8 bg-[#101116] open:bg-[#12141c]"
              >
                <summary className="cursor-pointer list-none px-6 py-4 font-medium flex items-center justify-between">
                  {item.q}
                  <span className="text-muted group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" />
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} MarketPilot AI. Built for independent AI infrastructure.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/login" className="hover:text-white">Login</Link>
            <Link href="/register" className="hover:text-white">Register</Link>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
