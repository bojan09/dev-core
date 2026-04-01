import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface Props { searchParams: { message?: string } }

export default function AuthErrorPage({ searchParams }: Props) {
  const message = searchParams.message ?? "Something went wrong during authentication.";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface">
      <div className="max-w-sm w-full text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-text-primary mb-2">Auth error</h1>
          <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
        </div>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "#7B61FF" }}
        >
          Try again
        </Link>
      </div>
    </div>
  );
}
