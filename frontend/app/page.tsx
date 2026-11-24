"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DatePicker } from "@/components/app-date-picker";
import { useAuth, UserRole } from "@/lib/auth-context";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldAlert,
  AlertCircle,
  Loader2,
  Sparkles,
  School,
  KeyRound,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();

  // Mode: "signIn" | "signUp"
  const [activeTab, setActiveTab] = useState<string>("signIn");

  // Sign In state
  const [signInRole, setSignInRole] = useState<string>("all");
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState<string>("");

  // Sign Up state
  const [signUpRole, setSignUpRole] = useState<UserRole>("student");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");
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

  // Quick fill demo credentials
  const fillCredentials = (email: string, pass: string, role: string) => {
    setSignInData({ email, password: pass });
    setSignInRole(role);
    setSignInError("");
    toast.info(`Filled credentials for ${role.toUpperCase()}`);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError("");

    if (!signInData.email || !signInData.password) {
      const msg = "Please enter both email and password.";
      setSignInError(msg);
      return toast.error(msg);
    }

    try {
      setSignInLoading(true);
      const payload: { email: string; password: string; role?: string } = {
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
    } catch (err: unknown) {
      let msg = "Invalid credentials. Please verify your email and password.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        msg = err.response.data.message;
      }
      setSignInError(msg);
      toast.error(msg);
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");

    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      const msg = "Name, email, and password are required fields.";
      setSignUpError(msg);
      return toast.error(msg);
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      const msg = "Passwords do not match.";
      setSignUpError(msg);
      return toast.error(msg);
    }
    if (signUpData.password.length < 6) {
      const msg = "Password must be at least 6 characters.";
      setSignUpError(msg);
      return toast.error(msg);
    }
    if (signUpRole === "admin" && !signUpData.adminKey) {
      const msg = "Admin Secret Key is required for administrator registration.";
      setSignUpError(msg);
      return toast.error(msg);
    }

    try {
      setSignUpLoading(true);
      const endpoint = `${apiUrl}/auth/${signUpRole}/signUp`;
      const payload: Record<string, unknown> = {
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
      toast.success(res.data.message || "Registration completed successfully!");

      if (res.data.data && typeof res.data.data === "object" && res.data.data.role) {
        login(res.data.data);
        router.push(`/${res.data.data.role}`);
      } else {
        setSignInData({ email: signUpData.email, password: "" });
        setActiveTab("signIn");
        toast.info("Please sign in with your new account credentials.");
      }
    } catch (err: unknown) {
      let msg = "Registration failed. Please check the provided information.";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.response?.data?.error || msg;
      }
      setSignUpError(msg);
      toast.error(msg);
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50/60 flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6 text-center space-y-2">
        <div className="flex items-center justify-center size-12 rounded-2xl bg-primary text-primary-foreground shadow-md">
          <GraduationCap className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            EduManage
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Enterprise School & Academic Management System
          </p>
        </div>
      </div>

      {/* Main Authentication Card */}
      <Card className="w-full max-w-lg border-border/80 shadow-lg rounded-2xl bg-card">
        <CardHeader className="pb-4">
          <Tabs
            value={activeTab}
            onValueChange={(val) => {
              setActiveTab(val);
              setSignInError("");
              setSignUpError("");
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 h-10 p-1 bg-muted rounded-xl">
              <TabsTrigger value="signIn" className="rounded-lg text-sm font-semibold">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signUp" className="rounded-lg text-sm font-semibold">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* TAB CONTENT: SIGN IN */}
            <TabsContent value="signIn" className="mt-4">
              <div className="space-y-1 text-center mb-4">
                <CardTitle className="text-xl font-bold tracking-tight">
                  Sign in to your account
                </CardTitle>
                <CardDescription className="text-xs">
                  Select your role or choose Auto-detect to sign in directly
                </CardDescription>
              </div>

              {/* Role filter segmented buttons */}
              <div className="mb-4">
                <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Sign-In Role
                </Label>
                <div className="grid grid-cols-5 gap-1.5 bg-muted/70 p-1 rounded-xl">
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
                      className={`py-1.5 px-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                        signInRole === r.id
                          ? "bg-background text-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {signInError && (
                <Alert variant="destructive" className="mb-4 py-2.5">
                  <AlertCircle className="size-4" />
                  <AlertDescription className="text-xs">{signInError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signin-email" className="text-xs font-medium">
                    Email or Username
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="name@school.com"
                      required
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      className="pl-9 h-10 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password" className="text-xs font-medium">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type={showSignInPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      className="pl-9 pr-10 h-10 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      aria-label={showSignInPassword ? "Hide password" : "Show password"}
                    >
                      {showSignInPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={signInLoading}
                  className="w-full h-10 rounded-xl font-semibold shadow-xs cursor-pointer mt-2"
                >
                  {signInLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Authenticating...
                    </>
                  ) : (
                    `Sign In as ${signInRole === "all" ? "User" : signInRole.toUpperCase()}`
                  )}
                </Button>
              </form>

              {/* Demo Credentials Box */}
              <div className="mt-6 pt-4 border-t border-border/80">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="size-3.5 text-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Quick-Fill Demo Credentials
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { role: "admin", label: "Admin", email: "admin@school.com", pass: "admin123" },
                    { role: "teacher", label: "Teacher", email: "john@doe.com", pass: "teacher123" },
                    { role: "student", label: "Student", email: "sarah@brewer.com", pass: "student123" },
                    { role: "parent", label: "Parent", email: "parent@school.com", pass: "parent123" },
                  ].map((demo) => (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => fillCredentials(demo.email, demo.pass, demo.role)}
                      className="text-left p-2 rounded-xl border border-border/70 hover:border-primary/50 hover:bg-muted/50 transition-all text-xs cursor-pointer group"
                    >
                      <div className="font-semibold text-foreground flex items-center justify-between">
                        <span>{demo.label}</span>
                        <CheckCircle2 className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">{demo.email}</div>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* TAB CONTENT: SIGN UP */}
            <TabsContent value="signUp" className="mt-4">
              <div className="space-y-1 text-center mb-4">
                <CardTitle className="text-xl font-bold tracking-tight">
                  Create an account
                </CardTitle>
                <CardDescription className="text-xs">
                  Select your role to view and complete your registration details
                </CardDescription>
              </div>

              {/* Role selection tabs */}
              <div className="mb-4">
                <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Select Role
                </Label>
                <div className="grid grid-cols-4 gap-1.5 bg-muted/70 p-1 rounded-xl">
                  {(["student", "teacher", "parent", "admin"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setSignUpRole(r);
                        setSignUpError("");
                      }}
                      className={`py-1.5 px-1 text-xs capitalize font-medium rounded-lg transition-all cursor-pointer ${
                        signUpRole === r
                          ? "bg-background text-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Secret Notice */}
              {signUpRole === "admin" && (
                <Alert className="mb-4 py-2.5 bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200">
                  <ShieldAlert className="size-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-xs font-semibold">Restricted Administrator Registration</AlertTitle>
                  <AlertDescription className="text-[11px]">
                    Requires the master security key. Default seed key: <code className="bg-amber-500/20 px-1 py-0.5 rounded font-mono">adminsecret123</code>
                  </AlertDescription>
                </Alert>
              )}

              {signUpError && (
                <Alert variant="destructive" className="mb-4 py-2.5">
                  <AlertCircle className="size-4" />
                  <AlertDescription className="text-xs">{signUpError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignUp} className="space-y-3.5 max-h-[58vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name" className="text-xs font-medium">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={signUpData.name}
                        onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email" className="text-xs font-medium">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="user@school.com"
                        required
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password" className="text-xs font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showSignUpPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        required
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="pl-9 pr-9 h-9 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                        aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                      >
                        {showSignUpPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="signup-confirm" className="text-xs font-medium">
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type={showSignUpPassword ? "text" : "password"}
                        placeholder="Repeat password"
                        required
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-phone" className="text-xs font-medium">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="1234567890"
                        value={signUpData.phone}
                        onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="signup-address" className="text-xs font-medium">
                      Address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="signup-address"
                        type="text"
                        placeholder="City, State"
                        value={signUpData.address}
                        onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Role-Specific Fields */}
                {signUpRole === "student" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-class" className="text-xs font-medium">
                        Assigned Class
                      </Label>
                      <Input
                        id="signup-class"
                        type="text"
                        placeholder="e.g. 1A, 2B, 3C"
                        value={signUpData.class_name}
                        onChange={(e) => setSignUpData({ ...signUpData, class_name: e.target.value })}
                        className="h-9 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-blood" className="text-xs font-medium">
                        Blood Group
                      </Label>
                      <Input
                        id="signup-blood"
                        type="text"
                        placeholder="O+, A+, B+"
                        value={signUpData.blood_group}
                        onChange={(e) => setSignUpData({ ...signUpData, blood_group: e.target.value })}
                        className="h-9 rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {signUpRole === "parent" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-student-email" className="text-xs font-medium">
                      Linked Student Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="signup-student-email"
                        type="email"
                        placeholder="child.student@school.com"
                        value={signUpData.studentEmail}
                        onChange={(e) => setSignUpData({ ...signUpData, studentEmail: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Connect your parent profile directly to your enrolled student.
                    </p>
                  </div>
                )}

                {signUpRole === "admin" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-admin-key" className="text-xs font-medium">
                      Admin Master Secret Key *
                    </Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="signup-admin-key"
                        type="password"
                        placeholder="Enter master admin key"
                        required
                        value={signUpData.adminKey}
                        onChange={(e) => setSignUpData({ ...signUpData, adminKey: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {(signUpRole === "student" || signUpRole === "teacher") && (
                  <div className="space-y-1.5">
                    <DatePicker
                      label="Date of Birth"
                      value={signUpData.dob}
                      onChange={(dateStr) => setSignUpData({ ...signUpData, dob: dateStr })}
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="signup-bio" className="text-xs font-medium">
                    Bio / Remarks
                  </Label>
                  <Textarea
                    id="signup-bio"
                    rows={2}
                    placeholder="Brief background or notes..."
                    value={signUpData.bio}
                    onChange={(e) => setSignUpData({ ...signUpData, bio: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={signUpLoading}
                  className="w-full h-10 rounded-xl font-semibold shadow-xs cursor-pointer mt-3"
                >
                  {signUpLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Registering Account...
                    </>
                  ) : (
                    `Complete ${signUpRole.toUpperCase()} Registration`
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardHeader>

        <CardFooter className="pt-2 pb-4 flex items-center justify-center text-xs text-muted-foreground border-t border-border/60">
          <div className="flex items-center gap-1.5">
            <School className="size-3.5 text-muted-foreground" />
            <span>EduManage v1.0 • Secure Role-Based Academic Management</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
