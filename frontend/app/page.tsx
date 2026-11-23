"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/app-date-picker";
import { useAuth, UserRole } from "@/lib/auth-context";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();

  // Mode: "signIn" | "signUp"
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");

  // Sign In state
  const [signInRole, setSignInRole] = useState<string>("all");
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signInLoading, setSignInLoading] = useState(false);

  // Sign Up state
  const [signUpRole, setSignUpRole] = useState<UserRole>("student");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    photo: "",
    bio: "",
    dob: "2005-01-01",
    blood_group: "O+",
    class_name: "1A",
    studentEmail: "",
    adminKey: "",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      return toast.error("Please enter both email and password.");
    }

    try {
      setSignInLoading(true);
      const payload: any = {
        email: signInData.email.trim(),
        password: signInData.password,
      };
      if (signInRole !== "all") {
        payload.role = signInRole;
      }

      const res = await axios.post(`${apiUrl}/auth/signIn`, payload, {
        withCredentials: true,
      });

      if (res.data && res.data.data) {
        const user = res.data.data;
        login(user);
        toast.success(`Welcome back, ${user.name || user.role}!`);
        const userRole = (user.role || "admin").toLowerCase();
        router.push(`/${userRole}`);
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Invalid credentials. Please check your email and password.";
      toast.error(msg);
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      return toast.error("Name, email, and password are required.");
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    if (signUpData.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }
    if (signUpRole === "admin" && !signUpData.adminKey) {
      return toast.error("Admin Secret Key is required for administrator registration.");
    }

    try {
      setSignUpLoading(true);
      let endpoint = `${apiUrl}/auth/${signUpRole}/signUp`;
      let payload: any = {
        name: signUpData.name.trim(),
        email: signUpData.email.trim(),
        password: signUpData.password,
        phone: signUpData.phone,
        address: signUpData.address,
        photo: signUpData.photo,
        dob: signUpData.dob,
        blood_group: signUpData.blood_group,
        bio: signUpData.bio,
      };

      if (signUpRole === "student") {
        payload.class_name = signUpData.class_name;
      } else if (signUpRole === "parent") {
        payload.studentEmail = signUpData.studentEmail;
        payload.student_email = signUpData.studentEmail ? [signUpData.studentEmail] : [];
      } else if (signUpRole === "admin") {
        payload.adminKey = signUpData.adminKey;
      }

      const res = await axios.post(endpoint, payload, { withCredentials: true });
      toast.success(res.data.message || "Registration successful!");

      // If user session returned
      if (res.data.data && typeof res.data.data === "object" && res.data.data.role) {
        login(res.data.data);
        router.push(`/${res.data.data.role}`);
      } else {
        // Switch to Sign In tab and pre-fill email
        setSignInData({ email: signUpData.email, password: "" });
        setActiveTab("signIn");
        toast.info("Please sign in with your new credentials.");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row">
        
        {/* Left hero / branding section */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 text-white p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl backdrop-blur-sm">
                🎓
              </div>
              <span className="text-xl font-bold tracking-wide">EduManage</span>
            </div>
            <h1 className="text-3xl font-extrabold mb-3 leading-tight">
              School Management System
            </h1>
            <p className="text-indigo-200 text-sm leading-relaxed mb-6">
              A comprehensive role-based school management platform for Administrators, Teachers, Students, and Parents.
            </p>
          </div>

          <div className="space-y-3 bg-white/10 p-4 rounded-xl text-xs text-indigo-100 backdrop-blur-sm">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Available Demo Credentials:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-bold text-white">Admin:</span> admin@school.com
                <div className="text-[10px] text-indigo-300">pass: admin123</div>
              </div>
              <div>
                <span className="font-bold text-white">Teacher:</span> john@doe.com
                <div className="text-[10px] text-indigo-300">pass: teacher123</div>
              </div>
              <div>
                <span className="font-bold text-white">Student:</span> sarah@brewer.com
                <div className="text-[10px] text-indigo-300">pass: student123</div>
              </div>
              <div>
                <span className="font-bold text-white">Parent:</span> parent@school.com
                <div className="text-[10px] text-indigo-300">pass: parent123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form section */}
        <div className="w-full md:w-7/12 p-8 flex flex-col justify-center">
          
          {/* Main Tab Switcher */}
          <div className="flex border-b border-slate-200 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("signIn")}
              className={`pb-3 font-semibold text-sm flex-1 text-center transition-colors border-b-2 ${
                activeTab === "signIn"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signUp")}
              className={`pb-3 font-semibold text-sm flex-1 text-center transition-colors border-b-2 ${
                activeTab === "signUp"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Register / Sign Up
            </button>
          </div>

          {/* SIGN IN FORM */}
          {activeTab === "signIn" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 block">
                  Select Role (Optional)
                </Label>
                <div className="grid grid-cols-5 gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
                  {[
                    { id: "all", label: "Auto" },
                    { id: "admin", label: "Admin" },
                    { id: "teacher", label: "Teacher" },
                    { id: "student", label: "Student" },
                    { id: "parent", label: "Parent" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSignInRole(r.id)}
                      className={`py-1.5 rounded-md text-center transition-all ${
                        signInRole === r.id
                          ? "bg-white text-indigo-700 font-bold shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="signin-email">Email Address</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={signInLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all mt-4"
              >
                {signInLoading ? "Authenticating..." : "Sign In to Dashboard"}
              </Button>
            </form>
          )}

          {/* SIGN UP FORM */}
          {activeTab === "signUp" && (
            <form onSubmit={handleSignUp} className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 block">
                  Register As
                </Label>
                <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
                  {(["student", "teacher", "parent", "admin"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSignUpRole(r)}
                      className={`py-1.5 rounded-md text-center capitalize transition-all ${
                        signUpRole === r
                          ? "bg-white text-indigo-700 font-bold shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {signUpRole === "admin" && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-2.5 rounded-lg text-xs">
                  <span className="font-bold">Restricted Access:</span> Administrator registration requires the authorized Admin Secret Key. (Default: <code className="bg-amber-100 px-1 py-0.5 rounded">adminsecret123</code>)
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="signup-name">Full Name *</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email">Email Address *</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="user@example.com"
                    required
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="signup-password">Password *</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Min. 6 chars"
                    required
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-confirm">Confirm Password *</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="Repeat password"
                    required
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="1234567890"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-address">Address</Label>
                  <Input
                    id="signup-address"
                    type="text"
                    placeholder="Street, City"
                    value={signUpData.address}
                    onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Role specific fields */}
              {signUpRole === "student" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="signup-class">Class Name</Label>
                    <Input
                      id="signup-class"
                      type="text"
                      placeholder="e.g. 1A, 2B, 3C"
                      value={signUpData.class_name}
                      onChange={(e) => setSignUpData({ ...signUpData, class_name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-blood">Blood Group</Label>
                    <Input
                      id="signup-blood"
                      type="text"
                      placeholder="O+, A+, B+"
                      value={signUpData.blood_group}
                      onChange={(e) => setSignUpData({ ...signUpData, blood_group: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {signUpRole === "parent" && (
                <div>
                  <Label htmlFor="signup-student-email">Linked Student's Email</Label>
                  <Input
                    id="signup-student-email"
                    type="email"
                    placeholder="student@school.com"
                    value={signUpData.studentEmail}
                    onChange={(e) => setSignUpData({ ...signUpData, studentEmail: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Enter your child's student email address to link profiles.
                  </p>
                </div>
              )}

              {signUpRole === "admin" && (
                <div>
                  <Label htmlFor="signup-admin-key">Admin Secret Key *</Label>
                  <Input
                    id="signup-admin-key"
                    type="password"
                    placeholder="Enter security admin key"
                    required
                    value={signUpData.adminKey}
                    onChange={(e) => setSignUpData({ ...signUpData, adminKey: e.target.value })}
                    className="mt-1"
                  />
                </div>
              )}

              {(signUpRole === "student" || signUpRole === "teacher") && (
                <div>
                  <DatePicker
                    label="Date of Birth"
                    value={signUpData.dob}
                    onChange={(dateStr) => setSignUpData({ ...signUpData, dob: dateStr })}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="signup-bio">Bio / Notes</Label>
                <Textarea
                  id="signup-bio"
                  rows={2}
                  placeholder="Optional brief biography or remarks"
                  value={signUpData.bio}
                  onChange={(e) => setSignUpData({ ...signUpData, bio: e.target.value })}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={signUpLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all mt-4"
              >
                {signUpLoading ? "Creating Account..." : `Complete ${signUpRole.toUpperCase()} Registration`}
              </Button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
