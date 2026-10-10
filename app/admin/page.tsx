import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false },
};

export default function AdminPage() {
  redirect("/admin/articles");
}
