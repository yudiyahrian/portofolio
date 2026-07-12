import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-4">
        <div className="font-pixel text-8xl sm:text-9xl text-pixel-blue mb-4 animate-pixel-float">
          404
        </div>
        <div className="font-pixel text-lg text-dark-900 dark:text-white mb-2 leading-relaxed">
          PAGE NOT FOUND
        </div>
        <p className="text-slate-500 mb-2">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="font-pixel text-xs text-slate-600 mb-8 animate-pixel-blink">
          INSERT COIN TO CONTINUE...
        </div>

        {/* Pixel art ghost */}
        <div className="font-pixel text-pixel-blue text-center mb-8 leading-loose text-sm" aria-hidden="true">
          <div>░░▓▓▓▓░░</div>
          <div>░▓░░░░▓░</div>
          <div>░▓▓░▓▓▓░</div>
          <div>░▓░░░░▓░</div>
          <div>░▓▓▓▓▓▓░</div>
          <div>░▓░▓░▓░░</div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="pixel-btn-primary flex items-center gap-2">
            <Home size={12} />
            GO HOME
          </Link>
          <Link href="/projects" className="pixel-btn-secondary flex items-center gap-2">
            <ArrowLeft size={12} />
            PROJECTS
          </Link>
        </div>
      </div>
    </div>
  );
}
