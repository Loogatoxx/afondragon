import { PublicFooter } from "@/components/common/site/public-footer";
import { PublicHeader } from "@/components/common/site/public-header";

// Public site layout: header and footer, no session required.
export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </>
  );
}
