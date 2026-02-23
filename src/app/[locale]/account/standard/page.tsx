import StandardContent from "./standard-content";

export default async function StandardPage({
  searchParams
}: {
  searchParams: Promise<{ uid?: string; theme?: string }>
}) {
  await searchParams; // nur damit Next 15 zufrieden ist

  return <StandardContent />;
}
