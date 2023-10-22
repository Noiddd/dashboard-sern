import SideBar from "../../components/platform/SideBar";

export default function RootLayout({ children }) {
  return (
    <div>
      <SideBar />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
