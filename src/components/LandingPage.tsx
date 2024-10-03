import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Users, Code, GitBranch, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">TaskApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#community"
          >
            Community
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contribute"
          >
            Contribute
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#sponsors"
          >
            Sponsors
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="https://github.com/taskapp/taskapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  TaskApp: Open Source Task Automation
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Empower your workflow with community-driven automation.
                  TaskApp is free, open-source, and built for developers by
                  developers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link
                    href="https://github.com/taskapp/taskapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose TaskApp?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card className="w-full">
                <CardHeader>
                  <Code className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Open Source</CardTitle>
                </CardHeader>
                <CardContent>
                  Fully transparent codebase. Audit, modify, and contribute to
                  the project. Your data, your control.
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Community Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  Benefit from continuous improvements and innovations driven by
                  a passionate developer community.
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Powerful Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  Streamline your workflow with robust task automation features,
                  saving you time and reducing errors.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="community"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Join Our Thriving Community
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card className="w-full">
                <CardContent className="pt-8">
                  <GitBranch className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <h3 className="text-xl font-bold text-center mb-2">
                    1,000+ Contributors
                  </h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Join a global network of developers shaping the future of
                    task automation.
                  </p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardContent className="pt-8">
                  <Star className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <h3 className="text-xl font-bold text-center mb-2">
                    10,000+ GitHub Stars
                  </h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    A testament to the project&apos;s popularity and the trust
                    of the developer community.
                  </p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardContent className="pt-8">
                  <Users className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <h3 className="text-xl font-bold text-center mb-2">
                    Active Discord Community
                  </h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Get help, share ideas, and collaborate with fellow TaskApp
                    enthusiasts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="contribute" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Contribute to TaskApp
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Whether you&apos;re a seasoned developer or just starting out,
                  there are many ways to contribute to TaskApp and make a
                  difference.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 w-full max-w-3xl">
                <Card className="w-full">
                  <CardContent className="pt-8">
                    <h3 className="text-xl font-bold mb-2">Code</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Submit pull requests, fix bugs, or add new features to
                      enhance TaskApp.
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link
                        href="https://github.com/taskapp/taskapp/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Issues
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardContent className="pt-8">
                    <h3 className="text-xl font-bold mb-2">Documentation</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Help improve our docs, write tutorials, or create examples
                      for others.
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link
                        href="https://github.com/taskapp/taskapp/wiki"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Wiki
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardContent className="pt-8">
                    <h3 className="text-xl font-bold mb-2">Community</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Engage in discussions, help others, and share your TaskApp
                      experiences.
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link
                        href="https://discord.gg/taskapp"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Discord
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section
          id="sponsors"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Sponsors
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              TaskApp is proudly sponsored by industry leaders who believe in
              the power of open-source software and community-driven
              development.
            </p>
            <div className="grid gap-8 md:grid-cols-2 items-center justify-center max-w-3xl mx-auto">
              <Card className="w-full bg-white dark:bg-gray-900">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=80&width=240"
                    alt="Qualip Solutions Logo"
                    width={240}
                    height={80}
                    className="mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Qualip Solutions</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Empowering businesses with innovative software solutions.
                  </p>
                  <Button asChild className="mt-4 w-full sm:w-auto">
                    <Link
                      href="https://qualipcorp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="w-full bg-white dark:bg-gray-900">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=80&width=240"
                    alt="FYVE Logo"
                    width={240}
                    height={80}
                    className="mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">FYVE</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Revolutionizing digital experiences through cutting-edge
                    technology.
                  </p>
                  <Button asChild className="mt-4 w-full sm:w-auto">
                    <Link
                      href="https://fyve.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-bold mb-4">Become a Sponsor</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Support TaskApp&apos;s development and gain visibility in the
                open-source community. Sponsorship opportunities are available
                for companies of all sizes.
              </p>
              <Button asChild className="w-full sm:w-auto">
                <Link href="mailto:sponsors@taskapp.com">
                  Contact Us About Sponsorship
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Automate Your Tasks?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join the open-source revolution and start using TaskApp today.
                  It&apos;s free, powerful, and community-driven.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  asChild
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="https://github.com/taskapp/taskapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Star on GitHub
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shr
ink-0 items-center px-4 md:px-6 border-t"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 TaskApp. Open source software under the MIT License.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://github.com/taskapp/taskapp/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://github.com/taskapp/taskapp/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contributing
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://github.com/taskapp/taskapp/security"
            target="_blank"
            rel="noopener noreferrer"
          >
            Security
          </Link>
        </nav>
      </footer>
    </div>
  );
}
