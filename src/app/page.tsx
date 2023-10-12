import CreateUser from "./components/createUser/CreateUser";
import UsersList from "./components/UsersList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <CreateUser />
    </main>
  );
}
