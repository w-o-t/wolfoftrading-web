export default async function StandardPage({
  searchParams
}: {
  searchParams: Promise<{ uid?: string }>
}) {
  const { uid } = await searchParams;

  console.log("UID:", uid);

  return <div>Standard Plan</div>;
}
