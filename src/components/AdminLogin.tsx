/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShieldAlert, Lock, Mail, Eye, EyeOff, CheckCircle } from "lucide-react";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your email or username.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    // Simulate standard authenticating pause
    setTimeout(() => {
      const normalizedUsername = username.trim().toLowerCase();
      const userValid = normalizedUsername === "joshua.greedy.voneus@gmail.com" || normalizedUsername === "admin";
      const passValid = password === "Rowndown11!!88**";

      if (userValid && passValid) {
        setIsSuccess(true);
        // Persist session-wise so navigation doesn't disrupt workspace
        sessionStorage.setItem("wiltshire_admin_authenticated", "true");
        sessionStorage.setItem("wiltshire_admin_user", normalizedUsername);
        
        setTimeout(() => {
          onSuccess();
        }, 800);
      } else {
        setError("Invalid username/email or password. Please double-check your credentials.");
      }
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-md w-full mx-auto my-12" id="admin-login-box">
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
        
        {/* Brand Banner Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-brand-green/10 text-brand-green rounded-2xl border border-brand-green/20">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#091e36] tracking-tight">
            Editorial Workspace Access
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-sm mx-auto">
            This module is reserved for authorized publishers. Enter your email and password to open the administrative tools.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-[#a01c1c] rounded-xl text-xs font-bold flex gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-normal">{error}</p>
          </div>
        )}

        {isSuccess ? (
          <div className="bg-emerald-50 border border-emerald-250 p-6 rounded-2xl text-center space-y-2 animate-scaleUp text-slate-900">
            <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-black text-emerald-800">Authentication Approved</h3>
            <p className="text-xs text-slate-600 font-semibold">Opening editorial dashboard, please wait...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username/Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Email Address or Username *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-9 text-xs bg-white border border-slate-300 focus:border-brand-green text-slate-900 outline-hidden rounded-xl font-bold placeholder:text-slate-400"
                  required
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-405" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-9 pr-10 text-xs bg-white border border-slate-300 focus:border-brand-green text-slate-900 outline-hidden rounded-xl font-bold placeholder:text-slate-400 font-mono"
                  required
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-405" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-brand-green hover:bg-brand-green-hover text-white disabled:bg-slate-200 disabled:text-slate-400 rounded-xl text-xs font-black transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer leading-none uppercase tracking-wider mt-2"
            >
              {isSubmitting ? "Authenticating..." : "Sign In to Workspace"}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-semibold font-sans">
          Secured workspace channel for Wiltshire Broadband Finder operators.
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
