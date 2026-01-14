"use client";

import DashboardLayout from "@/app/Layouts/DashBoardLayout";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import ProfileSkeleton from "./ProfileSkeleton";

interface AuthSessionUser {
  name?: string;
  email: string;
  image?: string;
  role?: string;
  createdAt?: string;
}
interface Session {
  user: AuthSessionUser;
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession() as {
    data: Session | null;
    isPending: boolean;
  };
  const user = session?.user;

  if (isPending) {
    return (
      <DashboardLayout>
        <ProfileSkeleton></ProfileSkeleton>
      </DashboardLayout>
    );
  }
  //       <div className="py-20 text-center text-slate-500">
  //         Loading profile...
  //       </div>
  //     </DashboardLayout>
  //   );
  // }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center text-slate-500">
          You must be logged in to view this page.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-slate-900">👤 My Profile</h1>
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <Image
              src={user.image || "/avatar-placeholder.png"}
              alt={user.name || "User"}
              width={120}
              height={120}
              className="rounded-full object-cover border"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-xs text-slate-500">Full Name</label>
              <p className="font-medium text-slate-800">{user.name || "—"}</p>
            </div>

            <div>
              <label className="text-xs text-slate-500">Email</label>
              <p className="font-medium text-slate-800">{user.email}</p>
            </div>

            <div className="flex gap-6">
              <div>
                <label className="text-xs text-slate-500">Role</label>
                <p className="font-medium capitalize text-slate-800">
                  {user.role || "user"}
                </p>
              </div>

              {user.createdAt && (
                <div>
                  <label className="text-xs text-slate-500">Joined</label>
                  <p className="font-medium text-slate-800">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Actions */}
        {/* <div className="flex gap-3">
          <button
            disabled
            className="px-4 py-2 rounded bg-primary-600 text-white opacity-60"
          >
            Edit Profile (Coming Soon)
          </button>

          <button
            disabled
            className="px-4 py-2 rounded border text-slate-600 opacity-60 cursor-not-allowed"
          >
            Change Password
          </button>
        </div> */}
      </div>
    </DashboardLayout>
  );
}
