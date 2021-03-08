import Link from "next/link";

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout: React.FC<Props> = ({ children, home = false }) => {
  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
      <main>{children}</main>
      {!home && (
        <div className="p-7">
          <Link href="/">
            <a className="underline">← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
