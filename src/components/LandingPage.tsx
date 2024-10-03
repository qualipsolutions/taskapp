import Link from 'next/link';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

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
            href="https://github.com/qualipsolutions/taskapp"
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
                  Open Source Task Automation
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
                    href="https://github.com/qualipsolutions/taskapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="contribute" className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6 mx-auto flex justify-center">
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
              <div className="auto-cols-max grid-flow-col md:grid gap-6 w-full">
                <Card className="max-w-sm">
                  <CardContent className="pt-8">
                    <h3 className="text-xl font-bold mb-2">Code</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Submit pull requests, fix bugs, or add new features to
                      enhance TaskApp.
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link
                        href="https://github.com/qualipsolutions/taskapp/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Issues
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="max-w-sm">
                  <CardContent className="pt-8">
                    <h3 className="text-xl font-bold mb-2">Documentation</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Help improve our docs, write tutorials, or create examples
                      for others.
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link
                        href="https://github.com/qualipsolutions/taskapp/wiki"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Wiki
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
                  {/* <Image
                    src="/placeholder.svg?height=80&width=240"
                    alt="Qualip Solutions Logo"
                    width={240}
                    height={80}
                    className="mb-4"
                  /> */}
                  <h3 className="text-xl font-bold mb-2">Qualip Solutions</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Empowering businesses with innovative software solutions.
                  </p>
                  <Button asChild className="mt-4 w-full sm:w-auto">
                    <Link
                      href="https://www.qualipsolutions.co.za"
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
                  {/* <Image
                    src="/placeholder.svg?height=80&width=240"
                    alt="FYVE Logo"
                    width={240}
                    height={80}
                    className="mb-4"
                  /> */}
                  <h3 className="text-xl font-bold mb-2">FYVE</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Revolutionizing digital experiences through cutting-edge
                    technology.
                  </p>
                  <Button asChild className="mt-4 w-full sm:w-auto">
                    <Link
                      href="https://www.fyveapp.co.za"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
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
      </footer>
    </div>
  );
}
