import { AuthLayout } from "@/components/auth/layout/auth-layout";

export default function LoginLoading() {
  return (
    <AuthLayout title="" subtitle="">
      <div className="w-full space-y-6">
        {/* Simulate Google Sign In Button */}
        <div className="w-full h-11 bg-gray-100 animate-pulse rounded-lg" />

        {/* Simulate Separator */}
        <div className="relative my-6">
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-4 bg-gray-100 animate-pulse rounded" />
          </div>
        </div>

        {/* Simulate Email Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-100 animate-pulse rounded" />
            <div className="w-full h-11 bg-gray-100 animate-pulse rounded-lg" />
          </div>
          <div className="w-full h-11 bg-gray-100 animate-pulse rounded-lg" />
        </div>

        {/* Simulate Terms Text */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-4 bg-gray-100 animate-pulse rounded" />
          <div className="w-3/4 mx-auto h-4 bg-gray-100 animate-pulse rounded" />
        </div>
      </div>
    </AuthLayout>
  );
}
