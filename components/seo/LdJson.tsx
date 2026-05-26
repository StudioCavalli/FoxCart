interface LdJsonProps {
  data: Record<string, unknown>;
}

function LdJson({ data }: LdJsonProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export { LdJson };
