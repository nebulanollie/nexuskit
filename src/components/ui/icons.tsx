"use client";

import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  User,
  Search,
  Filter,
  Grid,
  List,
  ArrowUpDown,
  Star,
  Heart,
  Share,
  FileIcon,
  Download,
  Upload,
  Edit,
  Trash,
  Settings,
  Loader2,
  LogOut,
  Menu,
  X,
  Plus,
  Minus,
  Check,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  Shield,
  Truck,
  Headphones as HeadphonesIcon,
  Store as Logo,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
export type Icon = (props: LucideProps) => React.ReactNode;

export {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  User,
  Search,
  Filter,
  Grid,
  List,
  ArrowUpDown,
  Star,
  Heart,
  Share,
  FileIcon,
  Loader2,
  Download,
  Upload,
  Edit,
  Trash,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Minus,
  Check,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  Shield,
  Truck,
  HeadphonesIcon,
  Logo,
};
export const Google: Icon = (props) => (
  <svg role="img" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
    />
  </svg>
);

export function UserCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}
