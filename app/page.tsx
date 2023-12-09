import Table from "./components/Table";

interface Props {
  searchParams: { sort: "email" | "username" };
}

export default async function Home({ searchParams: { sort } }: Props) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return (
    <main>
      <Table data={data} sortParam={sort} />
    </main>
  );
}
