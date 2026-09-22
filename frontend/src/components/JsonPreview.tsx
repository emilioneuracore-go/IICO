export function JsonPreview({ data }: { data: unknown }) {
  if (data === undefined || data === null) {
    return null;
  }
  return <pre className="json-preview">{JSON.stringify(data, null, 2)}</pre>;
}
